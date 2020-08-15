import React from 'react';
import { Menu, Dropdown, Drawer, Tree, Button } from 'antd';
import { DownOutlined, MenuOutlined, HomeOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import './navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';
import { instance } from '../../utils/axios';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useDimensions() {
    const [dimensions, setDimensions] = React.useState(getWindowDimensions())
    React.useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions())
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return dimensions;
}


const Navbar = (props) => {
    const [visible, setVisible] = React.useState(false);
    const { width, height } = useDimensions();
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
                        let menusTmp = data.map(menu => ({ ...menu, submenus: menu.submenus !== ''? menu.submenus.split(';').map(value => JSON.parse(value)): menu.submenus }))
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

    const treeData = [
        {
            title: 'Home',
            key: '0',
            icon: <HomeOutlined />
        },
        {
            title: 'parent 1',
            key: '1',
            icon: <SmileOutlined />,
            children: [
                {
                    title: 'leaf',
                    key: '1-0',
                    icon: <MehOutlined />,
                },
                {
                    title: 'leaf',
                    key: '1-1',
                    icon: ({ selected }) => (selected ? <FrownOutlined /> : <FrownOutlined />),
                },
            ],
        },
    ];

    return (
        (width > 800 && height > 600) ?
            <div className="header">
                <div className="header-brand"><HomeOutlined size={15} /></div>
                <div className="header-navbar">
                    {
                        menus.map((menu, id) => {
                            if (menu.type === 'link') {
                                return (
                                    <div key={id}>
                                        <div className="header-navbar_item">
                                            <Link to={menu.path} className="header-navbar_item-style">{menu.name}</Link>
                                        </div>
                                    </div>)
                            } else {
                                const menuItem = (
                                    <Menu>
                                    {
                                        menu.submenus.map((item, id) => <Menu.Item key={id}>
                                            <Link to={item.path} className="header-navbar_item-style">{item.name}</Link>
                                        </Menu.Item>)
                                    }
                                </Menu>
                                )
                                return (
                                    <Dropdown key={id} overlay={menuItem}>
                                        <Link to={menu.path} className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                                            {menu.name}
                                        </Link>
                                    </Dropdown>
                                    )
                            }
                        })
                    }
                </div>
                <div className="header-widget margin-left">
                    <div>
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
                    </div>
                </div>
            </div> :
            <>
                <Button icon={<MenuOutlined style={{ color: '#fff' }} />} type="default" style={{ backgroundColor: '#000', border: 'none' }} onClick={showMobileNav}>
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="left"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <Tree
                        showIcon
                        defaultExpandAll={false}
                        defaultSelectedKeys={['0']}
                        switcherIcon={<DownOutlined />}
                        treeData={treeData}
                    />
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