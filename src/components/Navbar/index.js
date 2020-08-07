import React from 'react';
import { Menu, Dropdown, Drawer, Tree, Button } from 'antd';
import { DownOutlined, MenuOutlined, HomeOutlined, SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import './navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Constants } from '../../store/constants';
import { instance } from '../../utils/axios';

const DressMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/skirt' className="header-navbar_item-style">Chân váy</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/dress' className="header-navbar_item-style">Váy liền</Link>
        </Menu.Item>
    </Menu>
)

const TopMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/jacket' className="header-navbar_item-style">Áo khoác</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/shirts' className="header-navbar_item-style">Áo sơ mi</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/tshirts' className="header-navbar_item-style">Áo phông</Link>
        </Menu.Item>
    </Menu>
)

const PantMenu = (
    <Menu>
        <Menu.Item>
            <Link to='/jean' className="header-navbar_item-style">Quần jean</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/jumpsuit' className="header-navbar_item-style">Quần áo bộ</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/short' className="header-navbar_item-style">Quần short</Link>
        </Menu.Item>
    </Menu>
)

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
    React.useEffect(() => {
        const getClientMenu = () => {
            instance.get('GetClientMenu', {
                headers: {
                    Authorization: localStorage.getItem('token') ?'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token : ''
                }
            })
            .then(response => {
                if(response.data.success) {
                    console.log(response.data)
                }
            })
        }
        getClientMenu();
    }, [])
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
                <div className="header-brand"><HomeOutlined size={15}/></div>
                <div className="header-navbar">
                    <div>
                        <div className="header-navbar_item">
                            <Link to='/store' className="header-navbar_item-style">Trang chủ</Link>
                        </div>
                    </div>
                    <div>
                        <div className="header-navbar_item">
                            <Dropdown overlay={DressMenu}>
                                <Link to='/dress' className="ant-dropdown-link header-navbar_item-style" onClick={e => e.preventDefault()}>
                                    Váy
                        </Link>
                            </Dropdown>
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
                            <Link to='/admin' className="header-navbar_item-style" >
                                Admin
                    </Link>
                        </div>
                    </div>
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