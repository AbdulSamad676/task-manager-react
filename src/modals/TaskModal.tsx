import React from 'react';
import { Modal, Button, Input, Form, DatePicker } from 'antd';

const { TextArea } = Input;

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: {
    name: string;
    description: string;
    dueDate: string;
    status: string;
  }) => void;
  data?: {
    name: string;
    description: string;
    dueDate?: string;
    status?: string;
  };
}

const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSubmit,
  data,
}) => {
  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : '',
    };
    console.log('Submitted data', formattedValues);
    onSubmit(formattedValues);
    onClose();
  };

  return (
    <Modal
      title='Add task'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' form='taskForm' htmlType='submit'>
          Submit
        </Button>,
      ]}
    >
      <Form
        layout='vertical'
        onFinish={handleSubmit}
        id='taskForm'
        initialValues={
          data || { name: '', description: '', dueDate: '', status: '' }
        }
      >
        <Form.Item
          label='Task Name'
          name='name'
          rules={[{ required: true, message: 'Please enter the Task name' }]}
        >
          <Input type='text' />
        </Form.Item>
        <Form.Item
          label='Description'
          name='description'
          rules={[
            { required: true, message: 'Please enter the task description' },
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label='Due Date'
          name='dueDate'
          rules={[{ required: true, message: 'Please select the due date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='Status'
          name='status'
          rules={[{ required: true, message: 'Please enter the status' }]}
        >
          <Input type='text' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskModal;
