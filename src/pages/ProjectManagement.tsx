import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';

// import { Button } from 'antd';

import { MdAddBox } from 'react-icons/md';
import ProjectCard from '../components/ProjectCard';
import AddProjectModal from '../modals/addProjectModal';
function ProjectManagement() {
  const { getProjects, createProject, projects, getUserProjects } =
    useStore('projects');
  const { getUsers } = useStore('users');
  const { role } = useStore('auth');
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
    if (role == 'admin') {
      // for admin
      getProjects()
        .then((res) => {
          setProjectsData(res?.data);
        })
        .catch((err) => {
          console.log('ERR:', err);
        });
    } else {
      getUserProjects()
        .then((res) => {
          console.log('response', res);
          setProjectsData(res?.data);
        })
        .catch((err) => {
          console.log('ERR:', err);
        });
      // user
    }
  }, []);

  useEffect(() => {
    if (role == 'admin') {
      getUsers();
    }
  }, []);
  console.log('✅ ProjectsData    ', projectsData);

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
