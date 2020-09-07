import React from 'react';
import { Row, Col } from 'antd';
import './animation.css';

const Content = ({ items, handleClick }) => {
    const formater = new Intl.NumberFormat('vn', {
        style: 'currency',
        currency: 'VND'
    });
    const products = items.map(val => ({...val, active: false}));
    const onMouseMove = productId => products.map(val => {
        if(val.id === productId) {
            return {...val, active: true}
        } else {
            return {...val, active: false}
        }
    })
    const onMouseLeave = productId => products.map(val => {
        if(val.id === productId) {
            return {...val, active: false}
        } else {
            return val;
        }
    })
    console.log(products)
    return (
        <div className='collection-container'>
            <div className="nm-row">
                <div style={{width: '100%', height: '100%'}} className='slide-in-left'>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" style={{ padding: '0 12px' }}>
                        <Col md={{ span: 24 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                            <div className='items-container'>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start" align="middle">
                                    {
                                        products.map((product, id) => <Col 
                                        onClick={() => handleClick(product.id)}
                                            key={id}
                                            xs={{ span: 12 }}
                                            sm={{ span: 12 }}
                                            md={{ span: 6 }}
                                            onMouseMove={() => onMouseMove(product.id)}
                                            onMouseLeave={() => onMouseLeave(product.id)}
                                            className="product">
                                            <div className="product-header">
                                                <div className="product-cover">
                                                    <img src={product.image} alt="productImage" />
                                                </div>
                                            </div>
                                            <p className="product-name">{product.name}</p>
                                            <p className="product-price" style={{ marginTop: '-10px' }}>{formater.format(product.price)}</p>
                                        </Col>)
                                    }
                                </Row>
                            </div>
                        </Col>

                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Content;