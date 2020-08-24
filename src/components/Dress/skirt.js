import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col } from 'antd';

export default class Winter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    cover: 'https://i.imgur.com/GXy9UIG.jpg',
                    price: 300000
                },
                {
                    id: 2,
                    name: 'Product 2',
                    cover: 'https://i.imgur.com/Wj6dytl.jpg',
                    price: 300000
                },
                {
                    id: 3,
                    name: 'Product 3',
                    cover: 'https://i.imgur.com/9qf6WyB.jpg',
                    price: 300000
                },
                {
                    id: 4,
                    name: 'Product 4',
                    cover: 'https://i.imgur.com/ijWScLn.jpg',
                    price: 300000
                },
                {
                    id: 5,
                    name: 'Product 5',
                    cover: 'https://i.imgur.com/gXTbY7M.jpg',
                    price: 300000
                },
                {
                    id: 6,
                    name: 'Product 6',
                    cover: 'https://i.imgur.com/qqBB3Dz.jpg',
                    price: 300000
                },
                {
                    id: 7,
                    name: 'Product 7',
                    cover: 'https://i.imgur.com/Wfm7IHE.jpg',
                    price: 300000
                },
                {
                    id: 8,
                    name: 'Product 8',
                    cover: 'https://i.imgur.com/lcbpc1a.jpg',
                    price: 300000
                },
                {
                    id: 9,
                    name: 'Product 9',
                    cover: 'https://i.imgur.com/bXrraSH.jpg',
                    price: 300000
                }
            ]
        }
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    render() {
        const { products } = this.state;
        return (
            <div className='collection-container'>
                <div className="nm-row">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" style={{ padding: '0 12px' }}>
                        <Col md={{ span: 24 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                            <div className='items-container'>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start" align="middle">
                                    {
                                        products.map((product, id) => <Col onClick={() => this.handleClick(product.id)}
                                            key={id}
                                            xs={{ span: 12 }}
                                            sm={{ span: 12 }}
                                            md={{ span: 6 }}

                                            className="product">
                                            <div className="product-header">
                                                <div className="product-cover">
                                                    <img src={product.cover} alt="productImage" />
                                                </div>
                                            </div>
                                            <p className="product-name">{product.name}</p>
                                            <p className="product-price" style={{ marginTop: '-10px' }}>{this.formater.format(product.price)}</p>
                                        </Col>)
                                    }
                                </Row>
                            </div>
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}