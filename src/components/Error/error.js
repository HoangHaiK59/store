import React from 'react';
import './error.css';
import { useTitle } from '../../helper/feature';

export const Error = (props) => {
    useTitle({ title: props.title })
    return <div className="error-container">
        <div className="error-notification">
            <div className="error-drawer">
                <div className="head">
                    <div className="eye-left">
                    </div>
                    <div className="eye-right">
                    </div>
                    <div className="mouth"></div>
                </div>
            </div>
            <div className="notify">
                <h3>Something went happened!!</h3>
            </div>
        </div>
    </div>
}