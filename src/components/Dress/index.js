import React from 'react';
import { Spin } from 'antd';
import { instance } from '../../utils/axios';
import Content from '../Content';

export default class Dress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dresses: [],
            offSet: 0,
            pageSize: 20, 
            catId: '2d21b432-dcc5-4a3b-8021-326c81f4c89a'
        }
        document.title = 'Váy liền'
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    getDressPage() {
        instance.get(`GetProductByCategory?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&catId=${this.state.catId}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                this.setState({ dresses: data })
            }
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getDressPage();
    }

    render() {
        const { dresses } = this.state;
        return (
            dresses.length > 0 ? <Content items={dresses} handleClick={this.handleClick.bind(this)}/>: 
            <div className="d-flex justify-content-center">
                <Spin />
            </div>
        )
    }
}