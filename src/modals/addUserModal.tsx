import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';

interface AddUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => void;
  data?: { name: string; email: string; password: string; role: string };
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
  onSubmit,
  data,
}) => {
  console.log('selectted user', data);
  const handleSubmit = (values: any) => {
    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    });
    onClose();
  };

  return (
    <Modal
      title='User'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' form='form' type='primary' htmlType='submit'>
          Submit
        </Button>,
      ]}
    >
      <Form
        layout='vertical'
        id='form'
        onFinish={handleSubmit}
        initialValues={data || { name: '', email: '', password: '', role: '' }}
      >
        <Form.Item label='Name' name='name'>
          <Input value={data?.name} />
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <Input type='email' value={data?.email} />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input type='password' value={data?.password} />
        </Form.Item>
        <Form.Item label='Role' name='role'>
          <Input type='text' value={data?.role} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
