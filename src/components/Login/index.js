import React from 'react';
import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Constants } from '../../store/constants';
import { connect } from 'react-redux';
import { instance } from '../../utils/axios';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.form = React.createRef();
    }


    onFinish = values => {
        console.log('Success:', values);
        instance.post('authorize', JSON.stringify(values))
            .then(result => {
                if (result.data.success) {
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    instance.get(`user?userId=${result.data.userId}`, {
                        headers: {
                            'Authorization': `Bearer ${result.data.token.access_token}`,
                            'Content-Type': 'application/json;charset=utf-8'
                        }
                    })
                        .then(response => {
                            if (response.data.success) {
                                const { data } = response.data
                                this.props.setAuth(data, true);
                                this.form.current.resetFields();
                                this.props.history.push('/home');
                            }
                        })
                        .catch(error => console.log(error))
                } else {
                    this.props.setAuth(null, false);
                }
            }).catch(error => {
                this.props.setAuth(null, false);
            })
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const layout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 22 },
        };
        const tailLayout = {
            wrapperCol: { span: 22 },
        };
        return (
            <div className='login-container'>
                <img style={{position: 'absolute', width: '100%'}}  src={`${require('../../assets/cover.jpg')}`} alt="cover" />
                <div className='box-login' style={{position: 'absolute'}}>
                    <h5>Đăng nhập</h5>
                    <Form
                        ref={this.form}
                        {...layout}
                        name="basic"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish.bind(this)}
                        onFinishFailed={this.onFinishFailed.bind(this)}
                        style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}
                    >
                        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email !' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}>
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type={'password'} placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <Link className="login-form-forgot" to="/forgot">
                                Quên mật khẩu
                            </Link>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button style={{ width: '100%' }} type="primary" htmlType="submit">Đăng nhập</Button>
                            Or <Link to="/register">đăng ký!</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setAuth: (user, isAuth) => dispatch({ type: Constants.AUTH, user, isAuth })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);