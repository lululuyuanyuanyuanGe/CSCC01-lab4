import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Login } from './components/login';
import { Register } from './components/register';
import { CreatePost } from './components/createPost';
import { config } from './config';
import { Post } from './components/post';

const { apiURL } = config;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formState, setFormState] = useState(-1);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  function toggleLogin() {
    if (formState === 0) {
      setFormState(-1);
    }
    else {
      setFormState(0);
    }
  }
  function toggleRegister() {
    if (formState === 1) {
      setFormState(-1);
    }
    else {
      setFormState(1);
    }
  }
  async function logout() {
    const response = await fetch(`${apiURL}/users/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      console.error('Failed to log out');
    }
    setLoggedIn(false);
    setUser({});
    window.location.href = '/';
  }

  async function fetchPosts(ignore=false) {
    if (ignore) return;
    const response = await fetch(`${apiURL}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      setPosts(data);
    }
    else {
      console.error(data.error);
    }
  }
  
  useEffect(() => {
    let ignore = false;
    async function me() {
      /* 
      * TODO: Implement checking if the user is logged in
      * This function should set the "loggedIn" state variable to true if the user is logged in and false otherwise.
      * HINT: You can use the /users/me endpoint.
      */
    }

    me();
    fetchPosts(ignore);

    return () => {
      ignore = true;
    }
  }, []);

  /* Liking and Disliking posts have been implemented as a sample for you to read */
  async function likePost(id) {
    if (!loggedIn) return;
    const response = await fetch(`${apiURL}/posts/${id}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      fetchPosts();
    }
    else {
      console.error(data.error);
    }
  }

  async function dislikePost(id) {
    if (!loggedIn) return;
    const response = await fetch(`${apiURL}/posts/${id}/dislike`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      fetchPosts();
    }
    else {
      console.error(data.error);
    }
  }

  async function deletePost(id) {
    if (!loggedIn) return;
    const response = await fetch(`${apiURL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      fetchPosts();
    }
    else {
      console.error(data.error);
    }
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                loggedIn ?
                <Nav.Link onClick={logout}>
                  <strong>Logout</strong>
                </Nav.Link>
                :
                <>
                  <Nav.Link onClick={toggleLogin}>
                    <strong>Login</strong>
                  </Nav.Link>
                  <Nav.Link onClick={toggleRegister}>
                    <strong>Register</strong>
                  </Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Chatter Blog</h1>
      {
        formState === 0 ?
        <Login />
        :
        formState === 1 ?
        <Register />
        :
        <></>
      }
      {
        loggedIn ? <CreatePost /> : <></>
      }
      <div className='posts-container'>
      {
        posts.map((post, index) => {
          return <Post
                    key={index} 
                    post={post}
                    likePost={likePost}
                    dislikePost={dislikePost}
                    deletePost={deletePost}
                    canDelete={user?.id === post.author.id}
                />
        })
      }
      </div>
    </div>
  );
}

export default App;
