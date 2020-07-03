import React from 'react';
import './chat.css';
import { UpOutlined, CloseOutlined } from '@ant-design/icons';

export const Chat = () => {
    const [isVisible, setVisible] = React.useState(false);
    const handleClick = () => setVisible(!isVisible);
    return <div className="chat-wrapper">
        {isVisible && <div className="box">
            <div className="close-btn">
                <CloseOutlined onClick={handleClick}/>
            </div>
        </div>}
        {!isVisible && <div className="chat">
            <button onClick={handleClick} className="btn-chat">
                Let's chat
                <span>
                <UpOutlined /></span>
            </button>
        </div>}
    </div>
}