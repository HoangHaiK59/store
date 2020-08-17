import React from 'react';
import './footer.css';
import { Chat } from '../Chat';
import useDimensions from '../../helper/feature'
export const Footer = () => {
    const { width, height } = useDimensions();
    return (
    <div className="footer">
        <Chat />
    </div>
    )
}