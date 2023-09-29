import React, { useState } from 'react';
import PostItem from './PostItem';
import { Link } from 'react-router-dom';

const Posts = ({ posts, token }) => {
  const [searchParam, setSearchParam] = useState('');

  const displayPosts = searchParam
    ? posts.filter((post) => post.title.toLowerCase().includes(searchParam.toLowerCase()))
    : posts;

  return (
    <div className='post-page'>
      <div className='post-header'>
        <h1>Posts</h1>
      </div>
      <div className='post-actions'>
        <div className='search-post'>
          <label>
            Search:{' '}
            <input
              type='text'
              placeholder='Post Title'
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </label>
        </div>
        {token ? (
          <Link to={'/posts/create'}>Create a post</Link>
        ) : (
          <p>Please log in or sign up to create a post...</p>
        )}
      </div>
      <div className='posts'>
        {displayPosts.map((post) => (
          <PostItem key={post._id} post={post} token={token} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
