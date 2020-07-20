import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined   } from '@ant-design/icons';
import './navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';

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

const Navbar = (props) => {
    const handleLogout = () => {
        props.setAuth(false);
        localStorage.removeItem('token');
    }

    const userMenu = (
        <Menu>
            <Menu.Item>
                <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }} className="header-navbar_item-style">Logout</button>
            </Menu.Item>
        </Menu>
    )

    return (<div className="header">
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
                        <Link to='' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
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
                    {
                        props.isAuth ? <Dropdown overlay={userMenu} trigger={['click']}>
                            <Link to='' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                                {props.user.username}  <DownOutlined />
                                </Link>
                        </Dropdown>
                            : <Link to='/login' className="header-navbar_item-style">Login</Link>
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAuth: (isAuth) => dispatch({ type: Constants.AUTH, isAuth })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);