import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col, Select, InputNumber, Button } from 'antd';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import './product.css';
import { instance } from '../../utils/axios';
const { Option } = Select;
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            qty: 1,
            size: '',
            colors: []
        }
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
        this.productRef = React.createRef();
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
        if (this.state.product) {
            ReactDOM.findDOMNode(this).scrollIntoView();
        }
        //this.productRef.current.scrollIntoView()
    }

    addToCart() {

    }

    getDetailProduct() {
        const { params } = this.props.match;
        instance.get(`GetDetailProduct?id=${params.id}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                let product = {...data, images: data.images.split(';').map((value, id) => {
                    if (id ===0) {
                        return {...JSON.parse(value), active: true} 
                    } else {
                        return {...JSON.parse(value), active: false}
                    }
                }), size: data.size.split(',') };
                console.log(product)
                this.setState({ product })
            }
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        //console.log(this.props.history);
        this.getDetailProduct();
        this.scrollTop();
    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        return this.state.product && <div ref={this.productRef} className='product-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
            <div className='content-product'>
                <Row gutter={[16, 16]} justify='start' style={{ height: '100%' }}>
                    <Col span={16}>
                        {
                            this.state.product.images.map((image, id) => image.active ? <img key={id} src={image.url} alt="" className='cover' />: null)
                        }
                    </Col>
                    <Col span={6}>
                        <Row justify='start'>
                            <Col span={24}>
                                <h5 >{this.state.product.name}</h5>
                            </Col>
                        </Row>
                        <Row justify='start'>
                            <Col span={24}>
                                <p >{this.state.product.description}</p>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 30 }}>
                            <Col span={24}>
                                <p >{this.formater.format(this.state.product.price)}</p>
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
                                        this.state.product.images.map((image, id) => <Button 
                                        key={id}
                                        span={1}
                                        className='product-color'
                                        onClick={() => this.handleChangeColor(image.color)}
                                        style={{ backgroundColor: image.color, marginLeft: id > 0 ? '5px' : 0 }}></Button>)
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row justify='start' style={{ marginTop: 20 }}>
                            <Col span={12}>
                                <Select defaultValue='M' style={{ width: '100%' }} size={"middle"} showAction={['click', 'focus']} showSearch={true} onChange={this.handleChangeSize.bind(this)}>
                                    {
                                        this.state.product.size.map((size, id) => <Option key={id} value={size}>{size}</Option>)
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