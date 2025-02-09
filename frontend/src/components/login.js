import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { config } from '../config.js';
const { apiURL }  = config;

export const Login = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function login(e) {
    e.preventDefault();
    setStatusMessage('');
    // TODO: Implement the login functionality
  }
  return (
    <Form className='login-form' onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" name='username' value={username} onChange={updateUsername}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={updatePassword}/>
      </Form.Group>
      <button className='form-button' type="submit">
        Login
      </button>
      <span>{statusMessage}</span>
    </Form>
  )
}