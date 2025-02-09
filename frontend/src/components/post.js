import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { HandThumbsUp, HandThumbsDown, Trash } from 'react-bootstrap-icons';

export const Post = ({ post, canDelete, likePost, dislikePost, deletePost }) => {
  const { author, content, likes, dislikes, id } = post;

  function onLike() {
    likePost(id);
  }
  function onDislike() {
    dislikePost(id);
  }
  function onDelete() {
    deletePost(id);
  }

  return (
    <Card style={{ width: '18rem' }} className='post'>
      <Card.Header className='post-author'>{author.username} {canDelete && <Trash className='trash-icon' onClick={onDelete}/>}</Card.Header>
      <Card.Body>
        <Card.Text className='post-content'>
          {content}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
      <HandThumbsUp onClick={onLike}/> {likes} <HandThumbsDown onClick={onDislike}/> {dislikes}
      </Card.Footer>
    </Card>
  )
}