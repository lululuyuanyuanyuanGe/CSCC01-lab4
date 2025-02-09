import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useCookies } from 'react-cookie';
import { config } from '../config.js';
const { apiURL }  = config;

export const CreatePost = () => {
  const [cookies, setCookie] = useCookies(['session_id']);
  const [content, setContent] = useState('');

  function updateContent(e) {
    setContent(e.target.value);
  }

  async function createPost(e) {
    e.preventDefault();
    // TODO: Implement the post functionality
  }
  return (
    <Form className='login-form' onSubmit={createPost}>
      <Form.Group className="mb-3" controlId="formBasicContent">
        <Form.Control as="textarea" rows={3} placeholder="Say something fun!" name='content' value={content} onChange={updateContent}/>
      </Form.Group>
      <button className='form-button' type="submit">
        Post
      </button>
    </Form>
  )
}