import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdAssignmentInd } from 'react-icons/md';
import { FaEdit, FaTasks } from 'react-icons/fa';
import { useStore } from '../stores';
import { Spin } from 'antd';
import AddProjectModal from '../modals/addProjectModal';
import AssignModal from '../modals/AssignProject';

interface ProjectCardProps {
  data: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const { deleteProject, updateProject, assignProjectUser } =
    useStore('projects');
  const { role } = useStore('auth');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAssignModalVisible, setisAssignModalVisible] = useState(false);
  const projectId = data.id;
  // Update Project Modal
  const handleEditProjectClick = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  // Onsubmit update Modal thie function will execute
  const handleUpdateProject = (updateData: any) => {
    const payload = {
      ...data,
      name: updateData.name,
      description: updateData.description,
    };
    updateProject(data.id, payload)
      .then((res) => {
        console.log('updated result:', res);
      })
      .catch((err) => {
        console.log('✅ err:    ', err);
      });
    console.log('updated data', updateData);
  };
  // end

  // Assign Project to user or adding user to project
  const handleAssignProjectClick = () => {
    setisAssignModalVisible(true);
  };
  const handleCloseAssignModal = () => {
    setisAssignModalVisible(false);
  };
  // onSubmit this function will execute
  const assignProject = (usersData: any) => {
    console.log('Assigned users ids:', usersData?.users);
    const payload = {
      user_ids: usersData?.users,
    };
    assignProjectUser(projectId, payload)
      .then((res) => {
        console.log('Success Assigned', res);
      })
      .catch((err) => {
        console.log('✅ ERR    ', err);
      });
  };

  // Delete a project
  const handleDeleteProject = () => {
    setLoading(true);
    deleteProject(data.id)
      .then((res) => {
        console.log('deleted', res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('ERR:', err);
        setLoading(false);
      });
  };
  // navigate to a project tasks
  const handleCardClick = () => {
    if (data && data.id) {
      navigate(`/project-tasks/${data.id}`);
    }
  };

  useEffect(() => {
    // Make sure the role is set before rendering the component
    if (!role) {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole) {
        // Assuming you have a method to set the role in the store
        useStore('auth').setRole(storedRole);
      }
    }
  }, [role]);

  if (!role) {
    return null; // or a loader if you want to show a loading state
  }

  return (
    <div className='projectCard p-3 rounded-md bg-gray-200 text-balance my-2 shadow-lg relative w-[45%] lg:w-[30%]'>
      <p className='projectName text-xl font-semibold'>{data?.name}</p>
      <p className='text-[12px] font-normal'>{data.description}</p>
      <div className='userTitle flex items-center gap-3 mt-3'>
        {role === 'admin' && <h2 className='text-lg font-bold'>Users</h2>}
      </div>
      <div className='users flex gap-3 flex-wrap mt-3 pb-5'>
        {data?.users?.map((user: any) => {
          return (
            <div
              key={user.id}
              className='singleUser bg-[#0f0e0eb7] flex items-center gap-2 border p-3 rounded-md w-[45%]'
            >
              <p className='text-white text-[10px]'>{user.name}</p>
            </div>
          );
        })}
      </div>
      {role === 'admin' && (
        <div className='buttons mt-3 flex gap-3 justify-end absolute right-2 bottom-2'>
          <button
            className='bg-purple-800 text-white p-2 rounded-md'
            onClick={handleCardClick}
          >
            <FaTasks fontSize={16} />
          </button>

          <button
            className='bg-green-700 text-white p-2 rounded-md'
            onClick={handleAssignProjectClick}
          >
            <MdAssignmentInd fontSize={16} />
          </button>
          <button
            className='bg-blue-500 text-white p-2 rounded-md'
            onClick={handleEditProjectClick}
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
      )}
      <AddProjectModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleUpdateProject}
        data={data}
      />
      <AssignModal
        visible={isAssignModalVisible}
        onClose={handleCloseAssignModal}
        onSubmit={assignProject}
      />
      {/* the tasks button will only show to users  */}
      {role === 'user' && (
        <button
          className='bg-purple-800 text-white p-2 rounded-md absolute right-2 bottom-1'
          onClick={handleCardClick}
        >
          <FaTasks fontSize={16} />
        </button>
      )}
    </div>
  );
};

export default ProjectCard;
