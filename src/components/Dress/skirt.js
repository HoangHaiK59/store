import React from 'react';
import { Spin } from 'antd';
import Content from '../Content';
import { instance } from '../../utils/axios';

export default class Winter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            catId: '0ecdf117-1df9-4413-ac13-b7fe724e47b3',
            offSet:0,
            pageSize: 20
        }
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
        document.title = 'Chân váy'
    }

    getProducts() {
        instance.get(`GetProductByCategory?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&catId=${this.state.catId}`)
            .then(result => {
                if (result.data.success) {
                    const { data } = result.data;
                    this.setState({ products: data })
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getProducts();
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    render() {
        const { products } = this.state;
        return (
            products.length > 0 ? <Content items={products} handleClick={this.handleClick.bind(this)}/>: 
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
}
}
