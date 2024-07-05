import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';

// import { Button } from 'antd';

import { MdAddBox } from 'react-icons/md';
import ProjectCard from '../components/ProjectCard';
import AddProjectModal from '../modals/addProjectModal';
function ProjectManagement() {
  const { getProjects } = useStore('projects');
  const { getUsers } = useStore('users');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddProjectClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitProject = (project: {
    name: string;
    description: string;
    users: string[];
  }) => {
    // Handle the submitted project data
    console.log(project);
    setIsModalVisible(false);
  };

  // Example available users array
  const availableUsers = ['User1', 'User2', 'User3'];

  // const addProject = () => {};

  useEffect(() => {
    getProjects()
      .then((res) => {
        // console.log('All projects', res?.data);
        setProjects(res?.data);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
    getUsers()
      .then((res) => {
        // console.log('All projects', res?.data);
        setUsers(res?.data);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }, []);
  console.log('✅ projects    ', projects);
  console.log('✅ users    ', users);

  return (
    <div>
      <div className='title flex items-center gap-3 my-3'>
        {' '}
        <h2 className='text-xl font-bold '>Add Project</h2>
        <button
          className='bg-green-700 text-white p-1 rounded-md'
          onClick={handleAddProjectClick}
        >
          <MdAddBox fontSize={20} />
        </button>
      </div>

      <div className='projects flex flex-wrap gap-4'>
        {projects?.map((item: any) => {
          return <ProjectCard data={item} />;
        })}
      </div>
      <AddProjectModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProject}
        availableUsers={users}
      />
    </div>
  );
}

export default ProjectManagement;
