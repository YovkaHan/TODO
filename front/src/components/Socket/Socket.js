import openSocket from 'socket.io-client';

const socket_count = 0;

export default function Socket() {
    const socket = openSocket(TODOS_SERVER);

    function todoGet(id, next, whenError){
        socket.emit('todo get', id);

        socket.on('todo get/result', (result)=>{
            next(result);
        });
        socket.on('todo get/error', (error)=>{
            whenError(error)
        })
    }

    function todoListGet(next, whenError){
        socket.emit('todo-list get');

        socket.on('todo-list get/result', (result)=>{
            next(result);
        });
        socket.on('todo-list get/error', (error)=>{
            whenError(error)
        })
    }

    function foo(next, whenError) {
        socket.emit( 'todo-list get sequence');

        socket.on('todo-list get sequence/result', (result)=>{
            next(result);
        });
        socket.on(' todo-list get sequence/error', (error)=>{
            whenError(error)
        })
    }

    function onDisconnect(){
        return new Promise(function (resolve,reject) {
            socket.emit('shut up!');

            socket.on('disconnected', (result)=>{
                socket.emit('disconnect');
                resolve(result);
            });
        });
    }

    return {
        todoListGet,
        todoGet,
        onDisconnect,
        foo
    }
}

