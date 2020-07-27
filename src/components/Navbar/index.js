import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';

const TopMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/tops/jacket' className="header-navbar_item-style">Áo khoác</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/tops/shirts' className="header-navbar_item-style">Áo sơ mi</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/tops/tshirts' className="header-navbar_item-style">Áo phông</Link>
        </Menu.Item>
    </Menu>
)

const PantMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/pants/jean' className="header-navbar_item-style">Quần jean</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/pants/jumpsuit' className="header-navbar_item-style">Quần áo bộ</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/pants/short' className="header-navbar_item-style">Quần short</Link>
        </Menu.Item>
    </Menu>
)

const adminMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/admin/addproduct' className="header-navbar_item-style">Add product</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/admin/addimage' className="header-navbar_item-style">Add image</Link>
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
                    <Link to='/store' className="header-navbar_item-style">Trang chủ</Link>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Dropdown overlay={TopMenu}>
                        <Link to='/tops' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                            Áo
                        </Link>
                    </Dropdown>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Dropdown overlay={PantMenu}>
                        <Link to='/pants' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                            Quần
                        </Link>
                    </Dropdown>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Link to='/category' className="header-navbar_item-style">Thể loại</Link>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Link to='/accessories' className="header-navbar_item-style">Phụ kiện</Link>
                </div>
            </div>
            <div>
                <div className="header-navbar_item">
                    <Dropdown overlay={adminMenu}>
                        <Link to='' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                            Admin
                    </Link>
                    </Dropdown>
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