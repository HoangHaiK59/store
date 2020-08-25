import React from 'react';
import { Menu, Dropdown, Drawer, Button } from 'antd';
import { DownOutlined, MenuOutlined, HomeOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import './navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';
import { instance } from '../../utils/axios';
import LeftMenu from './leftMenu';
import RightMenu from './rightMenu';

const Navbar = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [menus, setMenus] = React.useState([]);
    React.useEffect(() => {
        const getClientMenu = () => {
            instance.get(`GetClientMenu?userId=${props.user ? props.user.userId : ''}`, {
                headers: {
                    Authorization: localStorage.getItem('token') ? 'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token : ''
                }
            })
                .then(response => {
                    if (response.data.success) {
                        const { data } = response.data;
                        let menusTmp = data.map(menu => ({ ...menu, submenus: menu.submenus !== '' ? menu.submenus.split(';').map(value => JSON.parse(value)) : menu.submenus }))
                        menusTmp = menusTmp.sort((a, b) => a.ordinal - b.ordinal)
                        setMenus(menusTmp);
                    }
                })
        }
        getClientMenu();
    }, [props])
    const handleLogout = () => {
        props.setAuth(false);
        localStorage.removeItem('token');
    }


    const showMobileNav = () => {
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    const userMenu = (
        <Menu>
            <Menu.Item>
                <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }} className="header-navbar_item-style">Logout</button>
            </Menu.Item>
        </Menu>
    )
    // <div className="header-brand"><HomeOutlined size={15} /></div>
    // {
    //     menus.map((menu, id) => {
    //         if (menu.type === 'link') {
    //             return (
    //                 <div key={id}>
    //                     <div className="header-navbar_item">
    //                         <Link to={menu.path} className="header-navbar_item-style">{menu.name}</Link>
    //                     </div>
    //                 </div>)
    //         } else {
    //             const menuItem = (
    //                 <Menu>
    //                     {
    //                         menu.submenus.map((item, id) => <Menu.Item key={id}>
    //                             <Link to={item.path} className="header-navbar_item-style">{item.name}</Link>
    //                         </Menu.Item>)
    //                     }
    //                 </Menu>
    //             )
    //             return (
    //                 <Dropdown key={id} overlay={menuItem}>
    //                     <Link to={menu.path} className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
    //                         {menu.name}
    //                     </Link>
    //                 </Dropdown>
    //             )
    //         }
    //     })
    // }
    return (
        (!props.isMobile) ?
            <div className="header">
                <div className="header-navbar">
                    <div className="nm-header-inner" style={{ width: '100%' }}>
                        <div className="nm-row">
                            <div className="header-logo">
                                <Link to="/home"><h3>SHU</h3></Link>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="d-flex" style={{ paddingLeft: '45px' }}>
                                        <div>
                                            <div className="header-navbar_item">
                                                <Link to="/category" className="header-navbar_item-style">Category</Link>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="header-navbar_item">
                                                <Link to="/category" className="header-navbar_item-style">Pages</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12" style={{ padding: '0px 0px' }}>
                                            <div className="d-flex justify-content-end" style={{ paddingRight: '50px' }}>
                                                <div className="header-navbar_item">
                                                    {
                                                        props.isAuth ? <Dropdown overlay={userMenu} trigger={['click']}>
                                                            <Link to='' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                                                                {props.user.firstName + ' ' + props.user.lastName}  <DownOutlined />
                                                            </Link>
                                                        </Dropdown>
                                                            : <Link to='/login' className="header-navbar_item-style">Login</Link>
                                                    }
                                                </div>
                                                <div className="header-navbar_item">
                                                    <Link to="/cart" className="header-navbar_item-style">Cart</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
            <>
                <Button icon={<MenuOutlined style={{ color: '#fff' }} />} type="default" style={{ backgroundColor: '#000', border: 'none' }} onClick={showMobileNav}>
                </Button>
                <Drawer
                    style={{ minHeight: '100vh' }}
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <LeftMenu />
                    <RightMenu />
                </Drawer>
            </>
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