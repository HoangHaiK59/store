import React from 'react';
import { Menu, Dropdown } from 'antd';
import './navbar.css';
import { Link } from 'react-router-dom';

const collectionMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/collection/spring' className="header-navbar_item-style">Spring</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection/summer' className="header-navbar_item-style">Summer</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection/autumn' className="header-navbar_item-style">Autumn</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection/winter' className="header-navbar_item-style">Winter</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/collection' className="header-navbar_item-style">4 Seasons</Link>
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
                        <Link className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                            Collection
                        </Link>
                    </Dropdown>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Link to='/women' className="header-navbar_item-style">Women</Link>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Link to='/accessories' className="header-navbar_item-style">Accessories</Link>
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