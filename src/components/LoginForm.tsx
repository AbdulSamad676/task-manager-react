import React from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
// import axios from '../services/axios';
// import { useNavigate } from 'react-router-dom';
import { useStore } from '../stores';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { loginUser } = useStore('auth');
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    loginUser(payload).then((res: any) => {
      if (res.status == 200) {
        navigate('/profile');
        return;
      }

      console.log('ERR', res);
    });
    // axios.post('/v1/register', payload);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='login'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: '300px', margin: 'auto' }}
    >
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'The input is not valid E-mail!' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder='Email' />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder='Password' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
