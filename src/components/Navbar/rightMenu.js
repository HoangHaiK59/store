import React from 'react';
import { Menu, Icon } from 'antd';
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

export default function RightMenu(props) {
    return (
        <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a style={{fontSize: '1.5rem'}} href="">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a style={{fontSize: '1.5rem'}} href="">Signup</a>
        </Menu.Item>
      </Menu>
     ); 
}