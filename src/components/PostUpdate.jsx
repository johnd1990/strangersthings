import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postUpdate } from '../api';

const PostUpdate = ({ setPosts, posts, token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post._id === id) || {};

  const [newTitle, setNewTitle] = useState(post.title);
  const [newDescription, setNewDescription] = useState(post.description);
  const [newPrice, setNewPrice] = useState(post.price);
  const [newLocation, setNewLocation] = useState(post.location);
  const [changedDeliver, setChangedDeliver] = useState(post.willDeliver);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postUpdated = {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      location: newLocation,
      willDeliver: changedDeliver,
    };

    try {
      await postUpdate(id, token, postUpdated);
      setPosts((prevPosts) => prevPosts.map((prevPost) => (prevPost._id === id ? postUpdated : prevPost)));
      navigate('/posts');
      alert(`Update completed for ${newTitle}`);
    } catch (error) {
      console.error('Unable to update post!', error);
    }
  };

  return (
    <form id='post-form' onSubmit={handleSubmit}>
      <h2>Update</h2>
      <label>Title</label>
      <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
      <label>Description</label>
      <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required />
      <label>Price</label>
      <input type='text' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
      <label>Location</label>
      <input type='text' value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
      <label>
        Will Deliver?
        <input type='checkbox' checked={changedDeliver} onChange={() => setChangedDeliver(!changedDeliver)} />
      </label>
      <button id='submit-btn' type='submit'>
        Update Post
      </button>
    </form>
  );
};

export default PostUpdate;
