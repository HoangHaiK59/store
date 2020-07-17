import React from 'react';
import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Constants } from '../../store/constants';
import { connect } from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    onFinish = values => {
        console.log('Success:', values);
        fetch('https://localhost:5001/api/v1/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values),
        }).then(res => res.json().then(result => {
            if(result.status) {
                this.props.setAuth(true);
                this.props.history.push('/store');
            } else {
                this.props.setAuth(false); 
            }
        })).catch(error => {
            this.props.setAuth(false);
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
                    >
                        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input type={'password'} placeholder="Password" />
                        </Form.Item>
                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">Submit</Button>
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
        setAuth: (isAuth) => dispatch({ type: Constants.AUTH, isAuth })
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);