import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';

const PostItem = ({ post, token, onDelete }) => {
  const linkStyle = {
    width: '90px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: '600',
    padding: '5px 12px',
    down: '5px',
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id, token);
      // Update the parent component's state to remove the deleted post
      onDelete(post._id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className='post-item'>
      <h2>{post.title}</h2>
      <p>{"Location: " + post.location}</p>
      <p>{"Price: " + post.price}</p>
      <p>{"Delivery: " + (post.willDeliver ? "Yes" : "No")}</p>
      {token && (
        <div className='post-options'>
          {post.isAuthor ? (
            <>
              <Link style={linkStyle} to={`/posts/${post._id}`}>
                Details
              </Link>
              <Link style={linkStyle} to={`/posts/update/${post._id}`}>
                Update
              </Link>
              <button id='delete-btn' onClick={handleDelete}>
                Delete
              </button>
            </>
          ) : (
            <Link style={linkStyle} to={`/posts/${post._id}/messages`}>
              Message
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default PostItem;
