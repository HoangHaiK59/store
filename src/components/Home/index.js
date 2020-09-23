import React from 'react';
import './home.css';
import { Spin } from 'antd';
import { connect } from 'react-redux';
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
            },
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
        if(!prevProps.isLoad && this.props.isLoad) {
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