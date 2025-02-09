import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { config } from '../config.js';
const { apiURL }  = config;

export const Register = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function register(e) {
    e.preventDefault();
    setStatusMessage('');
    // TODO: Implement the registration functionality


    if (!username || !password) {
      setStatusMessage("Username and password are required.");
      return;
  }

  try {
      const response = await fetch("http://localhost:8080/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
          setStatusMessage("Registration successful! You can now log in.");
          setUsername("");
          setPassword("");
      } else {
          setStatusMessage(data.error || "Registration failed.");
      }
  } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred while registering.");
  }
} 
  return (
    <Form className='login-form' onSubmit={register}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Username" name='username' value={username} onChange={updateUsername}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={updatePassword}/>
      </Form.Group>
      <button className='form-button' type="submit">
        Register
      </button>
      <span>{statusMessage}</span>
    </Form>
  )
}