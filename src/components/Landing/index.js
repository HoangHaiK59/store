import React from 'react';
import './landing.css';
import {useHistory} from 'react-router-dom';
import { useTitle } from '../../helper/feature';

// <div className="circle-item"></div>
// <div className="ellip-item">
// </div>
// <img className="image-landing" src="https://i.imgur.com/LWdcr6f.jpg" alt="" />

export const Landing = (props) => {
        const history = useHistory();
        useTitle({title: props.title})
        return <div className="landing-container">
                <img src="https://i.imgur.com/LWdcr6f.jpg" alt="" className="imageBackdrop"/>

                <button className="btn-shop-now" onClick={() => history.push('/store')}>
                        SHOP NOW
                </button>
        </div>
}