import React from 'react';
import './landing.css';
import {useHistory} from 'react-router-dom';
import { useTitle } from '../../helper/feature';

export const Landing = (props) => {
        const history = useHistory();
        useTitle({title: props.title})
        return <div className="landing-container">
                <div className="circle-item"></div>
                <div className="ellip-item">
                </div>
                <img className="image-landing" src="https://i.imgur.com/uWZJghW.jpg" alt="" />
                <button className="btn-shop-now" onClick={() => history.push('/store')}>
                        SHOP NOW
                </button>
        </div>
}