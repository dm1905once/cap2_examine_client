import React from 'react';

const TopMessage = ({content}) =>{
    /* Content comes in as:
        { type: 'some_type', message: ''} or
        { type: 'some_type', message: ['a', 'b']}
    */
    let color;
    switch (content.type) {
        case 'Success': color = 'green'; break;
        case 'Error': color = 'red'; break;
        case 'Info': color = 'blue'; break;
        case 'Warning': color = 'yellow'; break;
        default: color = 'yellow';
    };

    if (Array.isArray(content.message)){
        return (
            <div className={`ui message ${color}`}>
                <div className="header">{content.type} message</div>
                <ul className="list">
                    {content.message.map((msg,i)=><li key={i}>{msg}</li>)}
                </ul>
            </div>
        )
    }else {
        return (<div className={`ui warning message ${color}`}>{content.message}</div>)
    }
};

export default TopMessage;