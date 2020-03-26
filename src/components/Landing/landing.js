import React from 'react';
import './landing.css';
import {useHistory} from 'react-router-dom';

export const Landing = () => {
        const history = useHistory();
        return <div className="landing-container">
                <div className="circle-item"></div>
                <div className="ellip-item">
                </div>
                <img className="image-landing" src="https://i.imgur.com/uWZJghW.jpg" alt="" />
                <button className="btn-shop-now" onClick={() => history.push('/shustore')}>
                        SHOP NOW
                </button>
        </div>
}