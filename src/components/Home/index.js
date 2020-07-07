import React from 'react';
import './home.css';
import { Row, Col } from 'antd';
import { useTitle } from '../../helper/feature';
import { connect } from 'react-redux';
import { storeActions } from '../../store/actions/store.action';
import Contact from '../Contact';


const useFetching = (callback) => {
    // const [data, setData] = React.useState({});
    // const [success, setSuccess] = React.useState(false);
    const ref = React.useRef();

    React.useEffect(() => {
        ref.current = callback;
    })

    React.useEffect(() => {
        ref.current();
    })
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    cover: 'https://i.imgur.com/GXy9UIG.jpg'
                },
                {
                    id: 2,
                    name: 'Product 2',
                    cover: 'https://i.imgur.com/Wj6dytl.jpg'
                },
                {
                    id: 3,
                    name: 'Product 3',
                    cover: 'https://i.imgur.com/9qf6WyB.jpg'
                },
                {
                    id: 4,
                    name: 'Product 4',
                    cover: 'https://i.imgur.com/ijWScLn.jpg'
                },
                {
                    id: 5,
                    name: 'Product 5',
                    cover: 'https://i.imgur.com/gXTbY7M.jpg'
                },
                {
                    id: 6,
                    name: 'Product 6',
                    cover: 'https://i.imgur.com/qqBB3Dz.jpg'
                },
                {
                    id: 7,
                    name: 'Product 7',
                    cover: 'https://i.imgur.com/ijWScLn.jpg'
                }
            ]
        };
    }
    handleClick(id) {
        this.props.history.push(`product/${id}`);
    }
    componentDidMount() {
        this.props.getProducts();
    }
    render() {
        return <div className="store-container">

            <Row gutter={[16, 16]} style={{ height: 500 }} justify="start" align="middle" >
                <Col span={12} >
                    <div className="content-header__description">
                        <div className="content-header__description--cover">
                            <h2>Style us</h2>
                        </div>
                        <button className="content-header__description--checkoutbtn">
                        </button>
                    </div>
                </Col>
                <Col span={12}>
                    <img src="https://i.imgur.com/9qf6WyB.jpg" alt="cover" style={{ objectFit: 'cover', height: 500, width: '100%' }} />
                </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: '15px' }}>
                <Col span={24}>
                    <Row gutter={[16, 16]} justify="start" align="middle" >
                        {
                            this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                                <div className="product-header">
                                    <div className="product-cover">
                                        <img src={product.cover} alt="productImage" />
                                    </div>
                                </div>
                                <h5 className="product-name">{product.name}</h5>
                            </Col>)
                        }
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 16]} justify="start" style={{ marginTop: '20px' }}>
                        {
                            this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                                <div className="product-header">
                                    <div className="product-cover">
                                        <img src={product.cover} alt="productImage" />
                                    </div>
                                </div>
                                <h5 className="product-name">{product.name}</h5>
                            </Col>)
                        }
                    </Row>
                </Col>
                <Col span={24}>
                    <Row gutter={[16, 16]} justify="start" style={{ marginTop: '20px' }}>
                        {
                            this.state.products.map((product, id) => <Col onClick={() => this.handleClick(product.id)} key={id} span={3} className="product">
                                <div className="product-header">
                                    <div className="product-cover">
                                        <img src={product.cover} alt="productImage" />
                                    </div>
                                </div>
                                <h5 className="product-name">{product.name}</h5>
                            </Col>)
                        }
                    </Row>
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