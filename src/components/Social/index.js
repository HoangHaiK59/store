import React from 'react';
import './social.css';
import { message } from 'antd';
import { FacebookFilled, InstagramFilled, TwitterCircleFilled } from '@ant-design/icons';
export default function Social(props) {
    const connectSocial = () => {
        message.info('Connect social network')
    }
    return (
        <div className="social-container">
            <FacebookFilled  size={25} style={{fontSize: '25px', color:"#fa520a"}} onClick={connectSocial}/>
            <InstagramFilled color="#717feb" size={25} style={{fontSize: '25px', marginTop: '15px',color:"#fa520a"}} onClick={connectSocial}/>
            <TwitterCircleFilled color="#717feb" size={25} style={{fontSize: '25px', marginTop: '15px', color:"#fa520a"}} onClick={connectSocial}/>
        </div>
    )
}