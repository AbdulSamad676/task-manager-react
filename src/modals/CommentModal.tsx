import React from 'react';
import { Modal, Button, Input, Form } from 'antd';

// const { TextArea } = Input;

interface CommentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (comment: { content: string }) => void;
  data?: {
    content: string;
  };
}

const CommentModal: React.FC<CommentModalProps> = ({
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
      title='Add Comment'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          form='CommentForm'
          htmlType='submit'
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        id='CommentForm'
        initialValues={data || { content: '' }}
      >
        <Form.Item
          label='Comment Content'
          name='content'
          rules={[{ required: true, message: 'Please enter the Task name' }]}
        >
          <Input type='text' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CommentModal;
