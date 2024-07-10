import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';
// import UserCard from './components/UserCard';
import { MdAddBox } from 'react-icons/md';
import AddUserModal from '../modals/addUserModal';
import UserCard from '../components/UserCard';

const Users: React.FC = () => {
  const { getUsers, createUser, users } = useStore('users');

  const [userRole, setUserRole] = useState('');
  const [usersData, setUsersData] = useState<any[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add user Modal
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
    const roleLoacal: any = localStorage.getItem('userRole');
    setUserRole(roleLoacal);
  }, []);
  // getitng all users on first
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (userRole === 'admin') {
          const res = await getUsers();
          setUsersData(res?.data);
        }
      } catch (err) {
        console.log('ERR:', err);
      }
    };

    fetchUsers();
  }, [userRole]);
  console.log('✅ users    ', usersData);
  console.log('✅ userRole    ', userRole);

  return (
    <>
      {/*  Checking access role base for the users*/}{' '}
      {userRole == 'user' ? (
        <h1>You are User </h1>
      ) : (
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
            {usersData?.map((user) => (
              <UserCard data={user} key={user.id} />
            ))}
          </div>
          <AddUserModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            onSubmit={handleAddUser}
          />
        </div>
      )}
    </>
  );
};

export default observer(Users);
