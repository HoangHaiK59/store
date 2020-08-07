import React from 'react';
import './home.css';
import { Row, Col, Carousel } from 'antd';
import { connect } from 'react-redux';
import { storeActions } from '../../store/actions/store.action';
import { instance } from '../../utils/axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            offSet: 0,
            pageSize: 20, 
            categoryId: 1
        };
        document.title = 'Home';
    }
    handleClick(id) {
        this.props.history.push(`product/${id}`);
    }

    getProducts() {
        instance.get(`GetProductByCategory?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&category_id=${this.state.categoryId}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                let products = data.map(item => ({...item, images: item.images.split(';').map(value => JSON.parse(value) )}));
                //console.log(data, dresses)
                this.setState({ products })
            }
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getProducts();
    }
    //     <Col span={12} >
    //     <div className="content-header__description">
    //         <div className="content-header__description--cover">
    //             <h2>Style us</h2>
    //         </div>
    //         <button className="content-header__description--checkoutbtn">
    //         </button>
    //     </div>
    // </Col>
    render() {
        return <div className="store-container">

            <Row gutter={[16, 16]} style={{ height: '500px' }} justify="start" align="middle" >
                <Col span={24}>
                    <Carousel autoplay effect={'fade'} speed={2}>
                        {
                            this.state.products.map((product, id) => <div key={id} style={{ height: 500 }}>
                                <img src={product.image} alt="cover" style={{ objectFit: 'cover', height: 500, width: '100%' }} />
                            </div>)
                        }
                    </Carousel>
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '15px' }}>
                <Col span={24}>
                    <Row gutter={[16, 16]} justify="start">
                        <Col span={12}>
                            <h5>Collection 1</h5>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <h5>View all</h5>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <div className='items-container'>
                        <Row gutter={[16, 16]} justify="start" align="middle" style={{ width: '95%' }}>
                            {
                                this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                                    <div className="product-header">
                                        <div className="product-cover">
                                            <img src={product.image} alt="productImage" />
                                        </div>
                                    </div>
                                    <h5 className="product-name">{product.name}</h5>
                                </Col>)
                            }
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 16]} justify="start">
                        <Col span={12}>
                            <h5>Collection 2</h5>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <h5>View all</h5>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <div className='items-container' style={{ marginTop: '10px' }}>
                        <Row gutter={[16, 16]} justify="start" align="middle" style={{ width: '95%' }}>
                            {
                                this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                                    <div className="product-header">
                                        <div className="product-cover">
                                            <img src={product.image} alt="productImage" />
                                        </div>
                                    </div>
                                    <h5 className="product-name">{product.name}</h5>
                                </Col>)
                            }
                        </Row>
                    </div>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 16]} justify="start">
                        <Col span={12}>
                            <h5>Collection 3</h5>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <h5>View all</h5>
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <div className='items-container' style={{ marginTop: '10px' }}>
                        <Row gutter={[16, 16]} justify="start" align="middle" style={{ width: '95%' }}>
                            {
                                this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                                    <div className="product-header">
                                        <div className="product-cover">
                                            <img src={product.image} alt="productImage" />
                                        </div>
                                    </div>
                                    <h5 className="product-name">{product.name}</h5>
                                </Col>)
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        isSuccess: state.isSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => {
            dispatch(storeActions.getProducts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);