const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, './files/todo.db');

const dbExists = () => fs.existsSync(dbPath);

module.exports = function () {
    return new Promise((resolve, reject) => {
        if(dbExists()){
            fs.unlink(dbPath, function(error) {
                if (error) {
                    reject(error);
                }
                console.log('DB DELETED!');
                resolve();
            });
        } else {
            resolve();
        }
    });
};