import React from 'react';
import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Constants } from '../../store/constants';
import { connect } from 'react-redux';
import { instance } from '../../utils/axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    onFinish = values => {
        console.log('Success:', values);
        instance.post('authorize', JSON.stringify(values))
        .then(result => {
            if(result.data.success) {
                localStorage.setItem('token', JSON.stringify(result.data.token));
                instance.get(`user?userId=${result.data.userId}`, {
                    headers: {
                        'Authorization': `Bearer ${result.data.token.access_token}`,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                .then(response => {
                    if(response.data.success) {
                        const { data } = response.data
                        this.props.setAuth(data , true);
                        this.props.history.push('/store');
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
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            <div className='login-container'>
                <div className='box-login'>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish.bind(this)}
                        onFinishFailed={this.onFinishFailed.bind(this)}
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email !' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu !' }]}>
                            <Input type={'password'} placeholder="Mật khẩu" />
                        </Form.Item>
                        <Link to="/register">Tạo tài khoản</Link>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Đăng nhập</Button>
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
        setAuth: (user , isAuth) => dispatch({ type: Constants.AUTH, user , isAuth })
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);