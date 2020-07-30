import React from 'react';
import { Form, Button, Input, InputNumber, Select, Row, Col, } from 'antd';
import './add.css';
import TextArea from 'antd/lib/input/TextArea';
import { instance } from '../../../../utils/axios';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const DynamicFields = ({ layout, formItemLayoutWithOutLabel, colors }) => {
    return (
        <Form.List name="image_url">
            {
                (fields, { add, remove }) => {
                    return (
                        <div>
                            {
                                fields.map((field, index) => (
                                    <Form.Item {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'Màu sắc' : ''}
                                        required={true}
                                        key={field.key}
                                    >
                                        <Row gutter={8}>
                                            <Col span={8}>
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    name={[index, "color"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Vui lòng chọn màu sắc",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Select
                                                        style={{ width: '80%' }}
                                                        placeholder="Vui lòng chọn màu"
                                                        allowClear
                                                    >
                                                        {
                                                            colors.map((value, id) => <Option key={id} value={value.color} title={value.color_name}>
                                                                <Row gutter={[5, 5]}>
                                                                    <Col span={12} style={{ backgroundColor: value.color, borderRadius: '200px' }}>

                                                                    </Col>
                                                                    <Col span={12}>{value.color_name}</Col>
                                                                </Row>
                                                            </Option>)
                                                        }
                                                    </Select>

                                                </Form.Item>
                                            </Col>
                                            <Col span={16}>
                                                <Form.Item
                                                    name={[index, "url"]}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Vui lòng upload hình ảnh",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Upload link" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                style={{ margin: '0 8px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))
                            }
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '60%' }}
                                >
                                    <PlusOutlined /> Thêm màu
                                </Button>
                            </Form.Item>
                        </div>
                    )
                }
            }
        </Form.List>
    )
}

class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            value: undefined,
            sizes: [],
            categories: []
        };
    }

    onFinish = values => {
        console.log(values);
        const { product } = values;
        let productAdd = {...product, id: 0};
        const data = {...values, product: productAdd}
        instance.post(`AddProduct`, data , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(result => {
            if(result.data.success) {
                console.log('ok')
            }
        })
        .catch(error => console.log(error))
    }

    onChange = value => {
        this.setState({ value })
    }

    getSizeList() {
        instance.get('GetSizeList')
            .then(response => {
                if (response.data.success) {
                    const { data } = response.data;
                    this.setState({ sizes: data })
                }
            })
            .catch(err => console.log(err))
    }

    getColorList() {
        instance.get('GetColorList').then(result => {
            if (result.data.success) {
                const { data } = result.data;
                this.setState({ colors: data })
            }
        })
            .catch(err => console.log(err))
    }

    getCategoryList() {
        instance.get('GetCategoryList')
            .then(result => {
                if (result.data.success) {
                    const { data } = result.data;
                    this.setState({ categories: data })
                }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getCategoryList();
        this.getColorList();
        this.getSizeList();
    }

    render() {
        const layout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
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
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        return (
            <div className='add-product-container'>
                <div className='form-add-container'>
                    <Form style={{ width: '900px' }} {...layout} name="nest-messages" onFinish={this.onFinish.bind(this)} validateMessages={validateMessages}>
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
                            name={['product', 'category_id']}
                            label="Loại"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="Chọn loại"
                                defaultValue={1} style={{ width: '100%' }}>
                                {
                                    this.state.categories.map((category, id) => <Option key={id} value={category.id}>{category.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['product', 'price']}
                            label="Giá"
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 2000000,
                                    required: true
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
                                    max: 100,
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'description']}
                            label="Mô tả"
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <TextArea />
                        </Form.Item>
                        <Form.Item name={['product', 'size']} label="Kích thước" rules={[{
                            required: true
                        }]}>
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Vui lòng chọn kích thước"
                                defaultValue="S" style={{ width: '100%' }}>
                                {
                                    this.state.sizes.map((value, id) => <Option key={id} value={value.size}>{value.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <DynamicFields
                            colors={this.state.colors}
                            layout={layout}
                            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel} />
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