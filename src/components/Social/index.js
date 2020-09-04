import React from 'react';
import './social.css';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';
export default function Social(props) {
    return (
        <div className="social-container">
            <FacebookFilled  size={25} style={{fontSize: '25px', color:"#fa520a"}}/>
            <InstagramFilled color="#717feb" size={25} style={{fontSize: '25px', marginTop: '15px',color:"#fa520a"}}/>
            <TwitterCircleFilled color="#717feb" size={25} style={{fontSize: '25px', marginTop: '15px', color:"#fa520a"}}/>
        </div>
    )
}