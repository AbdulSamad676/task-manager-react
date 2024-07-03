// import { useStore } from '../stores';

import { useEffect, useState } from 'react';
import { useStore } from '../stores';
import EditProfileModal from '../modals/EditProfileModal';

const Profile: React.FC = () => {
  const { getProfile } = useStore('profile');
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    // Retrieve the token from local storage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    getProfile(token)
      .then((res: any) => {
        setProfile(res);
      })
      .catch((err) => {
        console.log('ERR', err);
      });
    // console.log('Token:', storedToken);
  }, []);

  console.log('big', profile);
  return (
    <div>
      <div className='welcomeText flex justify-center items-center p-4 rounded-lg bg-[#333] w-max mx-auto'>
        <h2 className='text-xl font-semibold text-white'>
          {' '}
          WelCome {profile?.name}
        </h2>
      </div>
      <div className='userType flex justify-between items-center flex-wrap my-5'>
        <p className='text-xl font-medium  text-black py-1 px-3 rounded-lg'>
          You are {profile?.role}
        </p>
        <button
          className='bg-black text-white py-1 px-3 rounded-lg'
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>
      <EditProfileModal
        visible={isModalVisible}
        onClose={handleModalClose}
        profile={profile}
      />
    </div>
  );
};

export default Profile;
