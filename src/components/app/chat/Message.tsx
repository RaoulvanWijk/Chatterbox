
import React from 'react'

export type MessageProps = {
    message: {
        username: string
        message: string
        date: string
    }
}

export default function Message(messageProps: MessageProps) {
    const message = messageProps.message
    console.log(message);
    
    let covertedDate = new Date(message.date)
    let newDate
    if(covertedDate.getDate() == (new Date()).getDate()) {
        newDate = covertedDate.toLocaleString(
            'en-US',
            {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }
        ).replace(',', ' ')
        newDate = 'Today at ' + newDate
    } else {
        newDate = covertedDate.toLocaleString(
            'en-US',
            {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }
        ).replace(',', ' ')
    }
    return (
        <li className='chat-message'>
            <div className='message-avatar'>
                <p>T</p>
            </div>

            <div className='message-content'>
                <p className='message-credentials'>{message.username} <span className='message-date'>{newDate}</span></p>
                <p className="memssage">{message.message}</p>
            </div>
        </li>
    )
}
