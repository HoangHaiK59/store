import React from 'react';
import './sidebar.css';
export default function Sidebar(props) {
    return (
        <div className="shop-header">
            <div className="shop-menu">
                <div className="nm-row">
                    <div className='col-md-12'>
                        <ul className="category-menu">
                            <li className="category-item">
                                <a href="/home">Tất cả</a>
                            </li>
                            <li className="category-item">
                                <a href="/home">
                                    Tất cả
                                </a>
                            </li>
                        </ul>
                        <ul className="filter-menu">
                            <li className="category-item">
                                <a href="/home">Lọc</a>
                            </li>
                            <li className="category-item">
                                <a href="/home">Tìm kiếm</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}