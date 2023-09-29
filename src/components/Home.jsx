import React from 'react';

function Home({ userData }) {
  return (
    <div className='home-container'>
      <img
        src='https://i.ibb.co/3Sr3Ckw/strangersthings-psd.png'
        alt='Banner'
        className='banner-image'
      />
      {userData ? (
        <h1 className='welcome-message'>
          Welcome {userData?.username}!
        </h1>
      ) : (
        <h1 className='login-message'>Welcome. Please Login.</h1>
      )}
    </div>
  );
}

export default Home;
