import React from 'react';
import { Row, Col } from 'antd';
import { Subscribe } from './Subscribe';
const Contact = (props) => {
    return (
        <Col span={24} style={{ padding: '8px' }}>
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}    >
                <Col span={12} style={{ backgroundColor: 'rgba(250, 246, 246, 0.055)' }}>contact us</Col>
                <Col span={12} style={{ height: '500px', padding: 0 }}>
                    <img src={props.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}    >
                <Col span={8} ></Col>
                <Col span={8} style={{ background: 'transparent' }}>
                    <Subscribe />
                </Col>
                <Col span={8} ></Col>
            </Row>
        </Col>
    )
};

export default Contact;