// import { faBell, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';

function Header({ title }) {
  const formattedTitle = title.replace('/', '');
  const capitalizedTitle =
    formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
  return (
    <div className='  w-full flex justify-center items-center drop-shadow-lg px-3 py-2'>
      <div className=' font-black  text-black p-1 rounded col-span-3 md:col-span-2 flex justify-center items-center'>
        <h2>{capitalizedTitle}</h2>
      </div>
    </div>
  );
}

export default Header;
