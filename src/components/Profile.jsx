function Profile({ userData }) {
  return (
    <div id='profile-container'>
      <div>
        <h1 className='profile-header'>Welcome, {userData?.username}!</h1>
        <div className='message-container'>
          <div className='recieved-messages'>
            <h2>Inbox</h2>
            {userData?.posts.length ? (
              userData.posts.map((post) => (
                <div key={post._id} className='recieved-messages-for-post'>
                  <h3>Messages from post: {post.title}</h3>
                  <div className='recieved-message'>
                    {post.messages.length ? (
                      post.messages.map((message) => (
                        <div key={message._id} className='content'>
                          <h3>From: {message.fromUser.username}</h3>
                          <p>{message.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className='content'>No received messages found.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
          <div className='sent-messages'>
            <h2>Sent</h2>
            {userData?.messages.length ? (
              userData.messages.map((message) => (
                <div key={message._id} className='sent-message'>
                  <h3>Messages to post: {message.post.title}</h3>
                  <p className='content'>{message.content}</p>
                </div>
              ))
            ) : (
              <p>No sent messages found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
