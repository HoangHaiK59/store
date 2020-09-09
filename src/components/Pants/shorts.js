import React from 'react';
import { Spin } from 'antd';
import Content from '../Content';
import { instance } from '../../utils/axios';
import queryString from 'querystring';

export default class Short extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catId: '3a0b465f-c8d8-4e39-9c56-1515c782afbb',
            products: [],
            offSet: 0,
            pageSize: 20
        }
        document.title = 'Quần short'
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    getShorts() {
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
        this.getShorts();
    }

    render() {
        const { products } = this.state;
        return (
            products.length > 0 ? <Content items={products} handleClick={this.handleClick.bind(this)} /> :
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
    }
}