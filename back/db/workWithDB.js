const path = require('path');
const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, 'todo.db');

const dbExists = fs.existsSync(dbPath);
let db = null;

module.exports = {
    open,
    close,
    selectEveryOne,
    addNew,
    edit,
    delete: deleteTodo
};

function open() {
    return new Promise((resolve, reject) => {
        if (dbExists) {
            console.log('Working ...');

            db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    reject(errorFoo(err));
                }
                console.log('Open the database connection.');
                resolve(1);
            });
        } else {
            console.log('DB doesn\'t exist');
            reject(-1);
        }
    });
}

function selectEveryOne() {
    return new Promise((resolve, reject) => {
        if (dbExists) {
            db.all('SELECT * FROM `todos`', [], (err, rows)=>{
                resolve(rows);
            });
        } else {
            console.log('DB doesn\'t exist');
            reject('DB doesn\'t exist');
        }
    })
}

/**
 *
 ***/
function addNew() {

}

/**
 *
 ***/
function edit() {

}

/**
 *
 ***/
function deleteTodo() {

}

function close() {
    return new Promise((resolve, reject) => {
        if (dbExists) {
            db.close((err) => {
                if (err) {
                    reject(errorFoo(err));
                }
                resolve(1);
                console.log('Close the database connection.');
            });
        } else {
            console.log('DB doesn\'t exist');
            reject('DB doesn\'t exist');
        }
    })
}

function errorFoo(err) {
    if (err) {
        console.error(err.message);
        return err;
    }
    return null;
}