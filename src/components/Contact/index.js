import React from 'react';
import { Row, Col } from 'antd';
import { Subscribe } from './Subscribe';
import { InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
const Contact = (props) => {

    const onFinish = values => {
        fetch('https://localhost:5001/api/v1/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.status === 200 && res.json().then(data => {
            console.log('subscribe success')
        }))
    }

    const onFinishFailed = errorInfo => {
        console.log(errorInfo);
    }

    return (
        <Col span={24} style={{ padding: '8px'}}>
            <Row gutter={[16, 16]} style={{ marginTop: '20px', backgroundColor: '#000' }}    >
                <Col span={12} style={{ backgroundColor: 'rgba(250, 246, 246, 0.055)', color: '#fff' }}>
                    <Col span={24}>contact us</Col>
                    <Col span={24}>store</Col>
                    <Col span={24}>address</Col>
                    <Col span={24}>phone</Col>
                    <Col span={24}><FacebookOutlined title='Facebook' style={{ backgroundColor: '#2943c4', fontSize: '18px' }}/></Col>
                    <Col span={24}><InstagramOutlined title='Instagram'  style={{ backgroundColor: '#4f29c2', fontSize: '18px'  }}/></Col>
                </Col>
                <Col span={12} style={{ height: '500px', padding: 0 }}>
                    <img src={props.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}    >
                <Col span={8} ></Col>
                <Col span={8} style={{ background: 'transparent' }}>
                    <Subscribe onFinish={onFinish} onFinishFailed={onFinishFailed}/>
                </Col>
                <Col span={8} ></Col>
            </Row>
        </Col>
    )
};

export default Contact;