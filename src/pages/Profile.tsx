// import React, { useEffect } from 'react';
// import axios from '../services/axios';
// import { useStore } from '../stores'; // Ensure this path is correct

import { useStore } from '../stores';

const Profile: React.FC = () => {
  const profileStore = useStore('profile');
  // working
  const getProfileData = () => {
    // fetch('https://task-manager.codionslab.com/api/v1/profile')
    //   .then((res) => {
    //     console.log('profile', res);
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
    profileStore.getProfile();
  };

  // useEffect(() => {
  //   const profile = profileStore.getProfile();
  //   console.log('✅ profile', profile);
  // }, [profileStore]);

  return (
    <div>
      Profile
      <button
        className='bg-black text-white py-1 px-3 rounded-lg'
        onClick={getProfileData}
      >
        get profile
      </button>
    </div>
  );
};

export default Profile;
