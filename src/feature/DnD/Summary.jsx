import React, { useEffect, useState } from "react";
import styles from "./css/Dialog.module.css";

function Summary({ comment, onEdit, onDeleteComment, issue, loadIssue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState();

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
    // onEdit(comment.id, editedText);
    loadIssue(issue.id);
    setIsEditing(false);
  };

  const handleCancelClick = (event) => {
    event.preventDefault();

    setIsEditing(false);
    // setEditedText(comment.description);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleCommentDelete = (commentId) => {
    onDeleteComment(commentId); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea
  };

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
          <textarea readOnly={true}
            className={styles.summaryInit}
            placeholder="Add a more detailed description..."
            onClick={handleEditClick}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default Summary;
