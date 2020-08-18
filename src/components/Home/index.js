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
            categoryId: 1,
            dimension: {
                width: 0,
                height: 0
            }
        };
        document.title = 'Home';
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
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
        console.log(this.props)
        return <div className="store-container">

            {
                (!this.props.isMobile) && <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ height: '500px' }} justify="start" align="middle" >
                <Col md={{span: 24}} sm={{span: 16}} xs={{span: 14}}>
                    <Carousel autoplay effect={'fade'} speed={2}>
                        {
                            this.state.products.map((product, id) => <div key={id} style={{ height: 500, width: '100%' }}>
                                <img src={product.image} alt="cover" style={{ objectFit: 'cover', height: 500, width: '100%' }} />
                            </div>)
                        }
                    </Carousel>
                </Col>
                </Row>
            }
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '15px' }}>
                <Col md={{span: 24}} sm={{span: 16}} xs={{span: 16}}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start">
                        <Col md={{span: 12}} sm={{span: 8}} xs={{span: 10}} >
                            <h5>Collection 1</h5>
                        </Col>
                        <Col md={{span: 12}} sm={{span: 8}} xs={{span: 8}} style={{ textAlign: 'right' }}>
                            <h5>View all</h5>
                        </Col>
                    </Row>
                </Col>
                <Col md={{span: 24}} sm={{span: 16}} xs={{span: 16}}>
                    <div className='items-container'>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="start" align="middle" style={{ width: '95%' }}>
                            {
                                this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} 
                                key={id} 
                                xs={{span: 16}}
                                sm={{span: 16}}
                                md={{span: 3}}

                                className="product">
                                    <div className="product-header">
                                        <div className="product-cover">
                                            <img src={product.image} alt="productImage" />
                                        </div>
                                    </div>
                                    <p className="product-name">{product.name}</p>
                                    <p className="product-price" style={{marginTop: '-10px'}}>{this.formater.format(product.price)}</p>
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