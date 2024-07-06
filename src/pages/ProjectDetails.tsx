import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import { useStore } from '../stores'; // Adjust the import according to your project structure
import TaskCard from '../components/TaskCard';
import { MdAddBox } from 'react-icons/md';
import TaskModal from '../modals/TaskModal';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
  const { getProject } = useStore('projects'); // Get the getProject function from your store
  const { getTasks, createTask } = useStore('tasks');
  const { role } = useStore('auth');
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTaskClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitTask = (task: {
    name: string;
    description: string;
    dueData: string;
    status: string;
  }) => {
    console.log('task', task);
    const payload = {
      parent_id: null,
      name: task.name,
      description: task.description,
      due_date: task.dueDate.toString(),
      status: task.status,
    };

    createTask(id, payload)
      .then((res) => {
        console.log('project added', res);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });

    setIsModalVisible(false);
  };

  useEffect(() => {
    if (id) {
      getProject(id)
        .then((data: any) => {
          setProject(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });

      // get all tasks

      getTasks(id)
        .then((data: any) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  }, [id, getProject, getTasks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading project data</div>;
  }

  if (!project) {
    return <div>No project data found</div>;
  }

  console.log('✅ tasks    ', tasks);

  return (
    <div>
      <div className='taskCardsSection '>
        <div className='userTitle flex items-center justify-between gap-3 mt-3'>
          <h2 className='text-xl font-bold'>Add Task</h2>
          <button className='bg-green-700 text-white p-2 rounded-md'>
            <MdAddBox fontSize={16} onClick={handleAddTaskClick} />
          </button>
        </div>
        {tasks?.map((task: any) => (
          <TaskCard taskData={task} key={task.key} />
        ))}
      </div>
      <TaskModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitTask}
      />
    </div>
  );
};

export default ProjectDetails;
