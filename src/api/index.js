const COHORT_NAME = '2302-ACC-ET-WEB-PT-B';
const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

// Register a user
export async function registerUser(username, password) {
  try {
    const user = { username, password };
    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const result = await res.json();
    alert(result.data.message);
    return result;
  } catch (error) {
    console.error('Registration failed:', error);
  }
}

// Log in a user
export async function LogUser(username, password) {
  try {
    const user = { username, password };
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });
    const result = await response.json();
    alert(result.data.message);
    return result;
  } catch (err) {
    console.error('Login failed:', err);
  }
}

// Fetch user data
export const fetchUserData = async (token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`${API_URL}/users/me`, { headers });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Unable to fetch user data:', error);
  }
};

// Fetch all posts
export async function getAllPosts(token) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`${API_URL}/posts`, { headers });
    const { data: { posts } } = await res.json();
    return posts;
  } catch (error) {
    console.error('Unable to retrieve posts:', error);
  }
}

// Update a post
export const postUpdate = async (id, token, postUpdated) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ post: PostUpdated }),
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Unable to update post:', error);
  }
};

// Create a post
export const makePost = async (
  title,
  description,
  price,
  location,
  willDeliver,
  token
) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const post = {
      title,
      description,
      price,
      location,
      willDeliver,
    };
    const res = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ post }),
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Unable to create a post:', error);
  }
};

// Delete a post
export const deletePost = async (id, token) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers,
    });
    const result = await res.json();
    console.log(result);
    window.location.reload();
  } catch (error) {
    console.error('Unable to delete post:', error);
  }
};

// Post a message inside a post
export const message = async (id, token, content) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(`${API_URL}/posts/${id}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message: { content } }),
    });
    const result = await res.json();
    alert('Message sent!');
    return result;
  } catch (error) {
    console.error('Unable to post message:', error);
  }
};
