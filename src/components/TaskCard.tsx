import { Spin } from 'antd';
import React, { useState } from 'react';
import { FaEdit, FaTasks } from 'react-icons/fa';
import { MdAddBox } from 'react-icons/md';
import { MdAssignmentInd, MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useStore } from '../stores';
import TaskModal from '../modals/TaskModal';
import AssignTaskModal from '../modals/AssignTaskModal';
import CommentModal from '../modals/CommentModal';
import Comment from './Comment';

interface TaskCardProps {
  taskData: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskData }) => {
  const {
    deleteTask,
    updateTask,
    assignTaskUser,
    showComments,
    createComment,
  } = useStore('tasks');
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
  const projectId = id;
  const taskId = taskData.id;

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isAssignModalVisible, setisAssignModalVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  // State that control the visibility of the comments
  const [displayComments, setDisplayComments] = useState(false);
  // console.log('project Id:', id);

  // delet a task
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
  // Assign task to user Modal
  const handleAssignModalClick = () => {
    setisAssignModalVisible(true);
  };
  const handleCloseAssignModal = () => {
    setisAssignModalVisible(false);
  };

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
  // Update Task Modal
  const handleEditTaskClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
  // handle show or hide comments
  const handleComments = async () => {
    if (!displayComments) {
      await showComments(projectId, taskId)
        .then((res) => {
          console.log('✅ res    ', res);
          setComments(res);
          setDisplayComments(true);
        })
        .catch((err) => {
          console.log('ERR!!', err);
        });
    } else {
      setDisplayComments(false);
    }
  };
  // Comment Modal:
  const handleAddCommentClick = () => {
    setIsCommentModalVisible(true);
  };

  const handleCommentCloseModal = () => {
    setIsModalVisible(false);
  };

  // Submit Modal Funtion
  const submitCommentModal = (commentModaldData: { content: string }) => {
    console.log('✅ CommentModal    ', commentModaldData);
    const payload = {
      // ...comment,
      parent_id: null,
      content: commentModaldData.content,
    };

    createComment(projectId, taskId, payload)
      .then((res) => {
        setIsCommentModalVisible(false);
      })
      .catch((err) => {
        console.log('✅ err in comment   ', err);

        setIsCommentModalVisible(false);
      });
  };

  return (
    <div className='taskCard bg-gray-200 shadow-gray-500 p-4 rounded-lg mt-2 relative'>
      <p className='text-base font-medium'>{taskData?.name}</p>
      <p className='text-[12px] font-normal'>{taskData?.description}</p>
      <div className='commentButtons flex gap-7 items-center mt-5'>
        <button
          className='bg-blue-900 text-white py-1 px-3 rounded-md  flex justify-center items-center'
          onClick={handleComments}
        >
          Show Commnets
        </button>
        <span className='flex gap-2 items-center'>
          <p className='text-[18px] font-semibold text-black'>add</p>
          <button
            className='bg-green-900 text-white p-2 rounded-md  flex justify-center items-center'
            onClick={handleAddCommentClick}
          >
            <MdAddBox fontSize={16} />
          </button>
        </span>
      </div>
      {displayComments && (
        <div className='commetns my-3 flex flex-col gap-2'>
          {comments?.map((comment: any) => {
            return (
              <Comment comment={comment} key={comment.id} />
              // remove
              // <div className='comment p-2 border border-black rounded-md flex justify-between'>
              //   <p className='text-xs'>{comment.content}</p>
              //   <div className='buttons flex gap-3 justify-end items-center'>
              //     <button
              //       className='bg-green-700 text-white p-1 text-xs rounded-md'
              //       // onClick={handleAssignModalClick}
              //     >
              //       <FaReplyAll />
              //     </button>
              //     <button
              //       className='bg-blue-500 text-white p-1 rounded-md'
              //       onClick={() => {
              //         setCommentID(comment.id);
              //         handleUpdateCommentClick();
              //       }}
              //     >
              //       <FaEdit fontSize={12} />
              //     </button>
              //     <button
              //       className='bg-red-500 text-white p-1 rounded-md'
              //       onClick={() => {
              //         handleDeleteComment(comment.id);
              //       }}
              //     >
              //       {loading ? <Spin /> : <MdDelete fontSize={12} />}
              //     </button>
              //   </div>
              // </div>
            );
          })}
        </div>
      )}
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
      <CommentModal
        visible={isCommentModalVisible}
        onClose={handleCommentCloseModal}
        onSubmit={submitCommentModal}
      />
    </div>
  );
};

export default TaskCard;
