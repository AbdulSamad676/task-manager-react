import React from 'react';
import { Modal, Button, Input, Form } from 'antd';

const { TextArea } = Input;

interface AddProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (project: { name: string; description: string }) => void;
  data?: { name: string; description: string };
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  visible,
  onClose,
  onSubmit,
  data,
}) => {
  const handleSubmit = (values: any) => {
    console.log('Submitted data', values);
    onSubmit(values);
    onClose();
  };

  return (
    <Modal
      title='Add Project'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          form='projectForm'
          htmlType='submit'
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        id='projectForm'
        initialValues={data || { name: '', description: '' }}
      >
        <Form.Item
          label='Project Name'
          name='name'
          rules={[{ required: true, message: 'Please enter the project name' }]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[
            { required: true, message: 'Please enter the project description' },
          ]}
        >
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProjectModal;
