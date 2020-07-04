import React from 'react';
import { Row, Col } from 'antd';
import './product.css';
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {
                id: 5,
                name: 'Product 5',
                cover: 'https://i.imgur.com/gXTbY7M.jpg',
                price: 300000,
                size: ['S', 'M', 'L', 'XL'],
                color: ['red', 'pink', '#3e88b3']
            }
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { product } = this.state;
        return <div className='product-container'>
            <div className='content'>
                <Row gutter={[16, 16]} justify='start' style={{ height: '100%' }}>
                    <Col span={16}>
                        <img src={product.cover} alt="" className='cover' />
                    </Col>
                    <Col span={6}>
                        <Row justify='start'>
                            <Col span={24}>
                                <h5>{product.name}</h5>
                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={24}>

                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={24}>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    }
}

export default Product;