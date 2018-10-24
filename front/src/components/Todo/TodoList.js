import React from 'react';
import Todo from './';
import {AppContext} from '../App';

/**
 * Сформировать дерево тудушек
 *      - найти root ы
 *      - плясать по child-связям
 *
 *      Пример :
 *
 *      1: {
 *          parent: root,
 *          prev: begin,
 *          next: end,
 *          children: [1,2]
 *      },
 *       2: {
 *          parent: 1,
 *          prev: begin,
 *          next: 3,
 *          children: []
 *      },
 *      3: {
 *          parent: 1,
 *          prev: 2,
 *          next: end,
 *          children: []
 *      }
 *      4: {
 *          parent: 1,
 *          prev: 2,
 *          next: end,
 *          children: []
 *      }
 * */


export default class TodoList extends React.Component {

    render() {

        this.props.socket.todoListGet(1, (result) => {
            console.log(result.data);
        }, (error) => {
            console.log(error)
        });

        return (
            <AppContext.Consumer>
                { global => (
                    <div className={`todo-list`}>
                        {this.props.data.map(todo => {
                            return <Todo key={todo.id} data={todo}/>
                        })}
                    </div>
                )}
            </AppContext.Consumer>
        )
    }
}