import { Spin } from 'antd';
import React, { useState } from 'react';
import { FaEdit, FaTasks } from 'react-icons/fa';
import { MdAssignmentInd, MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useStore } from '../stores';
import TaskModal from '../modals/TaskModal';
import AssignTaskModal from '../modals/AssignTaskModal';

interface TaskCardProps {
  taskData: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskData }) => {
  const { deleteTask, updateTask, assignTaskUser } = useStore('tasks');
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
  const projectId = id;
  const taskId = taskData.id;
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAssignModalVisible, setisAssignModalVisible] = useState(false);
  // console.log('project Id:', id);

  const handleDeleteTask = () => {
    setLoading(true);
    deleteTask(projectId, taskId)
      .then((res) => {
        console.log('deleted', res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('ERR:', err);
        setLoading(false);
      });
  };

  const handleAssignModalClick = () => {
    setisAssignModalVisible(true);
  };
  const handleCloseAssignModal = () => {
    setisAssignModalVisible(false);
  };

  const handleEditTaskClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Assign task
  const assignTask = (userId: any) => {
    console.log('Assigned users ids:', userId);
    const payload = {
      assignee_id: userId,
    };
    assignTaskUser(projectId, taskId, payload)
      .then((res) => {
        console.log('Success Assigned', res);
      })
      .catch((err) => {
        console.log('✅ ERR    ', err);
      });
  };
  const handleUpdateTask = (task: {
    name: string;
    description: string;
    dueData: string;
    status: string;
  }) => {
    console.log('task', task);
    const payload = {
      ...task,
      parent_id: null,
      name: task.name,
      description: task.description,
      due_date: task.dueDate.toString(),
      status: task.status,
    };

    updateTask(projectId, taskId, payload)
      .then((res) => {
        console.log('project updated', res);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });

    setIsModalVisible(false);
  };

  return (
    <div className='taskCard bg-gray-200 shadow-gray-500 p-4 rounded-lg mt-2 relative'>
      <p className='text-base font-medium'>{taskData?.name}</p>
      <p className='text-[12px] font-normal'>{taskData?.description}</p>
      <div className='buttons mt-3 flex gap-3 justify-end absolute right-2 top-0'>
        <button
          className='bg-green-700 text-white p-1 rounded-md'
          onClick={handleAssignModalClick}
        >
          <MdAssignmentInd fontSize={12} />
        </button>
        <button
          className='bg-blue-500 text-white p-1 rounded-md'
          onClick={handleEditTaskClick}
        >
          <FaEdit fontSize={12} />
        </button>
        <button
          className='bg-red-500 text-white p-1 rounded-md'
          onClick={handleDeleteTask}
        >
          {loading ? <Spin /> : <MdDelete fontSize={12} />}
        </button>
      </div>
      <TaskModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleUpdateTask}
        data={taskData}
      />
      <AssignTaskModal
        visible={isAssignModalVisible}
        onClose={handleCloseAssignModal}
        onSubmit={assignTask}
      />
    </div>
  );
};

export default TaskCard;
