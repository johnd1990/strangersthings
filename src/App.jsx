import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { getAllPosts, fetchUserData } from './api';
import Home from './components/Home';
import AccountForm from './components/AccountForm';
import Posts from './components/Posts';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import ViewPost from './components/ViewPost';
import PostUpdate from './components/PostUpdate';
import Message from './components/Message';
import './styles/Style.css';

function NavBar({ token, logOut }) {
  return (
    <div className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/posts'>Posts</Link>
      {token ? (
        <>
          <Link to='/profile'>Profile</Link>
          <button className='log-out-link' onClick={logOut}>
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link to='/account/login'>Login</Link>
          <Link to='/account/register'>Sign up</Link>
        </>
      )}
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllPosts(token);
      setPosts(response);
    };
    if (token) {
      fetchPosts();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      const getData = async () => {
        const result = await fetchUserData(token);
        setUserData(result.data);
      };
      getData();
    }
  }, [token]);

  const logOut = (e) => {
    e.preventDefault();
    setToken(null);
    setUserData(null);
    navigate('/');
  };

  const handlePostDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div id='app'>
      <NavBar token={token} logOut={logOut} />
      <Routes>
        <Route path='/' element={<Home userData={userData} />} />
        <Route
          path='/posts'
          element={
            <Posts
              setPosts={setPosts}
              posts={posts}
              setToken={setToken}
              token={token}
              onDelete={handlePostDelete}
            />
          }
        />
        <Route
          path='/posts/create'
          element={<CreatePost setToken={setToken} token={token} />}
        />
        <Route
          path='/posts/:id/messages'
          element={<Message token={token} />}
        />
        <Route
          path='/posts/update/:id'
          element={
            <PostUpdate setPosts={setPosts} posts={posts} token={token} />
          }
        />
        <Route path='/posts/:id' element={<ViewPost posts={posts} />} />
        <Route path='/profile' element={<Profile userData={userData} />} />
        <Route
          path='/account/:action'
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
