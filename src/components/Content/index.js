import React from 'react';
import { Row, Col} from 'antd';
import { NAV_BAR_HEIGHT } from '../../helper/calc';

const Content = ({items, handleClick}) => {
    return (
        <div className='collection-container' style={{ marginTop: NAV_BAR_HEIGHT }}>
        <Row gutter={[16, 16]} justify="start" style={{ width: '100%' }}>
            <Col span={24}></Col>
            <Col span={24}>
                <div className='items-container'>
                    <Row gutter={[16, 16]} justify="start" style={{ width: '100%' }}>
                        {
                            items.map((item, id) => <Col onClick={() => handleClick(item.id)} key={id} span={4} className="product">
                                <div className="product-header">
                                    <div className="product-cover">
                                        <img width="1242" height="1554" src={item.image} alt="productImage" style={{ objectFit: 'cover' }}/>
                                    </div>
                                </div>
                                <h5 className="product-name">{item.name}</h5>
                            </Col>)
                        }
                    </Row>
                </div>
            </Col>
        </Row>
    </div>
    )
}

export default Content;