import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

import { Spin } from 'antd';
import { useStore } from '../../../stores';
import AddUserModal from '../../../modals/addUserModal';

interface UserCardProps {
  data: any;
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const userId = data?.id;
  //   const { deleteProject } = useStore('projects');
  const [loading, setLoading] = useState(false);
  const { deleteUser, updateUser } = useStore('users');

  const handleDeleteProject = () => {
    setLoading(true);
    deleteUser(data.id)
      .then((res) => {
        console.log('deleted', res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('ERR:', err);
        setLoading(false);
      });
  };
  // to remove user from a project you can set the user array and then manipulate
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditUserClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleEditUser = (user: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    // Handle the submitted project data
    const payload = {
      is_active: '1',
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    console.log('Updated user Data', payload);

    updateUser(userId, payload)
      .then((res) => {
        console.log('updated result:', res);
      })
      .catch((err) => {
        console.log('✅ err:    ', err);
      });
    // console.log('User Updated:', user);
    // Add the logic to handle the new user data here
    setIsModalVisible(false);
  };

  return (
    <div className='UserCard p-3  rounded-md bg-gray-200 text-balance my-2 shadow-lg relative w-[45%] lg:w-[30%] '>
      <p className='projectName text-xl font-semibold '>{data?.name}</p>
      <p className=' text-[12px]  font-normal '>{data.email}</p>

      <div className='buttons mt-3 flex gap-3 justify-end absolute right-2 bottom-2'>
        <button
          className='bg-blue-500 text-white p-2 rounded-md'
          onClick={handleEditUserClick}
        >
          <FaEdit fontSize={16} />
        </button>
        <button
          className='bg-red-500 text-white p-2 rounded-md'
          onClick={handleDeleteProject}
        >
          {loading ? <Spin /> : <MdDelete fontSize={16} />}
        </button>
      </div>
      <AddUserModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleEditUser}
        data={data}
      />
    </div>
  );
};

export default UserCard;
