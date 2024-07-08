import { Spin } from 'antd';
import React, { useState } from 'react';
import { FaEdit, FaTasks } from 'react-icons/fa';
import { FaReplyAll } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useStore } from '../stores';
import CommentModal from '../modals/CommentModal';
import { MdDelete } from 'react-icons/md';

interface CommentProps {
  comment: any;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const { updateComment, deleteComment } = useStore('tasks');
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
  const projectId = id;
  const taskId = comment.task_id;
  const commentId = comment.id;
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Comment Modal:
  const handleUpdateCommentClick = () => {
    setIsModalVisible(true);
  };
  const handleCommentCloseModal = () => {
    setIsModalVisible(false);
  };

  // Submit Modal Funtion
  const submitUpdateCommentModal = (commentModaldData: { content: string }) => {
    console.log('✅ CommentModal    ', commentModaldData);
    const payload = {
      parent_id: null,
      content: commentModaldData.content,
    };

    // update modal
    updateComment(projectId, taskId, commentId, payload)
      .then(() => {
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log('✅ err    ', err);

        setIsModalVisible(false);
      });
  };
  // End
  //   delete Comment
  const handleDeleteComment = (commentID: any) => {
    setLoading(true);
    deleteComment(projectId, taskId, commentID)
      .then((res: any) => {
        setLoading(false);
        console.log('✅ Comment removed    ', res);
      })
      .catch((err) => {
        setLoading(false);
        console.log('✅ err    ', err);
      });
    // console.log('Comment ID', commentID);
  };

  return (
    <div className='comment p-2 border border-black rounded-md flex justify-between'>
      <p className='text-xs'>{comment.content}</p>
      <div className='buttons flex gap-3 justify-end items-center'>
        <button className='bg-green-700 text-white p-1 text-xs rounded-md'>
          <FaReplyAll />
        </button>
        <button
          className='bg-blue-500 text-white p-1 rounded-md'
          onClick={() => {
            handleUpdateCommentClick();
          }}
        >
          <FaEdit fontSize={12} />
        </button>
        <button
          className='bg-red-500 text-white p-1 rounded-md'
          onClick={() => {
            handleDeleteComment(comment.id);
          }}
        >
          {loading ? <Spin /> : <MdDelete fontSize={12} />}
        </button>
      </div>
      <CommentModal
        visible={isModalVisible}
        onClose={handleCommentCloseModal}
        onSubmit={submitUpdateCommentModal}
        data={comment}
      />
    </div>
  );
};

export default Comment;
