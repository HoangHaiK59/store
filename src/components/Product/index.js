import React from 'react';
import { Row, Col, Select, InputNumber, Button } from 'antd';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import './product.css';
const { Option } = Select;
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
                colors: ['red', 'pink', '#3e88b3']
            },
            qty: 1,
            size: ''
        }
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        })
    }

    handleChangeSize(size) {
        this.setState({ size })
    }

    handleChangeQty(qty) {
        this.setState({ qty });
    }

    addToCart() {

    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { product } = this.state;
        return <div className='product-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <div className='content-product'>
                <Row gutter={[16, 16]} justify='start' style={{ height: '100%' }}>
                    <Col span={16}>
                        <img src={product.cover} alt="" className='cover' />
                    </Col>
                    <Col span={6}>
                        <Row justify='start'>
                            <Col span={24}>
                                <h5 style={{ color: '#fff' }}>{product.name}</h5>
                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={24}>
                                <p style={{ color: '#fff' }}>A description for product</p>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 30 }}>
                            <Col span={24}>
                                <p style={{ color: '#fff' }}>{this.formater.format(product.price)}</p>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 50 }}>
                            <Col span={24}>
                                <Row justify='start'>
                                    <Col span={24}>
                                        <h5 style={{ color: '#fff' }}>Color</h5>
                                    </Col>
                                </Row>
                                <Row justify='start'>
                                    {
                                        product.colors.map((color, id) => <Col key={id} span={1} className='product-color' style={{ backgroundColor: color, marginLeft: id > 0 ? '5px' : 0 }}></Col>)
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 20 }}>
                            <Col span={12}>
                                <Select defaultValue='M' style={{ width: '100%' }} size={"middle"} showAction={['click', 'focus']} showSearch={true} onChange={this.handleChangeSize.bind(this)}>
                                    {
                                        product.size.map((size, id) => <Option key={id} value={size}>{size}</Option>)
                                    }
                                </Select>
                            </Col>
                            <Col style={{ marginLeft: 15 }} span={11}>
                                <InputNumber style={{ width: '100%' }} value={this.state.qty} onChange={this.handleChangeQty.bind(this)}></InputNumber>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 20 }}>
                            <Col span={24}>
                                <Button style={{ width: '100%' }} onClick={this.addToCart.bind(this)}>
                                    ADD TO CART
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    }
}

export default Product;