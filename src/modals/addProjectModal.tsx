import React, { useState } from 'react';
import { Modal, Button, Input, Form, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

interface AddProjectModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (project: {
    name: string;
    description: string;
    users: string[];
  }) => void;
  availableUsers: string[];
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  visible,
  onClose,
  onSubmit,
  availableUsers,
}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handleUsersChange = (selectedUsers: string[]) => {
    setUsers(selectedUsers);
  };

  const handleSubmit = () => {
    onSubmit({ name, description, users });
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
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form layout='vertical'>
        <Form.Item label='Project Name'>
          <Input value={name} onChange={handleNameChange} />
        </Form.Item>
        <Form.Item label='Description'>
          <TextArea value={description} onChange={handleDescriptionChange} />
        </Form.Item>
        <Form.Item label='Users'>
          <Select
            mode='multiple'
            value={users}
            onChange={handleUsersChange}
            placeholder='Select users'
          >
            {availableUsers.map((user) => (
              <Option key={user.id} value={user.name}>
                {user?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProjectModal;
