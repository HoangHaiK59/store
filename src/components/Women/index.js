import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col, Button } from 'antd';
import './women.css';
class Women extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    cover: 'https://i.imgur.com/GXy9UIG.jpg',
                    active: false
                },
                {
                    id: 2,
                    name: 'Product 2',
                    cover: 'https://i.imgur.com/Wj6dytl.jpg',
                    active: false
                },
                {
                    id: 3,
                    name: 'Product 3',
                    cover: 'https://i.imgur.com/9qf6WyB.jpg',
                    active: false
                },
                {
                    id: 4,
                    name: 'Product 4',
                    cover: 'https://i.imgur.com/ijWScLn.jpg',
                    active: false
                },
                {
                    id: 5,
                    name: 'Product 5',
                    cover: 'https://i.imgur.com/gXTbY7M.jpg',
                    active: false
                },
                {
                    id: 6,
                    name: 'Product 6',
                    cover: 'https://i.imgur.com/qqBB3Dz.jpg',
                    active: false
                },
                {
                    id: 7,
                    name: 'Product 7',
                    cover: 'https://i.imgur.com/ijWScLn.jpg',
                    active: false
                },
                {
                    id: 8,
                    name: 'Product 7',
                    cover: 'https://i.imgur.com/ijWScLn.jpg',
                    active: false
                }
            ]
        };
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
        document.title = 'Women'
    }

    onMouseMove(id) {
        const products = this.state.products.map((product, index) => index === id ? ({ ...product, active: true }) : ({ ...product, active: false }));
        this.setState({ products });
    }

    onMouseLeave(id) {
        const products = this.state.products.map((product, index) => index === id ? ({ ...product, active: false }) : ({ ...product }));
        this.setState({ products });
    }

    render() {
        return <div className='women-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <Row gutter={[16, 16]} justify='start'>
                {
                    this.state.products.map((product, id) => id % 2 === 0 ? <Col key={id} span={24}>
                        <Row gutter={[16, 16]} justify='start'>
                            <Col span={12} className='product'
                                onMouseMove={() => this.onMouseMove(id)}
                                onMouseLeave={() => this.onMouseLeave(id)}
                                style={{ height: '600px', position: 'relative' }}>
                                <div className="product-header">
                                    <div className="product-cover">
                                        <img src={product.cover} alt="productImage" />
                                    </div>
                                </div>
                                {
                                    product.active && <div className='info'>
                                        <Row gutter={[16, 16]}>
                                            <Col span={24}>
                                                <button className='btn-view'>View</button>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </Col>
                            <Col span={12}></Col>
                        </Row>
                    </Col> :
                        <Col key={id} span={24}>
                            <Row gutter={[16, 16]} justify='start'>
                                <Col span={12}>

                                </Col>
                                <Col span={12} className='product'
                                    onMouseMove={() => this.onMouseMove(id)}
                                    onMouseLeave={() => this.onMouseLeave(id)}
                                    style={{ height: '600px', position: 'relative' }}>
                                    <div className="product-header">
                                        <div className="product-cover">
                                            <img src={product.cover} alt="productImage" />
                                        </div>
                                    </div>
                                    {
                                        product.active && <div className='info'>
                                            <Row gutter={[16, 16]}>
                                                <Col span={24}>
                                                    <button className='btn-view'>View</button>
                                                </Col>
                                            </Row>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    )
                }
            </Row>
        </div>
    }
}

export default Women;