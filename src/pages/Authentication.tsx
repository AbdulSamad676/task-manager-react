// import React from 'react';

import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { Button } from 'antd';
// import RegistrationForm from '../components/RegistrationForm';

function Authentication() {
  const [login, setLogin] = useState<boolean>(true);
  const changeStatus = () => {
    setLogin(true);
  };

  return (
    <div className='flex flex-col  rounded-lg justify-center items-center bg-[#333] p-10 max-w-[500px] mx-auto'>
      <h3 className='text-xl font-semibold text-white my-3'>Welcome </h3>
      <div className='buttons my-5 w-full flex justify-center gap-5'>
        <button
          className={`${
            login ? 'bg-blue-600' : 'border border-blue-600'
          } py-1 px-3 font-semibold text-white rounded-md`}
          onClick={() => {
            setLogin(true);
          }}
        >
          Login
        </button>
        <button
          className={`${
            login ? 'border border-blue-600' : 'bg-blue-600'
          } py-1 px-3 font-semibold text-white rounded-md`}
          onClick={() => {
            setLogin(false);
          }}
        >
          Register
        </button>
      </div>
      {/* <RegistrationForm /> */}
      {login ? <LoginForm /> : <RegistrationForm changeStatus={changeStatus} />}
    </div>
  );
}

export default Authentication;
