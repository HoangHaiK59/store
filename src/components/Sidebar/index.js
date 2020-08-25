import React from 'react';
import './sidebar.css';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
export default function Sidebar(props) {
    return (
        <div className="shop-header">
            <div className="shop-menu">
                <div className="nm-row">
                    <div className='col-md-12'>
                        <ul className="category-menu">
                            <li className="category-item">
                                <a href="/home">ALL</a>
                            </li>
                            <li className="category-item">
                                <a href="/dress">
                                    Dress
                                </a>
                            </li>
                            <li className="category-item">
                                <a href="/skirt">
                                    Skirt
                                </a>
                            </li>
                            <li className="category-item">
                                <a href="/shirts">
                                    Shirts
                                </a>
                            </li>
                            <li className="category-item">
                                <a href="/tshirts">
                                    Tshirts
                                </a>
                            </li>
                            <li className="category-item">
                                <a href="/jean">
                                    Jean
                                </a>
                            </li>
                            <li className="category-item">
                                <a href="/short">
                                    Short
                                </a>
                            </li>
                            <li className="category-item">
                                <a href="/accessories">
                                    Accessories
                                </a>
                            </li>
                        </ul>
                        <ul className="filter-menu">
                            <li className="category-item">
                                <a href="/home"><FilterOutlined /></a>
                            </li>
                            <li className="category-item">
                                <a href="/home"><SearchOutlined /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}