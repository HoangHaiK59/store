import React from 'react';
import './login.css';
import { Form, Input, Button, message } from 'antd';
import { instance } from '../../utils/axios';
import { Constants } from '../../store/constants';
import { connect } from 'react-redux';

const Register = (props) => {
    const [ password, setPassword ] = React.useState('')
    const [ approve, setApprove ] = React.useState(false)
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 22 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 20 },
    };

    const onFinish = values => {
        if(approve) {
            instance.post('Register', values)
            .then(response => {
                if(response.data.success) {
                    instance.post('authorize', values)
                    .then(result => {
                        if(result.data.success) {
                            localStorage.setItem('token', JSON.stringify(result.data.token));
                            instance.get(`user?userId=${result.data.userId}`, {
                                headers: {
                                    'Authorization': `Bearer ${result.data.token.access_token}`,
                                    'Content-Type': 'application/json;charset=utf-8'
                                }
                            })
                            .then(res => {
                                if(res.data.success) {
                                    const { data } = res.data
                                    props.setAuth(data , true);
                                    message.success(response.data.message)
                                    form.resetFields()
                                    props.history.push('/home');
                                }
                            })
                            .catch(error => console.log(error))
                        } else {
                            props.setAuth(null, false); 
                        }
                    }).catch(error => {
                        props.setAuth(null, false);
                    })
                } else {
                    message.error(response.data.error)
                }
            })
        } else {
            message.error('Mật khẩu không đúng xin kiểm tra lại')
        }
    }

    const onFinishFailed = errorInfo => {
        console.log(errorInfo)
    }

    const comparePassword = (e) => {
        if(e.target.value !== password) {
            setApprove(false)
        } else {
            setApprove(true)
        }
    }

    const changePassword = e => {
        setPassword(e.target.value)
    }
    return (
        <div className='login-container'>
        <img style={{position: 'absolute', width: '100%'}}  src={`${require('../../assets/cover.jpg')}`} alt="cover" />
            <div className='box-login' style={{ position: 'absolute' }}>
                <h5>Đăng ký</h5>
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish.bind(this)}
                    onFinishFailed={onFinishFailed.bind(this)}
                    style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                    <Form.Item name="firstname" rules={[{ required: true, message: 'Vui lòng nhập họ !' }]}>
                        <Input placeholder="Họ" />
                    </Form.Item>
                    <Form.Item name="lastname" rules={[{ required: true, message: 'Vui lòng nhập tên !' }]}>
                        <Input placeholder="Tên" />
                    </Form.Item>
                    <Form.Item  name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ !' }]}>
                        <Input placeholder="Địa chỉ" />
                    </Form.Item>
                    <Form.Item  name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item  name="email" rules={[{ required: true, message: 'Vui lòng nhập email !' }]}>
                        <Input placeholder="Địa chỉ thư điện tử" type='email'/>
                    </Form.Item>
                    <Form.Item  name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}>
                        <Input type={'password'} placeholder="Mật khẩu" onChange={changePassword} />
                    </Form.Item>
                    <Form.Item  name="confirm" rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu !' }]}>
                        <Input type={'password'} placeholder="Xác nhận mật khẩu" onChange={comparePassword}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Đăng ký</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAuth: (user , isAuth) => dispatch({ type: Constants.AUTH, user , isAuth })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);