import React, { useState } from 'react';
import { message } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const Message = ({ token }) => {
  const { id } = useParams(); // Get id from params
  const goBack = useNavigate();
  const [content, setContent] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await message(id, token, content);
      goBack('/posts');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={sendMessage} id='post-form'>
      <label htmlFor='content'>Content</label>
      <input
        required
        type='text'
        className='post-form-input'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Enter message here.'
      />
      <button id='submit-btn' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default Message;
