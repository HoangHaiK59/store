import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col } from 'antd';
import './category.css';
class Category extends React.Component {
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
                    cover: 'https://i.imgur.com/Wfm7IHE.jpg'
                },
                {
                    id: 8,
                    name: 'Product 8',
                    cover: 'https://i.imgur.com/lcbpc1a.jpg'
                },
                {
                    id: 9,
                    name: 'Product 9',
                    cover: 'https://i.imgur.com/bXrraSH.jpg'
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
        return <div className='women-container'>
            <div className="nm-row">
                <Col md={24}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='center' style={{ padding: '0px 24px' }}>
                        {
                            this.state.products.map((product, id) => id % 2 === 0 ? <Col key={id} span={24}>
                                <Row gutter={[16, 16]} justify='start'>
                                    <Col span={12} className='product'
                                        onMouseMove={() => this.onMouseMove(id)}
                                        onMouseLeave={() => this.onMouseLeave(id)}
                                        style={{ height: '600px', position: 'relative' }}>
                                        <div className="product-header">
                                            <div className="product-cover">
                                                <img src={product.cover} alt="productImage" style={{ objectFit: 'cover' }} />
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
                                                    <img src={product.cover} alt="productImage" style={{ objectFit: 'cover' }} />
                                                </div>
                                            </div>
                                            {
                                                product.active && <div className='info'>
                                                    <Row gutter={[16, 16]}>
                                                        <Col span={24}>
                                                            <button type="ghost" className='btn-view'>View</button>
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
                </Col>
            </div>
        </div>
    }
}

export default Category;