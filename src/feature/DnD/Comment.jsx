import React, { useEffect, useState } from "react";
import styles from './css/Dialog.module.css';

function Comment({ comment, onEdit, onDeleteComment, issue, loadIssue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.description);

  // useEffect(() => {
  //   // console.log(editedText);
  //   //Runs only on the first render
  // }, [comment]);

  const handleEditClick = (event) => {
    event.preventDefault();

    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Call the onEdit callback with the edited text
    onEdit(comment.id, editedText);
    loadIssue(issue.id);
    setIsEditing(false);
  };

  const handleCancelClick = (event) => {
    event.preventDefault();

    setIsEditing(false);
    setEditedText(comment.description);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleCommentDelete = (commentId) => {
    onDeleteComment(commentId); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea
  };

  const dateTime = new Date(comment.created_at);

  const formattedDate = `${dateTime.getDate()}/${
    dateTime.getMonth() + 1
  }/${dateTime.getFullYear()}`;
  // const formattedTime = `${dateTime.getHours()}:${dateTime.getMinutes()}`;

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea value={editedText} onChange={handleTextChange} />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <span>{comment.commenter.user_name}</span> 
            <span> </span>
            <span>{formattedDate}</span>
          </p>
          <p>{comment.description}</p>
          <button onClick={handleEditClick} className={styles.buttonless}>
            Edit
          </button>
          <button
            onClick={() => handleCommentDelete(comment.id)}
            className={styles.buttonless}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
