import React from 'react';
import './login.css';
import { Form, Input, Button } from 'antd';




class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: 'horizontal'
        }
    }


    onFormLayoutChange = ({ layout }) => {
        this.setState({ layout });
    };

    render() {
        const formItemLayout =
            this.state.layout === 'horizontal'
                ? {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                }
                : null;

        const buttonItemLayout =
            this.state.layout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 4 },
                }
                : null;
        return (
            <div className='login-container'>
                <div className='box-login'>
                    <Form 
                        {...formItemLayout}
                        layout={this.state.layout}
                        initialValues={{ layout: this.state.layout }}
                        onValuesChange={this.onFormLayoutChange.bind(this)}
                        >
                        <Form.Item label="Username">
                            <Input placeholder="Username" />
                        </Form.Item>
                        <Form.Item label="Password">
                            <Input type={'password'} placeholder="Password" />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary">Submit</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login;