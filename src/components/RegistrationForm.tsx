import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const RegistrationForm: React.FC = () => {
  const onFinish = (values: any) => {
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
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Radio.Group>
          <Radio value='admin' className='text-white'>
            Admin
          </Radio>
          <Radio value='user' className='text-white'>
            User
          </Radio>
        </Radio.Group>
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
