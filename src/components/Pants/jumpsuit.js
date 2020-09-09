import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col, Spin } from 'antd';
import Content from '../Content';
import { instance } from '../../utils/axios';

export default class JumpSuit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            catId: '7C62B99C-3920-40CA-9E68-2C54F4985C76',
            products: [],
            offSet: 0,
            pageSize: 20
        }
    }


    getJumpSuit() {
        instance.get(`GetProductByCategory?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&catId=${this.state.catId}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                this.setState({ products: data })
            }
        })
        .catch(error => console.log(error))
    }


    componentDidMount() {
        this.getJumpSuit()
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    render() {
        const { products } = this.state;
        return (
            products.length > 0 ?<Content items={products} handleClick={this.handleClick.bind(this)} />:
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
    }
}