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
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ name, email, password, role });
    onClose();
  };

  return (
    <Modal
      title='Add User'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout='vertical'>
        <Form.Item label='Name'>
          <Input value={name} onChange={handleNameChange} />
        </Form.Item>
        <Form.Item label='Email'>
          <Input type='email' value={email} onChange={handleEmailChange} />
        </Form.Item>
        <Form.Item label='Password'>
          <Input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item label='Role'>
          <Input type='text' value={role} onChange={handleRoleChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
