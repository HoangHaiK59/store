import React from 'react';
import './home.css';
import { Row, Col } from 'antd';
import { Footer } from '../Footer/footer';
import { Subscribe } from '../Subscribe/subscribe';
import { useTitle } from '../../helper/feature';

export const Home = ({title}) => {
    useTitle({title: title})
    return <div className="store-container">
        <div className="content-header">
            <div className="content-header__description">
                <div className="content-header__description--cover">
                    <h2>Style us</h2>
                </div>
                <button className="content-header__description--checkoutbtn">
                </button>
            </div>
            <div className="content-header__cover-image">
                <img src="https://i.imgur.com/RNxJAku.jpg" alt="cover" />
            </div>
        </div>
        <div className="content">
            <Row gutter={[16, 16]} justify="space-around">
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="space-around" style={{ marginTop: '5%' }}>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
            </Row>
            <Row gutter={[16, 16]} justify="space-around" style={{ marginTop: '5%' }}>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
                <Col span={4} className="product">
                    <div className="product-cover">
                        <img src="https://i.imgur.com/uywwI45.jpg" alt="productImage" />
                    </div>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '5%' }}    >
                <Col span={12} style={{ backgroundColor: 'rgba(250, 246, 246, 0.055)' }}>contact us</Col>
                <Col span={12} style={{ background: 'pink' }}>image cover</Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '5%' }}    >
                <Col span={8} ></Col>
                <Col span={8} style={{ background: 'transparent' }}>
                    <Subscribe />
                </Col>
                <Col span={8} ></Col>
            </Row>
        </div>
        <Footer />
    </div>
}