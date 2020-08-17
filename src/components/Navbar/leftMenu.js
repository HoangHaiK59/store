import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default function LeftMenu(props) {
    return (
        <Menu mode="vertical-left">
            <Menu.Item key="mail">
                <a href="/home">Trang chủ</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">Áo sơ mi</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">Áo thun</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">Quần nữ</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">Váy đầm</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">Phụ kiện</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">Sale off</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/home">SP mùa đông</a>
            </Menu.Item>
        </Menu>
    );
}