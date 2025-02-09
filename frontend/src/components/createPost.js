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
    setStatusMessage(""); // Clear previous messages

        // Validate post content
        if (!postContent.trim()) {
            setStatusMessage("Post content cannot be empty.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/posts/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: postContent }),
                credentials: "include", // Ensures session authentication
            });

            const data = await response.json();

            if (response.ok) {
                setStatusMessage("Post created successfully!");
                setPostContent(""); // Clear input field
                fetchPosts(); // Refresh the post list
            } else {
                setStatusMessage(data.error || "Failed to create post.");
            }
        } catch (error) {
            console.error(error);
            setStatusMessage("An error occurred while creating the post.");
        }
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