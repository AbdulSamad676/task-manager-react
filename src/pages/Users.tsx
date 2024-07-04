import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';

const Users: React.FC = () => {
  const { getUsers } = useStore('users');
  const [users, setUsers] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    getUsers(storedToken)
      .then((res: any) => {
        setUsers(res);
        // setLoading(false);
      })
      .catch((err: any) => {
        console.log('Error fetching users:', err);
        // setLoading(false);
      });
  }, [getUsers]);

  return (
    <div>
      <div className='usersList flex flex-col items-center p-4 rounded-lg bg-[#333] w-max mx-auto'>
        <h2 className='text-xl font-semibold text-white'>Users</h2>
        {users?.map((user) => (
          <div key={user.id} className='userItem text-white my-2'>
            <p className='font-medium'>{user.name}</p>
            <p>{user.email}</p>
            {/* Add more user details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Users);
