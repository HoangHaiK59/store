import React from 'react';
import './sidebar.css';
import { SearchOutlined, FilterOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history } from '../../helper/history';
import { Link } from 'react-router-dom';
export default function Sidebar(props) {
    return (
        <div className="shop-header">
            <div className="shop-menu">
                <div className="nm-row">
                    <div className='col-md-12'>
                        <ul className="category-menu">
                            <li className="category-item">
                                <ArrowLeftOutlined onClick={() => history.goBack()}/>
                            </li>
                            <li className="category-item">
                                <Link to="/home">ALL</Link>
                            </li>
                            <li className="category-item">
                                <Link to="/dress">
                                    Dress
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/skirt">
                                    Skirt
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/shirts">
                                    Shirts
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/tshirts">
                                    Tshirts
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/jumpsuit">
                                    Jumpsuit
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/jean">
                                    Jean
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/short">
                                    Short
                                </Link>
                            </li>
                            <li className="category-item">
                                <Link to="/accessories">
                                    Accessories
                                </Link>
                            </li>
                        </ul>
                        <ul className="filter-menu">
                            <li className="category-item">
                                <Link to="/home"><FilterOutlined /></Link>
                            </li>
                            <li className="category-item">
                                <Link to="/home"><SearchOutlined /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}