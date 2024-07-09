import React from 'react';
// import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = ({ children, title }) => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2  bg-black text-white  h-screen hidden sm:flex justify-center'>
        <Sidebar />
      </div>

      <main className=' flex flex-col col-span-10 h-screen overflow-auto'>
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
