import React, { useState } from 'react';
// import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { IoIosCloseCircle } from 'react-icons/io';

const DashboardLayout = ({ children, title }) => {
  const [sidebarShow, setSidebarShow] = useState(false);
  return (
    <div className='grid grid-cols-12 relative'>
      <button
        className='block md:hidden absolute top-1 left-2'
        onClick={() => {
          setSidebarShow(true);
        }}
      >
        Show
      </button>
      {/* mobile */}
      {sidebarShow && (
        <div className='col-span-2  bg-black text-white  h-screen flex justify-center relative'>
          <IoIosCloseCircle
            className='absolute top-0 right-0 text-red-500'
            fontSize={20}
            onClick={() => {
              setSidebarShow(false);
            }}
          />
          <Sidebar />
        </div>
      )}
      {/* end */}
      <div className='col-span-2  bg-black text-white  h-screen hidden md:flex justify-center'>
        <Sidebar />
      </div>

      <main
        className={`flex flex-col ${
          sidebarShow ? 'col-span-10' : 'col-span-12'
        }  h-screen overflow-auto`}
      >
        <h2 className='mb-5 text-2xl font-bold text-center'>
          CodionsLab Task Manager
        </h2>
        <Header title={title} />
        <div className='w-full px-5'>{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
