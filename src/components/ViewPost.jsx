import { useParams } from 'react-router-dom';

function ViewPost({ posts }) {
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);

  const renderMessages = () => {
    if (!post?.messages.length) {
      return <p>No messages found for this post.</p>;
    }

    return post.messages.map((message) => (
      <div key={message._id} className='recieved-messages-for-post'>
        <h3>From: {message.fromUser.username}</h3>
        <p>{message.content}</p>
      </div>
    ));
  };

  return (
    <div className='view-container'>
      <div className='view-post'>
        <h2>{post?.title}</h2>
        <p>
          <strong>Description:</strong> {post?.description}
        </p>
        <p>
          <strong>Location:</strong> {post?.location}
        </p>
        <p>
          <strong>Price:</strong> {post?.price}
        </p>
        <p>
          <strong>Active?</strong> {!post?.active ? 'No longer available...' : 'Yes'}
        </p>
        <p>
          <strong>Deliver?</strong> {!post?.willDeliver ? 'No' : 'Yes'}
        </p>
        <p>Created: {post?.createdAt}</p>
        <p>Last updated: {post?.updatedAt}</p>
      </div>
      <div className='recieved-messages-in-details'>
        <h2>Messages</h2>
        {renderMessages()}
      </div>
    </div>
  );
}

export default ViewPost;
