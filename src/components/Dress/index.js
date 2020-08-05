import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col, Spin } from 'antd';
import { instance } from '../../utils/axios';
import Content from '../Content';

export default class Dress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dresses: [],
            offSet: 0,
            pageSize: 20
        }
        document.title = 'Váy liền'
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    getDressPage() {
        instance.get(`GetDressPage?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&category_id=${1}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                let dresses = data.map(item => ({...item, images: item.images.split(';').map(value => JSON.parse(value) )}));
                //console.log(data, dresses)
                this.setState({ dresses })
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
            <Spin />
        )
    }
}