import React from 'react';
import { Form, Button, Input, InputNumber, Select } from 'antd';
import './add.css';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select

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
                            name={['product', 'name']}
                            label="Tên hàng"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'category']}
                            label="Loại"
                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'price']}
                            label="Giá"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 2000000
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'discount']}
                            label="Sale"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 100
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'description']}
                            label="Mô tả"
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item name={['product', 'size']} label="Kích thước">
                            <Select defaultValue="M" style={{ width: 120 }}>
                                <Option value="S">S</Option>
                                <Option value="M">M</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name={['product', 'introduction']} label="Introduction">
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