/**
 * Сервер TODO-шки
 *
 * Сервер должен отдавать и писать данные в виде тудушек
 * Данные : {
 *   - id сгенеренное сервером
 *   - name
 *   - color
 *   - shape
 *   - details
 * }
 *
 *  *Запрос на создание
 *
 *  *Запрос на получение всех тудушек
 *
 *  *Запрос на получение определенной тудушки
 *
 *  *Запрос на удаление тудушки
 *
 * */
const port = 4010;
const addr = '0.0.0.0';

const path = require('path');
const express = require('express');
const app = require('express')();
const url = require('url');
const http = require('http').Server(app);
const io = require('socket.io')(port);

const theDB = require('./db')();

theDB.deleteDB().then(()=>{
    theDB.createDB();
});


http.listen(port, addr);

app.use('/', express.static(__dirname + '/public'));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/todo-list', function(req, res) {
    theDB.workWithDB.open().then(()=>{
        return theDB.workWithDB.selectEveryOne();
    }).then((selected)=>{
        return res.json({"selected": selected});
    }).then(()=>{
        theDB.workWithDB.close();
    }).catch((err)=>{
        res.json({"error": err});
    });
});

io.on('connection', (client) => {

    console.log('user connected !!!!');

    client.on('disconnect', function () {
        console.log('user disconnected !!!!');
    });
    client.on('todo-list get', function(){

        theDB.workWithDB.open().then(()=>{
            return theDB.workWithDB.selectEveryOne();
        }).then((selected)=>{
            client.emit('todo-list get/result', {data: selected});
        }).then(()=>{
            theDB.workWithDB.close();
        }).catch((err)=>{
            client.emit('todo-list get/error', {error: err});
        });

    });

    client.on('shut up!', function () {
        client.emit('disconnected', {data: 'disconnected'});
    });
});