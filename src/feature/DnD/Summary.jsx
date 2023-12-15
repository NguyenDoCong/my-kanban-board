import React, { useEffect, useState } from "react";
import styles from "./css/Dialog.module.css";

function Summary({ changeSummary, detailedSummary }) {
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
    changeSummary(editedText);
    // loadIssue(issue.id);
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
          <textarea
            readOnly={!isEditing}
            // className={styles.summaryInit}
            className={`${styles.summaryInit} ${detailedSummary !== null ? styles.summary : ''}`}
            placeholder={
              detailedSummary === null
                ? "Add a more detailed description..."
                : detailedSummary
            }
            onClick={handleEditClick}
            value={detailedSummary !== null ? detailedSummary : ""}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default Summary;
