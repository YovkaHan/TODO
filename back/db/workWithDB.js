const path = require('path');
const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, './files/todo.db');

const dbExists = () => fs.existsSync(dbPath);
let db = null;

module.exports = {
    open,
    close,
    selectEveryOne,
    selectOne,
    addNew,
    edit,
    delete: deleteTodo,
    getTodoSequenced
};

function open() {
    return new Promise((resolve, reject) => {
        if (dbExists()) {
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
        if (dbExists()) {
            db.all('SELECT * FROM `todos`', [], (err, rows)=>{
                resolve(rows);
            });
        } else {
            console.log('DB doesn\'t exist');
            reject('DB doesn\'t exist');
        }
    })
}

function selectOne(id) {
    return new Promise((resolve, reject) => {
        if (dbExists()) {
            db.all(`SELECT * FROM \`todos\` WHERE id=${id}`, (err, rows)=>{
                resolve(rows);
            });
        } else {
            console.log('DB doesn\'t exist');
            reject('DB doesn\'t exist');
        }
    })
}

function getTodoSequenced() {
    const sequences=[];

    return new Promise((resolve, reject) => {
        if (dbExists()) {
            db.all(`SELECT * FROM add_props WHERE add_props.prop_name='child' AND add_props.prop_value='root'`, (err, rows)=>{

                Promise.all(rows.map(r=>{
                    const sequence = {};
                    return formSequence('root', r['todo_id'], sequence).then(()=>{
                        sequences.push(sequence);
                    });
                })).then(()=>{
                    resolve(sequences);
                });
            });
        } else {
            console.log('DB doesn\'t exist');
            reject('DB doesn\'t exist');
        }
    })
}

function formSequence(parent, id, obj) {
    return new Promise((resolve, reject) => {
        return formNode(parent, id).then((node) => {
            obj[id] = node;
            if (node.children.length) {
                Promise.all(node.children.map(childId => {
                    return formSequence(id, childId, obj);
                })).then(()=>{
                    resolve();
                });
            }else {
                resolve();
            }
        });
    });
}

function formNode(parent, id) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM add_props WHERE add_props.prop_name='child' AND add_props.prop_value=${id}`, (err, rows) => {
            resolve({
                id,
                parent: parent,
                children: rows.map(c => c['todo_id'])
            })
        });
    });
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
        if (dbExists()) {
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