import React from 'react';
// import axios from '../services/axios';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { useStore } from '../stores';
// import { useNavigate } from 'react-router-dom';
// import Password from 'antd/es/input/Password';

const RegistrationForm: React.FC = (props: any) => {
  const { changeStatus } = props;
  const { registerUser } = useStore('auth');
  // const navigate = useNavigate();
  const onFinish = (values: any) => {
    const payload = {
      name: values.username,
      email: values.email,
      password: values.password,
    };
    registerUser(payload).then(() => {
      changeStatus();
    });
    // navigate('/');

    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name='registration'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: '300px', margin: 'auto' }}
    >
      <Form.Item
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder='Username' />
      </Form.Item>

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

      <Form.Item
        name='role'
        rules={[{ required: true, message: 'Please input your role!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder='role' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
