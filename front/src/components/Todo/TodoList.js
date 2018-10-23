import React from 'react';
import Todo from './';
import {AppContext} from '../App';

export default class TodoList extends React.Component {

    render() {
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