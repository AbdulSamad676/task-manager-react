import React from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
interface ProjectCardProps {
  data: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  return (
    <div className='projectCard p-3  rounded-md bg-gray-200 text-balance my-2 shadow-lg relative w-[45%] lg:w-[30%] '>
      <p className='projectName text-xl font-semibold '>{data?.name}</p>
      <p className=' text-[12px]  font-normal '>{data.description}</p>
      <div className='userTitle flex  items-center gap-3 mt-3'>
        {' '}
        <h2 className='text-lg font-bold '>Users</h2>
        <button className='bg-green-700 text-white p-1 rounded-md'>
          <MdAddBox fontSize={16} />
        </button>
      </div>
      <div className='users flex gap-3 flex-wrap mt-3 pb-5 '>
        {data?.users?.map((user: any) => {
          return (
            <div className='singleUser bg-[#0f0e0eb7] flex  items-center gap-2 border p-3 rounded-md w-[45%] '>
              <p className='text-white text-[10px]'>{user.name}</p>
              <button className='bg-red-500 text-white p-1 rounded-md'>
                <MdDelete fontSize={16} />
              </button>
            </div>
          );
        })}
      </div>
      <div className='buttons mt-3 flex gap-3 justify-end absolute right-2 bottom-2'>
        <button className='bg-blue-500 text-white p-2 rounded-md'>
          <FaEdit fontSize={16} />
        </button>
        <button className='bg-red-500 text-white p-2 rounded-md'>
          {' '}
          <MdDelete fontSize={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
