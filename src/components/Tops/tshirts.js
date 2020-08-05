import React from 'react';
import './collection.css';
import { instance } from '../../utils/axios';
import queryString from  'querystring'
import Content from '../Content';
export default class TShirts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tshirts: [],
            filter: {
                category_id: 4,
                offSet: 0,
                pageSize: 10
            }
        }
    }

    getTshirts() {
        const query = queryString.stringify(this.state.filter);
        instance.get(`GetTShirtPage?${query}`)
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
            <Content items={tshirts} handleClick = {this.handleClick.bind(this)} />
        )
    }
}