import React from 'react';
import { Form, Button, Input, InputNumber, Select, Row, Col, message, Upload } from 'antd';
import './add.css';
import TextArea from 'antd/lib/input/TextArea';
import { instance } from '../../../../utils/axios';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Firebase } from '../../../../firebase';
import crypto from 'crypto';

const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


const DynamicFields = ({ layout, formItemLayoutWithOutLabel, colors, categories, catId, handleSetList }) => {
    const [imageUrl, setImageUrl] = React.useState('');
    const [list, setList] = React.useState([]);
    const [listName, setListName] = React.useState([]);
    const generateHashName = () => {
        const buffer = crypto.randomBytes(64);
        const sha = crypto.createHash('sha256');
        sha.update(buffer);
        const ret = sha.digest('base64');
        return ret;
    }
    const normFile = e => {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };
    async function dummyRequest({ file, onSuccess, onError }) {
        const storage = Firebase.storage();
        const metadata = {
            contentType: 'image/jpeg'
        }
        const storageRef = await storage.ref();
        const imageName = generateHashName();
        const category = categories.find(category => category.id === catId);
        if (category === null || category === undefined) {
            message.error('Bạn chưa chọn nhóm!');
            return;
        }
        const imgFile = storageRef.child(`${category.name}/${imageName}.jpg`);
        setListName([...listName, `${category.name}/${imageName}.jpg`])
        try {
            const image = await imgFile.put(file, metadata);
            let urls = [];
            await imgFile.getDownloadURL()
                .then(url => {
                    urls.push(url);
                });
            setList([...list, ...urls])
            handleSetList([...list, ...urls])
            onSuccess(null, image);
        } catch (e) {
            onError(e);
        }
    };
    const removeImage = (index) => {
        const item = listName.find((value, ind) => ind === index);
        const listNameTemp = listName.filter((val, ind) => ind !== index);
        const listTemp = list.filter((val, ind) => ind !== index);
        setList(listTemp);
        setListName(listNameTemp);
        handleSetList(listTemp);
        if (item) {
            const storageRef = Firebase.storage().ref();
            const imgFile = storageRef.child(item);
            imgFile.delete()
                .then()
                .catch(error => console.log(error))
        }
    }
    const handleUpload = event => {
        if (event.file.status === 'done') {
            getBase64(event.file.originFileObj, imageUrl => setImageUrl(imageUrl));
        }
    }
    const beforeUpload = (file) => {
        const isImage = file.type.indexOf('image/') === 0;
        if (!isImage) {
            message.error('Chỉ upload hình ảnh!');
        }

        // You can remove this validation if you want
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Hình ảnh phải nhỏ hơn 10MB!');
        }
        return isImage && isLt10M;
    };
    return (
        <Form.List name="images">
            {
                (fields, { add, remove }) => {
                    return (
                        <div>
                            {
                                fields.map((field, index) => (
                                    <Form.Item {...(index === 0 ? layout : layout)}
                                        label={index === 0 ? '' : ''}
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
                                                    valuePropName="fileList"
                                                    getValueFromEvent={normFile}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Vui lòng upload hình ảnh",
                                                        },
                                                    ]}
                                                >
                                                    <Upload
                                                        beforeUpload={beforeUpload}
                                                        onRemove={() => removeImage(index)}
                                                        name="url"
                                                        onChange={handleUpload}
                                                        customRequest={dummyRequest}
                                                        listType="picture">
                                                        <Button>
                                                            <UploadOutlined /> Click to upload
                                                </Button>
                                                    </Upload>
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
            categories: [],
            catId: '',
            list: [],
            cover: [],
            coverName: []
        };
        this.formRef = React.createRef();
    }

    handleSetList(list) {
        this.setState({ list })
    }

    generateHashName = () => {
        const buffer = crypto.randomBytes(64);
        const sha = crypto.createHash('sha256');
        sha.update(buffer);
        const ret = sha.digest('base64');
        return ret;
    }
    normFile = e => {

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };
    async dummyRequest({ file, onSuccess, onError }) {
        const storage = Firebase.storage();
        const metadata = {
            contentType: 'image/jpeg'
        }
        const storageRef = await storage.ref();
        const imageName = this.generateHashName();
        const category = this.state.categories.find(category => category.id === this.state.catId);
        if (category === null || category === undefined) {
            message.error('Bạn chưa chọn nhóm!');
            return;
        }
        const imgFile = storageRef.child(`${category.name}/${imageName}.jpg`);
        this.setState(state => ({ coverName: [...state.coverName, `${category.name}/${imageName}.jpg`] }))
        try {
            const image = await imgFile.put(file, metadata);
            let urls = [];
            await imgFile.getDownloadURL()
                .then(url => {
                    urls.push(url);
                });
            this.setState(state => ({ cover: [...state.cover, ...urls] }))
            onSuccess(null, image);
        } catch (e) {
            onError(e);
        }
    };
    removeImage = (index) => {
        const item = this.state.coverName.find((value, ind) => ind === index);
        if (item) {
            const storageRef = Firebase.storage().ref();
            const imgFile = storageRef.child(item);
            imgFile.delete()
                .then()
                .catch(error => console.log(error))
        }
        this.setState({cover: [], coverName: []})
    }
    handleUpload = event => {
        if (event.file.status === 'done') {
            getBase64(event.file.originFileObj);
        }
    }
    beforeUpload = (file) => {
        const isImage = file.type.indexOf('image/') === 0;
        if (!isImage) {
            message.error('Chỉ upload hình ảnh!');
        }

        // You can remove this validation if you want
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error('Hình ảnh phải nhỏ hơn 10MB!');
        }
        return isImage && isLt10M;
    };

    onFinish = values => {
        const { product, images } = values;
        let imagesTmp;
        imagesTmp = images.map((obj, id) => ({ ...obj, url: this.state.list[id] }))
        let productAdd;
        if (this.props.product) {
            productAdd = { ...product, id: this.props.product.id };
        } else {
            productAdd = { ...product, image: this.state.cover[0], id: 0 };
        }
        const data = { images: imagesTmp, product: productAdd };
        console.log(data);
        instance.post(`AddProduct`, data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}`
            }
        })
            .then(result => {
                if (result.data.success) {
                    message.success(result.data.message);
                    this.props.back();
                }
            })
            .catch(error => {
                message.error('Thất bại')
            })
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
        if (this.props.product) {
            const { product } = this.props;
            const item = { ...product, size: product.size.split(','), images: product.images.split(';').map((value, id) => JSON.parse(value)) }
            this.formRef.current.setFieldsValue({
                product: {
                    name: item.name,
                    catId: item.catId,
                    price: item.price,
                    discount: item.discount,
                    description: item.description,
                    size: item.size,
                    image: item.image,
                    status: item.status
                },
                images: item.images
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
    }

    handleSelectCategory(e) {
        this.setState({ catId: e });
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
            required: "'${name}' is required!",
            types: {
                email: "'${name}' is not validate email!",
                number: "'${name}' is not a validate number!",
            },
            number: {
                range: "'${name}' must be between ${min} and ${max}",
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
                    <Form
                        ref={this.formRef}
                        style={{ width: '900px' }}
                        {...layout}
                        name="nest-messages"
                        onFinish={this.onFinish.bind(this)}
                        validateMessages={validateMessages}>
                        <Form.Item
                            name={['product', 'name']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder='Tên sản phẩm' />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'catId']}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                placeholder="Chọn loại"
                                style={{ width: '100%' }}
                                onChange={this.handleSelectCategory.bind(this)}
                            >
                                {
                                    this.state.categories.map((category, id) => <Option key={id} value={category.id}>{category.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['product', 'price']}
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 2000000,
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber placeholder='Giá sản phẩm' />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'discount']}
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                    required: true
                                },
                            ]}
                        >
                            <InputNumber
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                placeholder="Chiết khấu"
                            />
                        </Form.Item>
                        <Form.Item
                            name={['product', 'description']}
                            rules={[
                                {
                                    required: true
                                }
                            ]}
                        >
                            <TextArea placeholder='Mô tả sản phẩm' />
                        </Form.Item>
                        <Form.Item name={['product', 'size']} rules={[{
                            required: true
                        }]}>
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Vui lòng chọn kích thước"
                                style={{ width: '100%' }}>
                                {
                                    this.state.sizes.map((value, id) => <Option key={id} value={value.size}>{value.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item 
                        name={['product', 'image']} 
                        rules={[{
                            required: true
                        }]}
                        valuePropName="fileList"
                        getValueFromEvent={this.normFile.bind(this)}
                        >
                            <Upload
                                beforeUpload={this.beforeUpload.bind(this)}
                                onRemove={() => this.removeImage(0)}
                                name="url"
                                onChange={this.handleUpload.bind(this)}
                                customRequest={this.dummyRequest.bind(this)}
                                listType="picture">
                                {
                                    this.state.cover.length < 1 && <Button>
                                    <UploadOutlined /> Click to upload
                                    </Button>
                                }
                            </Upload>
                        </Form.Item>
                        <Form.Item name={['product', 'status']} rules={[{
                            required: true
                        }]}>
                            <Select
                                allowClear
                                placeholder="Trạng thái"
                                style={{ width: '100%' }}>
                                <Option value={false}>Hết hàng</Option>
                                <Option value={true}>Còn hàng</Option>
                            </Select>
                        </Form.Item>
                        <DynamicFields
                            colors={this.state.colors}
                            categories={this.state.categories}
                            catId={this.state.catId}
                            handleSetList={this.handleSetList.bind(this)}
                            layout={layout}
                            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel} />
                        <Row gutter={[8, 8]} justify="center">
                            <Col span={3}>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="ghost" onClick={this.props.back}>
                                        Quay lại
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </div>
            </div>
        )
    }
}

export default AddProduct;