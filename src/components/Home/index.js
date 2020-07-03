import React from 'react';
import './home.css';
import { Row, Col } from 'antd';
import { Footer } from '../Footer';
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
                    name: 'Product 1',
                    cover: 'https://i.imgur.com/GXy9UIG.jpg'
                },
                {
                    name: 'Product 2',
                    cover: 'https://i.imgur.com/Wj6dytl.jpg'
                },
                {
                    name: 'Product 3',
                    cover: 'https://i.imgur.com/9qf6WyB.jpg'
                },
                {
                    name: 'Product 4',
                    cover: 'https://i.imgur.com/ijWScLn.jpg'
                },
                {
                    name: 'Product 5',
                    cover: 'https://i.imgur.com/gXTbY7M.jpg'
                },
                {
                    name: 'Product 6',
                    cover: 'https://i.imgur.com/qqBB3Dz.jpg'
                },
                {
                    name: 'Product 7',
                    cover: 'https://i.imgur.com/ijWScLn.jpg'
                }
            ]
        };
    }
    componentDidMount() {
        this.props.getProducts();
    }
    render() {
        return <div className="store-container">
            <div className="content-header">
                <div className="content-header__description">
                    <div className="content-header__description--cover">
                        <h2>Style us</h2>
                    </div>
                    <button className="content-header__description--checkoutbtn">
                    </button>
                </div>
                <div className="content-header__cover-image">
                    <img src="https://i.imgur.com/9qf6WyB.jpg" alt="cover" />
                </div>
            </div>
            <div className="content">
                <Row gutter={[16, 16]} justify="start" align="middle" >
                    {
                        this.state.products.map((product, id) => <Col key={id} span={3} className="product">
                                <div className="product-header">
                                    <div className="product-cover">
                                        <img src={product.cover} alt="productImage" />
                                    </div>
                                </div>
                                <h5 className="product-name">{product.name}</h5>
                            </Col>)
                    }
                </Row>
                <Row gutter={[16, 16]} justify="start" style={{ marginTop: '20px' }}>
                    {
                        this.state.products.map((product, id) => <Col key={id} span={3} className="product">
                            <div className="product-header">
                                <div className="product-cover">
                                    <img src={product.cover} alt="productImage" />
                                </div>
                            </div>
                            <h5 className="product-name">{product.name}</h5>
                        </Col>)
                    }
                </Row>
                <Row gutter={[16, 16]} justify="start" style={{ marginTop: '20px' }}>
                    {
                        this.state.products.map((product, id) => <Col key={id} span={3} className="product">
                            <div className="product-header">
                                <div className="product-cover">
                                    <img src={product.cover} alt="productImage" />
                                </div>
                            </div>
                            <h5 className="product-name">{product.name}</h5>
                        </Col>)
                    }
                </Row>
                <Contact cover="https://i.imgur.com/Wj6dytl.jpg"/>
            </div>
            <Footer />
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