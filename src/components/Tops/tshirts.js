import React from 'react';
import './collection.css';
import { instance } from '../../utils/axios';
import queryString from  'querystring'
import Content from '../Content';
import { Spin } from 'antd';
export default class TShirts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tshirts: [],
            filter: {
                catId: '69bc36f8-ff25-44c9-9f74-e8c9b2cef7e0',
                offSet: 0,
                pageSize: 20
            }
        }
        document.title = 'Áo phông'
    }

    getTshirts() {
        const query = queryString.stringify(this.state.filter);
        instance.get(`GetProductByCategory?${query}`)
        .then(response => {
            if(response.data.success) {
                const { data } = response.data;
                let tshirts = data.map(item => ({...item, images: item.images.split(';').map(value => JSON.parse(value) )}));
                this.setState({ tshirts })
            }
        })
    }

    componentDidMount() {
        this.getTshirts()
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    render() {
        const { tshirts } = this.state;
        return (
            tshirts.length > 0 ?
            <Content items={tshirts} handleClick = {this.handleClick.bind(this)} />:
            <Spin />
        )
    }
}