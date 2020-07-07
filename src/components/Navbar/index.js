import React from 'react';
import { Menu, Dropdown } from 'antd';
import './navbar.css';
import { Link } from 'react-router-dom';

const collectionMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/collection' className="header-navbar_item-style">Collection</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection' className="header-navbar_item-style">Collection</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection' className="header-navbar_item-style">Collection</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection' className="header-navbar_item-style">Collection</Link>
        </Menu.Item>
    </Menu>
)

export const Navbar = () => (
    <div className="header">
        <div className="header-brand">Brand icon</div>
        <div className="header-navbar">
            <div>
                <div className="header-navbar_item">
                    <Link to='/store' className="header-navbar_item-style">Home</Link>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Dropdown overlay={collectionMenu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            Collection 
                        </a>
                    </Dropdown>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Link to='/women' className="header-navbar_item-style">Women</Link>
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