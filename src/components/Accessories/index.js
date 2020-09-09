import React from 'react';
import './accessories.css'
import { instance } from '../../utils/axios';
import Content from '../Content';
import { Spin } from 'antd';

export default class Accessories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            offset: 0,
            pageSize: 20,
            catId: '1f3604a5-5a11-4006-81d8-59fd2f10173d'
        }
        document.title = 'Phụ kiện'
    }
    
    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    getAccessories() {
        const { offset, pageSize, catId } = this.state;
        instance.get(`GetProductByCategory?offSet=${offset}&pageSize=${pageSize}&catId=${catId}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                this.setState({ products: data })
            }
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getAccessories();
    }
    render() {
        return (
            this.state.products.length > 0 ? <Content items={this.state.products} handleClick={this.handleClick.bind(this)}/>: 
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
    }
}