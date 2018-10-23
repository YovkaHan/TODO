const path = require('path');
const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();
const dbPath = path.resolve(__dirname, 'todo.db');

const dbExists = fs.existsSync(dbPath);

if (!dbExists) {
    fs.openSync(dbPath, 'w');
}

/**
 * Создание базы данных + добавление тестовой записи
 * */

module.exports = function () {
    if (!dbExists) {
        console.log('Creating ...');

        const db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                return errorFoo(err)
            }
            console.log('Open the database connection.');
        });

        db.serialize(function () {

            db.run('CREATE TABLE `todos` (' +
                '`id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,' +
                '`name` TEXT,' +
                '`color` TEXT,' +
                '`shape` TEXT,' +
                '`details` TEXT)'
            );

            db.run('CREATE TABLE `add_props` (' +
                '`todo_id` INTEGER NOT NULL,' +
                '`prop_name` TEXT,' +
                '`prop_value` TEXT,' +
                'FOREIGN KEY(todo_id) REFERENCES todos(id)' +
            ')'
            );
        });

        // Insert some data using a statement:
        transferInfoFromFile(path.resolve(__dirname, 'start-info.json'), db).then(()=>{

            db.close((err) => {
                if (err) {
                    return errorFoo(err)
                }
                console.log('Close the database connection.');
            });
        });
    } else {
        console.log('DB already exist');
    }
};

function errorFoo(err) {
    if (err) {
        console.error(err.message);
        return err;
    }
    return null;
}

function transferInfoFromFile(file, to_db) {
    return new Promise((resolve, reject)=>{
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                reject(err); // we'll not consider error handling for now
            }
            const db = JSON.parse(data);

            /**For each table executes ...
             * */
            Object.keys(db).map(table => {
                const propsName = [];
                const _uppercase = /^[A-Z]*$/;

                Object.keys(db[table][0]).map(prop => {

                    if (!_uppercase.test(prop)) {
                        propsName.push(prop);
                    }
                });


                if (propsName.length) {
                    const statement = insertInto(table, propsName);

                    db[table].map(elem => {
                        const returned = [];

                        Object.keys(elem).filter(prop => {
                            return propsName.indexOf(prop) >= 0 ? returned.push(elem[prop]) : false
                        });

                        console.log(returned);
                        statement.run(returned);
                    });

                    statement.finalize();
                }
            });
            resolve(1);
        });
    });

    function insertInto(table, props) {

        return to_db.prepare(`INSERT INTO \`${table}\` (${propFrom(props, ', ', '\`')}) ` +
            `VALUES (${props.map(prop=>'?').join(', ')})`)
    }

    function propFrom(props, devider, avatar) {
        return props.map(prop => avatar + prop + avatar).join(devider)
    }
}
