// import React, { useEffect, useState } from 'react';
// import { Modal, Button, Form, Select } from 'antd';
// import { useStore } from '../stores';

// const { Option } = Select;
// interface AssignModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onSubmit: (project: { users: string[] }) => void;
// }

// const AssignModal: React.FC<AssignModalProps> = ({
//   visible,
//   onClose,
//   onSubmit,
// }) => {
//   //   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [selectUsers, setSelectUsers] = useState<string[]>([]);
//   const handleUsersChange = (selectedUsers: string[]) => {
//     console.log('selected user', selectedUsers);
//     setSelectUsers(selectedUsers);
//   };
//   const { users } = useStore('users');
//   const handleSubmit = () => {
//     onSubmit({ selectUsers });
//     onClose();
//   };

//   console.log('Users in Modal', users);
//   return (
//     <Modal
//       title='Add Project'
//       visible={visible}
//       onCancel={onClose}
//       footer={[
//         <Button key='cancel' onClick={onClose}>
//           Cancel
//         </Button>,
//         <Button key='submit' type='primary' form='form' htmlType='submit'>
//           Submit
//         </Button>,
//       ]}
//     >
//       <Form layout='vertical' id='form' onFinish={handleSubmit}>
//         <Form.Item label='Users'>
//           <Select
//             mode='multiple'
//             value={users}
//             onChange={handleUsersChange}
//             placeholder='Select users'
//           >
//             {users?.data?.map((user) => (
//               <Option key={user.id} value={user.id}>
//                 {user?.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default AssignModal;
import React, { useState } from 'react';
import { Modal, Button, Form, Select } from 'antd';
import { useStore } from '../stores';

const { Option } = Select;

interface AssignModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (project: { users: string[] }) => void;
}

const AssignModal: React.FC<AssignModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const { users } = useStore('users'); // Ensure this matches how you access your store
  //   const users = UserStore.users; // Accessing raw users data from the store

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUsersChange = (selected: string[]) => {
    setSelectedUsers(selected);
  };

  const handleSubmit = () => {
    onSubmit({ users: selectedUsers });
    onClose();
  };

  console.log('Users in Modal', users);

  return (
    <Modal
      title='Add Project'
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
            mode='multiple'
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

export default AssignModal;
