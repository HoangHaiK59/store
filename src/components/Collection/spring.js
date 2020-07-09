import React from 'react';
import './collection.css';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col } from 'antd';

export default class Spring extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    cover: 'https://i.imgur.com/GXy9UIG.jpg'
                },
                {
                    id: 2,
                    name: 'Product 2',
                    cover: 'https://i.imgur.com/Wj6dytl.jpg'
                },
                {
                    id: 3,
                    name: 'Product 3',
                    cover: 'https://i.imgur.com/9qf6WyB.jpg'
                },
                {
                    id: 4,
                    name: 'Product 4',
                    cover: 'https://i.imgur.com/ijWScLn.jpg'
                },
                {
                    id: 5,
                    name: 'Product 5',
                    cover: 'https://i.imgur.com/gXTbY7M.jpg'
                },
                {
                    id: 6,
                    name: 'Product 6',
                    cover: 'https://i.imgur.com/qqBB3Dz.jpg'
                },
                {
                    id: 7,
                    name: 'Product 7',
                    cover: 'https://i.imgur.com/ijWScLn.jpg'
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
            <div className='collection-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
                <Row gutter={[16, 16]} justify="start" >
                    {
                        products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                            <div className="product-header">
                                <div className="product-cover">
                                    <img src={product.cover} alt="productImage" />
                                </div>
                            </div>
                            <h5 className="product-name">{product.name}</h5>
                        </Col>)
                    }
                </Row>
            </div>
        )
    }
}