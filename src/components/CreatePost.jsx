import React, { useState } from 'react';
import { makePost } from '../api';
import { useNavigate } from 'react-router-dom';

function CreatePost({ token }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    willDeliver: false,
  });

  const goBack = useNavigate();

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleCreatePost = async (event) => {
    try {
      event.preventDefault();
      await makePost(
        formData.title,
        formData.description,
        formData.price,
        formData.location,
        formData.willDeliver,
        token
      );
      alert(`New post created: ${formData.title}`);
      goBack('/posts');
    } catch (error) {
      console.error(`Unable to create post due to: ${error}`);
    }
  };

  return (
    <form onSubmit={handleCreatePost} className='create-post-form'>
      <h2>Create Post</h2>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        name='title'
        placeholder='Title'
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='description'>Description</label>
      <input
        type='text'
        name='description'
        placeholder='Description'
        value={formData.description}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='Price'>Price</label>
      <input
        type='text'
        name='price'
        placeholder='Price'
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='location'>Location</label>
      <input
        type='text'
        name='location'
        placeholder='Location'
        value={formData.location}
        onChange={handleInputChange}
      />
      <label>
        Will Deliver?
        <input
          type='checkbox'
          name='willDeliver'
          checked={formData.willDeliver}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button className='submit-btn' type='submit'>
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
