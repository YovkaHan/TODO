import React from 'react';
import axios from 'axios';

import {Socket} from '../';
import {TodoList} from '../Todo';
import {AppContext, globals} from './AppContext';

import './style.scss';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            todoList: [],
            todo: null,
            global: globals.b,
            socket: Socket(this)
        }
    }

    buttonClick = () => {
        this.state.socket.todoListGet((result) => {
            this.setState({
                todoList: result.data
            });
        }, (error) => {
            console.log(error)
        })
    };

    componentDidMount() {

    }

    render() {
        return (
            <AppContext.Provider value={this.state.global}>
                <div className={`the-app`}>

                    <h1 className="main-title">{`Todo's server address is ${TODOS_SERVER}`}</h1>
                    <div className={`btn`}
                         onClick={this.buttonClick}>Click Me!
                    </div>
                    <main className={`root-list list-avatar`}>
                        <TodoList data={this.state.todoList} socket={this.state.socket}/>
                    </main>

                </div>
            </AppContext.Provider>
        )
    }
}