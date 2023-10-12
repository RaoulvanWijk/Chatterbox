import React from 'react'

export default function Message() {
    return (
        <li className='chat-message'>
            <div className='message-avatar'>
                <p>T</p>
            </div>

            <div className='message-content'>
                <p className='message-credentials'>ThatDutchGuy <span className='message-date'>Today at 10:30 AM</span></p>
                <p className="memssage">Lorem ipsum dolor sit amet.</p>
            </div>
        </li>
    )
}
