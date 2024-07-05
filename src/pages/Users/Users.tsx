import React, { useEffect, useState } from 'react';
import { useStore } from '../../stores';
import { observer } from 'mobx-react-lite';
import UserCard from './components/UserCard';
import { MdAddBox } from 'react-icons/md';
import AddUserModal from '../../modals/addUserModal';

const Users: React.FC = () => {
  const { getUsers, createUser } = useStore('users');
  const [users, setUsers] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddUserClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleAddUser = (user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    // Handle the submitted project data
    createUser(payload)
      .then((res) => {
        console.log('project added', res);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
    console.log('User added:', user);
    // Add the logic to handle the new user data here
    setIsModalVisible(false);
  };

  useEffect(() => {
    getUsers()
      .then((res) => {
        // console.log('All projects', res?.data);
        setUsers(res?.data);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }, []);
  console.log('✅ users    ', users);
  return (
    <div>
      <div className='title flex items-center gap-3 my-3'>
        {' '}
        <h2 className='text-xl font-bold '>Add User</h2>
        <button
          className='bg-green-700 text-white p-1 rounded-md'
          onClick={handleAddUserClick}
        >
          <MdAddBox fontSize={20} />
        </button>
      </div>

      <div className='usersList flex flex-wrap gap-4  '>
        {users?.map((user) => (
          <UserCard data={user} key={user.id} />
        ))}
      </div>
      <AddUserModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleAddUser}
      />
    </div>
  );
};

export default observer(Users);
