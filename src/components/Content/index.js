import React from 'react';
import { Row, Col } from 'antd';
import { NAV_BAR_HEIGHT } from '../../helper/calc';

const Content = ({ items, handleClick }) => {
    const formater = new Intl.NumberFormat('vn', {
        style: 'currency',
        currency: 'VND'
    });
    return (
        <div className='collection-container'>
            <div className="nm-row">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center" style={{ padding: '0 12px' }}>
                    <Col md={{ span: 24 }} sm={{ span: 16 }} xs={{ span: 16 }}>
                        <div className='items-container'>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start" align="middle">
                                {
                                    items.map((product, id) => <Col onClick={() => handleClick(product.id)}
                                        key={id}
                                        xs={{ span: 12 }}
                                        sm={{ span: 12 }}
                                        md={{ span: 6 }}

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
    )
}

export default Content;