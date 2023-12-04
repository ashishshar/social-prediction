import React, { useState } from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';

const Comments = ({ comments, onComment }) => {
  const [commentText, setCommentText] = useState('');

  const handlePostComment = () => {
    if (commentText.trim() !== '') {
      onComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="comments">
      <ListGroup>
        {comments && comments.length > 0 && comments.map((comment, index) => (
          <ListGroup.Item key={index} className="comment">
            <div className="comment-content">
              <strong>User Name</strong>
              <p>{comment.text}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <br/>
      <Form className="comment-form">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handlePostComment}>
          Post
        </Button>
      </Form>
    </div>
  );
};

export default Comments;
