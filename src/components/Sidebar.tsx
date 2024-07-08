// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../stores'; // Adjust the path to your MobX store
import { useEffect, useState } from 'react';

function Sidebar(): JSX.Element {
  const { logoutUser, role } = useStore('auth');
  const naviagte = useNavigate();
  const [userRole, setUserRole] = useState('');
  const handleLogout = (): void => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      logoutUser(storedToken)
        .then(() => {
          console.log('Logout Successfully');
          naviagte('/');
        })
        .catch((err: any) => {
          console.log('ERR', err);
        });
    }
  };
  useEffect(() => {
    const roleLoacal: any = localStorage.getItem('userRole');
    setUserRole(roleLoacal);
  }, []);

  console.log('✅ role    ', userRole);

  return (
    <div className='w-full flex flex-col gap-5 justify-between py-10 items-center px-3'>
      <div className='flex flex-col gap-3 mb-10 w-full'>
        <Link to='/profile'>
          <div className='icons hover:bg-[#333] py-2 px-3 rounded-md w-full'>
            <p className='text-xs font-bold'>Profile</p>
          </div>
        </Link>

        <Link to='/users'>
          <div className='icons hover:bg-[#333] py-2 px-3 rounded-md'>
            <p className='text-xs font-bold'>Users</p>
          </div>
        </Link>
        <Link to='/project-management'>
          <div className='icons hover:bg-[#333] py-2 px-3 rounded-md'>
            <p className='text-xs font-bold'>Project </p>
          </div>
        </Link>
      </div>
      <div
        className='flex flex-col justify-center items-center mt-3 w-full hover:bg-[#333] py-2 px-3 rounded-md cursor-pointer'
        onClick={handleLogout}
      >
        <p className='text-xs w-full font-bold'>Log Out</p>
      </div>
    </div>
  );
}

export default Sidebar;
