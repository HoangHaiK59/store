import React from 'react';
import { Row, Col, Carousel } from 'antd';
import { instance } from '../../utils/axios';

class Marketing extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            products: [],
            offSet: 0,
            pageSize: 20, 
            categoryId: 1,
        }
    }

    getProducts() {
        instance.get(`GetProductByCategory?offSet=${this.state.offSet}&pageSize=${this.state.pageSize}&category_id=${this.state.categoryId}`)
        .then(result => {
            if(result.data.success) {
                const { data } = result.data;
                let products = data.map(item => ({...item, images: item.images.split(';').map(value => JSON.parse(value) )}));
                this.setState({ products })
            }
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getProducts();
    }

    render() {
        return(
            !this.props.isMobile && <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ height: '500px', padding: '0 48px' }} justify="center" align="middle" >
                <Col md={{span: 24}} sm={{span: 16}} xs={{span: 14}}>
                    <Carousel autoplay effect={'fade'} speed={2}>
                        {
                            this.state.products.map((product, id) => <div key={id} style={{ height: 500, width: '100%' }}>
                                <img src={product.image} alt="cover" style={{ objectFit: 'cover', height: 500, width: '100%' }} />
                            </div>)
                        }
                    </Carousel>
                </Col>
                </Row>
        )
    }
}

export default Marketing;