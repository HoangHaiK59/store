import React from 'react';
import { Row, Col, message } from 'antd';
import { Subscribe } from './Subscribe';
import { InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
import { instance } from '../../utils/axios';
import useDimensions from '../../utils/dimensions';
const Contact = (props) => {
    const { width, height } = useDimensions();
    const onFinish = values => {
        instance.post('subscribe', values, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => {
                if (response.data.success) {
                    message.success('Subscribe thành công')
                }
            })
            .catch(error => message.error(error))
    }

    const onFinishFailed = errorInfo => {
        console.log(errorInfo);
    }

    return (
<<<<<<< HEAD
        !props.isMobile ?
        <Col md={24} xs={24} style={{overflow: 'hidden'}}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '20px', backgroundColor: '#000' }}    >
                <Col xs={12} style={{ backgroundColor: 'rgba(250, 246, 246, 0.055)', color: '#fff' }}>
                    <Col span={24}>contact us</Col>
                    <Col span={24}>store</Col>
                    <Col span={24}>address</Col>
                    <Col span={24}>phone</Col>
                    <Col span={24}><FacebookOutlined title='Facebook' style={{ backgroundColor: '#2943c4', fontSize: '18px' }} /></Col>
                    <Col span={24}><InstagramOutlined title='Instagram' style={{ backgroundColor: '#4f29c2', fontSize: '18px' }} /></Col>
                </Col>
                <Col span={12} style={{ height: '500px' }}>
                    <img src={props.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '20px' }}    >
                <Col span={8} ></Col>
                <Col span={8} style={{ background: 'transparent' }}>
                    <Subscribe onFinish={onFinish} onFinishFailed={onFinishFailed} />
                </Col>
                <Col span={8} ></Col>
            </Row>
        </Col> :
        <Col md={24} xs={24} style={{overflow: 'hidden'}}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '20px', backgroundColor: '#000' }}    >
                <Col xs={{ span: 12 }} style={{ backgroundColor: 'rgba(250, 246, 246, 0.055)', color: '#fff' }}>
                    <Col span={24}>contact us</Col>
                    <Col span={24}>store</Col>
                    <Col span={24}>address</Col>
                    <Col span={24}>phone</Col>
                    <Col span={24}><FacebookOutlined title='Facebook' style={{ backgroundColor: '#2943c4', fontSize: '18px' }} /></Col>
                    <Col span={24}><InstagramOutlined title='Instagram' style={{ backgroundColor: '#4f29c2', fontSize: '18px' }} /></Col>
                </Col>
                <Col span={12} style={{ height: '500px' }}>
                    <img src={props.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Col>
            </Row>


            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: '20px' }}    >
                <Col span={8} ></Col>
                <Col span={8} style={{ background: 'transparent' }}>
                    <Subscribe onFinish={onFinish} onFinishFailed={onFinishFailed} />
                </Col>
                <Col span={8} ></Col>
            </Row>
        </Col>
    )
};

export default Contact;