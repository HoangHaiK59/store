import React from 'react';
import './chat.css';
import { Input } from 'antd';
import { UpOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export const Chat = () => {
    const [isVisible, setVisible] = React.useState(false);
    const handleClick = () => setVisible(!isVisible);
    return <div className="chat-wrapper">
        {isVisible && <div className="box scale-up-bottom">
            <div className="close-btn">
                <CloseOutlined onClick={handleClick}/>
            </div>
            <TextArea rows={2} className="typing" />
            <div className="send"><SendOutlined size={35}  /></div>
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