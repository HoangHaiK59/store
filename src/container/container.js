import React from 'react';
import { Landing } from '../components/Landing/landing';

export const Container = () => (
    <div className="root-container">
        <div className="root-mainview">
            <div className="root-navbar"></div>
            <div className="root-content">
                <Landing />
            </div>
        </div>
    </div>
)