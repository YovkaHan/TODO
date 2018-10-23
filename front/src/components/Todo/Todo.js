import React from 'react';

import './style.scss';

class Todo extends React.Component {
    render () {

        const data = this.props.data;

        return (
            <div className={`todo`}>
                <div className={`todo__container`}>
                    <div className={`todo__name`}>{data.name}</div>
                    <div className={`todo__details`}>{data.details}</div>
                </div>
            </div>
        )
    }
}

export default Todo;