import React from 'react';
import './collection.css';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col, Spin } from 'antd';
import Content from '../Content';

export default class Shirts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    image: 'https://i.imgur.com/GXy9UIG.jpg',
                    price: 300000
                },
                {
                    id: 2,
                    name: 'Product 2',
                    image: 'https://i.imgur.com/Wj6dytl.jpg',
                    price: 300000
                },
                {
                    id: 3,
                    name: 'Product 3',
                    image: 'https://i.imgur.com/9qf6WyB.jpg',
                    price: 300000
                },
                {
                    id: 4,
                    name: 'Product 4',
                    image: 'https://i.imgur.com/ijWScLn.jpg',
                    price: 300000
                },
                {
                    id: 5,
                    name: 'Product 5',
                    image: 'https://i.imgur.com/gXTbY7M.jpg',
                    price: 300000
                },
                {
                    id: 6,
                    name: 'Product 6',
                    image: 'https://i.imgur.com/qqBB3Dz.jpg',
                    price: 300000
                },
                {
                    id: 7,
                    name: 'Product 7',
                    image: 'https://i.imgur.com/Wfm7IHE.jpg',
                    price: 300000
                },
                {
                    id: 8,
                    name: 'Product 8',
                    image: 'https://i.imgur.com/lcbpc1a.jpg',
                    price: 300000
                },
                {
                    id: 9,
                    name: 'Product 9',
                    image: 'https://i.imgur.com/bXrraSH.jpg',
                    price: 300000
                }
            ]
        }
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    render() {
        const { products } = this.state;
        return (
            products.length > 0 ? <Content items={products} handleClick={this.handleClick.bind(this)}/>:
            <Spin />
        )
    }
}