import React, { useState } from 'react';
import { Modal, Button, Form, Select } from 'antd';
import { useStore } from '../stores';

const { Option } = Select;

interface AssignTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: { users: string[] }) => void;
}

const AssignTaskModal: React.FC<AssignTaskModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const { users } = useStore('users'); // Ensure this matches how you access your store

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUsersChange = (selected: string[]) => {
    setSelectedUsers(selected);
  };

  const handleSubmit = () => {
    console.log('assigned user', selectedUsers);
    onSubmit(selectedUsers);
    onClose();
  };

  console.log('Users in Assign Modal', users);

  return (
    <Modal
      title='Assign Task'
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key='cancel' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' form='form' htmlType='submit'>
          Submit
        </Button>,
      ]}
    >
      <Form layout='vertical' id='form' onFinish={handleSubmit}>
        <Form.Item label='Users'>
          <Select
            mode='single'
            value={selectedUsers}
            onChange={handleUsersChange}
            placeholder='Select users'
          >
            {users?.data?.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignTaskModal;
