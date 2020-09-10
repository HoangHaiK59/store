import React from 'react';
import './home.css';
import { Row, Col, Carousel, Breadcrumb, Spin } from 'antd';
import { connect } from 'react-redux';
import { storeActions } from '../../store/actions/store.action';
import { instance } from '../../utils/axios';
import Content from '../Content';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            offSet: 0,
            pageSize: 20,
            catId: '2d21b432-dcc5-4a3b-8021-326c81f4c89a',
            dimension: {
                width: 0,
                height: 0
            }
        };
        document.title = 'SHU';
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
    }
    handleClick(id) {
        this.props.history.push(`product/${id}`);
    }

    getProducts() {
        instance.get(`GetProducts?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}`, {
        }).then(response => {
            if (response.data.success) {
                const { data } = response.data;

                this.setState(state => ({ products: state.products.concat(data) }));
            }
        })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.isSticky !== this.props.isSticky) {
            let offSet = this.state.offSet + this.state.pageSize;
            instance.get(`GetProducts?offSet=${offSet}&pageSize=${this.state.pageSize}`, {
            }).then(response => {
                if (response.data.success) {
                    const { data } = response.data;
    
                    this.setState(state => ({offSet, products: state.products.concat(data) }));
                }
            })
                .catch(error => {
                    console.log(error)
                })
        }
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

    //     <Col md={{span: 24}} sm={{span: 16}} xs={{span: 16}} >
    //     <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start">
    //         <Col md={{span: 12}} sm={{span: 8}} xs={{span: 10}} >
    //             <h5>Collection 2</h5>
    //         </Col>
    //         <Col md={{span: 12}} sm={{span: 8}} xs={{span: 8}} style={{ textAlign: 'right' }}>
    //             <h5>View all</h5>
    //         </Col>
    //     </Row>
    // </Col>
    // <Col md={{span: 24}} sm={{span: 16}} xs={{span: 16}}>
    //     <div className='items-container' style={{ marginTop: '10px' }}>
    //         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start" align="middle" style={{ width: '95%' }}>
    //             {
    //                 this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} 
    //                 key={id}
    //                 xs={{span: 16}}
    //                 sm={{span: 16}}
    //                 md={{span: 3}}
    //                  className="product">
    //                     <div className="product-header">
    //                         <div className="product-cover">
    //                             <img src={product.image} alt="productImage" />
    //                         </div>
    //                     </div>
    //                     <h5 className="product-name">{product.name}</h5>
    //                 </Col>)
    //             }
    //         </Row>
    //     </div>
    // </Col>
    // <Col md={{span: 24}} sm={{span: 16}} xs={{span: 16}}>
    //     <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start">
    //         <Col md={{span: 12}} sm={{span: 8}} xs={{span: 10}}>
    //             <h5>Collection 3</h5>
    //         </Col>
    //         <Col md={{span: 12}} sm={{span: 8}} xs={{span: 8}} style={{ textAlign: 'right' }}>
    //             <h5>View all</h5>
    //         </Col>
    //     </Row>
    // </Col>
    // <Col md={{span: 24}} sm={{span: 16}} xs={{span: 16}} >
    //     <div className='items-container' style={{ marginTop: '10px' }}>
    //         <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start" align="middle" style={{ width: '95%' }}>
    //             {
    //                 this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)}
    //                  key={id}
    //                  xs={{span: 16}}
    //                  sm={{span: 16}}
    //                  md={{span: 3}}
    //                  className="product">
    //                     <div className="product-header">
    //                         <div className="product-cover">
    //                             <img src={product.image} alt="productImage" />
    //                         </div>
    //                     </div>
    //                     <h5 className="product-name">{product.name}</h5>
    //                 </Col>)
    //             }
    //         </Row>
    //     </div>
    // </Col>
    render() {
        return (
            this.state.products.length > 0 ? <Content items={this.state.products}  handleClick={this.handleClick.bind(this)}/>:
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);