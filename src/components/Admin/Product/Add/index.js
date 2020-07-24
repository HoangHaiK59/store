import React from 'react';
import { Form, Button, Input, InputNumber } from 'antd';
import './add.css';

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFinish = values => {
        console.log(values);
    }

    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        return (
            <div className='add-product-container'>
                <div className='form-add-container'>
                    <Form style={{ width: '700px' }} {...layout} name="nest-messages" onFinish={this.onFinish.bind(this)} validateMessages={validateMessages}>
                        <Form.Item
                            name={['user', 'name']}
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'age']}
                            label="Age"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 99,
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name={['user', 'website']} label="Website">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'introduction']} label="Introduction">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default AddProduct;