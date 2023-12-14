import React, { useEffect, useState } from "react";
import styles from "./css/Dialog.module.css";
import moment from "moment";
import 'moment/locale/vi'; // Chọn ngôn ngữ hiển thị

function Comment({ comment, onEdit, onDeleteComment, issue, loadIssue }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState();

  useEffect(() => {
    // console.log("comment:",comment);
    //Runs only on the first render
  }, []);

  const handleEditClick = (event) => {
    event.preventDefault();

    setIsEditing(true);
  };

  // const handleSaveClick = () => {
  //   // Call the onEdit callback with the edited text
  //   onEdit(comment.id, editedText);
  //   loadIssue(issue.id);
  //   setIsEditing(false);
  // };

  // const handleCancelClick = (event) => {
  //   event.preventDefault();

  //   setIsEditing(false);
  //   // setEditedText(comment.description);
  // };

  // const handleTextChange = (e) => {
  //   setEditedText(e.target.value);
  // };

  // const handleCommentDelete = (commentId) => {
  //   onDeleteComment(commentId); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea
  // };

  const dateTime = new Date(comment.created_at);

  // const formattedDate = `${dateTime.getDate()}/${
  //   dateTime.getMonth() + 1
  // }/${dateTime.getFullYear()}`;
  // const formattedTime = `${dateTime.getHours()}:${dateTime.getMinutes()}`;

  const [timeDiff, setTimeDiff] = useState("");

  useEffect(() => {
    // Ngày cụ thể bạn muốn tính khoảng cách
    const targetDate = moment(dateTime);

    // Lấy thời gian hiện tại
    const currentDate = moment();

    // Tính khoảng cách thời gian
    const duration = moment.duration(targetDate.diff(currentDate));

    // Hiển thị khoảng cách thời gian
    const formattedTimeDiff = duration.humanize();

    setTimeDiff(formattedTimeDiff+" ago");
  }, []);

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea
            value={editedText}
            // onChange={handleTextChange}
          />
          <button
          // onClick={handleSaveClick}
          >
            Save
          </button>
          <button
          // onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className={styles.noGap}>
            <span className={styles.bold}>{comment.commenter.user_name} </span><span>{timeDiff} </span>
            {/* <span>{formattedDate}</span> */}
          </p>
          <p className={styles.initComment}>{comment.description}</p>
          <button
            onClick={handleEditClick}
            className={styles.buttonless}
          >
            Edit
          </button>
          <button
            // onClick={() => handleCommentDelete(comment.id)}
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
