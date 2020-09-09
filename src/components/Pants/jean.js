import React from 'react';
import { Spin } from 'antd';
import Content from '../Content';
import  queryString from 'querystring';
import { instance } from '../../utils/axios';

export default class Jean extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catId: '98bdcff4-b0f3-4e30-a97f-93d19e279460',
            products: [],
            offSet: 0,
            pageSize: 20
        }
        document.title = 'Quần jean'
    }
    
    getJeans() {
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

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    componentDidMount() {
        this.getJeans();
    }

    render() {
        const { products } = this.state;
        return (
            products.length > 0 ? <Content items={products} handleClick={this.handleClick.bind(this)} />:
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
    }
}