import React from 'react';
import { Spin } from 'antd';
import Content from '../Content';
import { instance } from '../../utils/axios';

export default class Winter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categoryId: 10,
            offSet:0,
            pageSize: 20
        }
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        }); 
    }

    getProducts() {
        instance.get(`GetProductByCategory?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&category_id=${this.state.categoryId}`)
            .then(result => {
                if (result.data.success) {
                    const { data } = result.data;
                    let products = data.map(item => ({ ...item, images: item.images.split(';').map(value => JSON.parse(value)) }));
                    //console.log(data, dresses)
                    this.setState({ products })
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
            <Spin />
        )
}
}
