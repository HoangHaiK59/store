import React from 'react';
import { Menu } from 'antd';
import './navbar.css';

export const Navbar = () => (
    <div className="header">
        <div className="header-brand">Brand icon</div>
        <div className="header-navbar">
            <div>
                <div className="header-navbar_item">
                    <div className="header-navbar_item-style">Home</div>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <div className="header-navbar_item-style">Collection</div>
                </div>
            </div>
        </div>
        <div className="header-widget margin-left">
            <div>
                <div className="header-navbar_item">
                    <div className="header-navbar_item-style">Profile</div>
                </div>
            </div>
        </div>
    </div>
)