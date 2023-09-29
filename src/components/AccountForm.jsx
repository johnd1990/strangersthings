import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { registerUser, LogUser } from '../api';

function AccountForm({ setToken }) {
  const { action } = useParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = action === 'login';
  const title = isLogin ? 'Log In' : 'Sign Up';
  const funcType = isLogin ? LogUser : registerUser;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await funcType(username, password);
    setToken(result.data.token);
    if (result.data.token) {
      navigate('/');
    }
  };

  return (
    <form id='account-form' onSubmit={handleSubmit}>
      <h1>{title}</h1>
      <label htmlFor='username'>Username: </label>
      <input
        type='text'
        name='username'
        value={username}
        minLength={7}
        onChange={handleInputChange}
        required
      />
      <label htmlFor='password'>Password: </label>
      <input
        type='password'
        name='password'
        value={password}
        minLength={8}
        onChange={handleInputChange}
        required
      />
      <button type='submit'>{title}</button>
    </form>
  );
}

export default AccountForm;
