import React from 'react';
import { NAV_BAR_HEIGHT } from '../../helper/calc';
import { Row, Col } from 'antd';
import { instance } from '../../utils/axios';

export default class Dress extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dresses: []
        }
    }

    handleClick(id) {
        this.props.history.push(`/product/${id}`);
    }

    getDressPage() {
        const offSet = 0;
        instance.get(`GetDressPage?offSet=${offSet}&category_id=${0}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                let dresses = data.map(item => ({...item, image_url: item.image_url.split(';').map(value => JSON.parse(value) )}));
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
        console.log(dresses)
        return (
            <div className='collection-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
                <Row gutter={[16, 16]} justify="start" style={{ width: '100%' }}>
                    <Col span={24}></Col>
                    <Col span={24}>
                        <div className='items-container'>
                            <Row gutter={[16, 16]} justify="start" style={{ width: '100%' }}>
                                {
                                    dresses.map((dress, id) => <Col onClick={() => this.handleClick(dress.id)} key={id} span={4} className="product">
                                        <div className="product-header">
                                            <div className="product-cover">
                                                <img src={dress.image_url[0].url} alt="productImage" style={{ objectFit: 'cover' }}/>
                                            </div>
                                        </div>
                                        <h5 className="product-name">{dress.name}</h5>
                                    </Col>)
                                }
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}