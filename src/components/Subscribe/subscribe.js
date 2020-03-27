import React from 'react';
import { Form, Input, Button } from 'antd';

export const Subscribe = (props) => (
    <div>
        <h5 style={{color: '#636566', textAlign: 'center'}}>Subscribe Form</h5>
        <Form
            onFinish={props.onFinish}
            onFinishFailed={props.onFinishFailed}>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type="email" placeholder="Email Address" style={{ backgroundColor: 'transparent' }} />
            </Form.Item>
            <Form.Item>
                <Button style={{ width: '100%', color: '#636566', backgroundColor: '#fff' }} htmlType="submit">
                    Submit
            </Button>
            </Form.Item>
        </Form>
    </div>
)