const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, './files/todo.db');

const dbExists = () => fs.existsSync(dbPath);

const createDB =    require('./createDB');
const deleteDB =    require('./deleteDB');
const workWithDB =  require('./workWithDB');

module.exports = function () {

    return {
        createDB,
        deleteDB,
        workWithDB
    }
};