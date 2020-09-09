import React from 'react';
import './collection.css';
import {  Spin } from 'antd';
import Content from '../Content';
import { instance } from '../../utils/axios';
import queryString from 'querystring';

export default class Shirts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            catId: '64340a1c-c4a4-4609-b3e5-2980624f7653',
            products: [],
            offSet: 0,
            pageSize: 20
        }
        document.title = 'Sơ mi'
    }

    getShirts() {
        const { catId, offSet, pageSize } = this.state;
        const query = queryString.stringify({catId, offSet, pageSize});
        instance.get(`GetProductByCategory?${query}`)
        .then(response => {
            if(response.data.success) {
                const { data } = response.data;
                this.setState({ products: data })
            }
        })
    }

    componentDidMount() {
        this.getShirts();
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