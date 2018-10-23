import React from 'react';

import './style.scss';

class Todo extends React.Component {
    render () {
        return (
            <div className={`todo`}>
                <div className={`todo__container`}>
                    <div className={`todo__name`}>BLA-BLA</div>
                    <div className={`todo__details`}>BLA-BLA-BLA</div>
                </div>
            </div>
        )
    }
}

export default Todo;