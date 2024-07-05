import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';

// import { Button } from 'antd';

import { MdAddBox } from 'react-icons/md';
import ProjectCard from '../components/ProjectCard';
import AddProjectModal from '../modals/addProjectModal';
function ProjectManagement() {
  const { getProjects, createProject, projects } = useStore('projects');
  const { getUsers } = useStore('users');
  const [projectsData, setProjectsData] = useState([]);
  // const [users, setUsers] = useState([]);

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
  }) => {
    const payload = {
      name: project.name,
      description: project.description,
    };

    createProject(payload)
      .then((res) => {
        console.log('project added', res);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });

    setIsModalVisible(false);
  };

  useEffect(() => {
    getProjects()
      .then((res) => {
        // console.log('All projects', res?.data);
        setProjectsData(res?.data);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

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
        {projectsData?.map((item: any) => {
          return <ProjectCard data={item} />;
        })}
      </div>
      <AddProjectModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitProject}
      />
    </div>
  );
}

export default ProjectManagement;
