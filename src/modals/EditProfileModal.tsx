// import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useStore } from '../stores';
import { useNavigate } from 'react-router-dom';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  profile: { name?: string; email?: string; password?: string };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  profile,
}) => {
  const { updateProfile } = useStore('profile');
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const handleFormSubmit = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const payload = {
        name: values.username,
        email: values.email,
        password: values.password,
      };

      await updateProfile(payload); // Wait for the updateProfile call to complete
      alert('Profile updated');
      onClose(); // Close the modal only after the profile is updated
      window.location.reload();
    } catch (err) {
      console.log('Error updating profile:', err);
    }
  };

  return (
    <Modal
      title='Edit Profile'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='back' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        initialValues={{
          username: profile.name,
          email: profile.email,
          password: profile.password,
        }}
      >
        <Form.Item
          name='username'
          label='Username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true, message: 'Please input your role!' }]}
        >
          <Input type='password' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
