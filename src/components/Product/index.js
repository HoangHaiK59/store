import React from 'react';
import ReactDOM from 'react-dom';
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
                images: [
                    {
                        color: 'red',
                        url: 'https://i.imgur.com/gXTbY7M.jpg',
                        active: true,
                    },
                    {
                        color: 'pink',
                        url: 'https://i.imgur.com/GXy9UIG.jpg',
                        active: false
                    },
                    {
                        color: '#3e88b3',
                        url: 'https://i.imgur.com/ijWScLn.jpg',
                        active: false
                    }
                ],
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
        });
    }

    handleChangeSize(size) {
        this.setState({ size })
    }

    handleChangeQty(qty) {
        this.setState({ qty });
    }

    handleChangeColor(color) {
        const images = this.state.product.images.map(image => image.color === color ? ({ ...image, active: true }): ({ ...image, active: false }));
        this.setState(state =>({ product: {...state.product, images} }))
    }

    scrollTop() {
        ReactDOM.findDOMNode(this).scrollIntoView();
    }

    addToCart() {

    }

    componentDidMount() {
        this.scrollTop();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        const { product } = this.state;
        return <div className='product-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <div className='content-product'>
                <Row gutter={[16, 16]} justify='start' style={{ height: '100%' }}>
                    <Col span={16}>
                        {
                            product.images.map((image, id) => image.active ? <img key={id} src={image.url} alt="" className='cover' />: null)
                        }
                    </Col>
                    <Col span={6}>
                        <Row justify='start'>
                            <Col span={24}>
                                <h5 >{product.name}</h5>
                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={24}>
                                <p >A description for product</p>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 30 }}>
                            <Col span={24}>
                                <p >{this.formater.format(product.price)}</p>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 50 }}>
                            <Col span={24}>
                                <Row justify='start'>
                                    <Col span={24}>
                                        <h5 >Color</h5>
                                    </Col>
                                </Row>
                                <Row justify='start'>
                                    {
                                        product.colors.map((color, id) => <Button 
                                        key={id}
                                        span={1}
                                        className='product-color'
                                        onClick={() => this.handleChangeColor(color)}
                                        style={{ backgroundColor: color, marginLeft: id > 0 ? '5px' : 0 }}></Button>)
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
                                <InputNumber min={1} max={10} style={{ width: '100%' }} value={this.state.qty} onChange={this.handleChangeQty.bind(this)}></InputNumber>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 20 }}>
                            <Col span={24}>
                                <Button className='btn-cart' onClick={this.addToCart.bind(this)}>
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