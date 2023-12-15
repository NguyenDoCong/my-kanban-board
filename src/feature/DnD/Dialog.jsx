import React, { useState, useEffect } from "react";
// import styles from "./Dialog.module.css";
// import { deleteIssue } from "./api/deleteIssue.js";
// import { useSelector } from "react-redux";
// import { selectUser } from "../Authentication/AuthSlice/userSlice.js";
import Comment from "./Comment.jsx";
import styles from "./css/Dialog.module.css";
import Members from "./Members.jsx";
import Categories from "./Categories.jsx";
import Summary from "./Summary.jsx";
import NewComment from "./NewComment.jsx";

function Dialog({
  show,
  onClose,
  projectMembers,
  categories,
  issueMembers,
  onAddMember,
  issue,
  onDeleteIssue,
  onUpdateIssue,
  onAddComment,
  detailedIssue,
  onDeleteComment,
  onEditComment,
  onShowSnackbar,
  changeSummary,
  // selectedCategory
  // currentUser,
}) {
  if (!show) return null;

  const [selectedMember, setSelectedMember] = useState(); // Sử dụng giá trị mặc định là null
  // const [memberName, setMemberName] = useState(""); // State để lưu tên được chọn
  const [description, setDescription] = useState(issue.summary);
  const [memberList, setMemberList] = useState(issue.members);

  useEffect(() => {
    // setMemberList(issue.member);
    console.log("changeSummary:", issue.summary);
  }, [issue]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  // const [newComment, setNewComment] = useState();

  const [selectedCategory, setSelectedCategory] = useState(issue.category);

  const handleDesChange = (event) => {
    setDescription(event.target.value);
  };

  // const handleCommentChange = (event) => {
  //   setNewComment(event.target.value); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea
  // };

  // const handleCommentEdit = (commentId) => {
  //   onEditComment(commentId); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea
  // };

  const handleCommentDelete = (commentId) => {
    onDeleteComment(commentId); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi dữ liệu cập nhật đến server hoặc xử lý theo logic của bạn
    // ...
    onClose();
  };

  // useEffect(() => {
  // }, [categoryName]);
  // let user = useSelector(selectUser);

  const [memberIdList, setMemberIdList] = useState();

  const handleAddMember = (selectedMembers) => {
    // e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "Thêm"

    let updatedMembers;

    if (typeof memberList !== "undefined" && memberList.length === 0) {
      updatedMembers = [selectedMembers];
    } else {
      updatedMembers = [...memberList, selectedMembers];
    }
    setMemberList(updatedMembers);
    // setMemberList((prevMembers) => {
    //   let updatedMembers = [...prevMembers, selectedMember];

    console.log("trc khi them", updatedMembers);

    // const member_id_list = updatedMembers.map((member) => member.id);
    // setMemberIdList(member_id_list);

    // onUpdateIssue(
    //   issue.id,
    //   description,
    //   selectedMember?.id || null,
    //   selectedCategory?.id || null,
    //   newComment,
    //   // member_id_list
    // );

    // setSelectedMember(null); // Đặt selectedMember về trạng thái mặc định
  };

  // const handleDeleteMember = (e) => {
  //   e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "Thêm"
  //   const updatedMembers = memberList.filter(
  //     (member) => member.id !== selectedMember.id
  //   );
  //   setMemberList(updatedMembers);

  //   const member_id_list = updatedMembers.map((member) => member.id);

  //   onUpdateIssue(
  //     issue.id,
  //     description,
  //     selectedMember?.id || null,
  //     selectedCategory?.id || null,
  //     newComment,
  //     member_id_list
  //   );
  // };

  const handleSave = (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "Thêm"

    const member_id_list = memberList.map((member) => member.id);

    // if (formData.member == user.profile.id) {
    onUpdateIssue(
      issue.id,
      description
      // selectedMember?.id || null,
      // selectedCategory?.id || null,
      // newComment,
      // member_id_list
    );
    // } else {
    //   // console.log(newComment);
    //   onAddComment(formData.title, newComment);
    // }
    // loadIssue(issue.id);

    onShowSnackbar();
    // alert(`Description: ${description}`);
    // onClose(); // Đóng dialog sau khi lưu thành công
  };

  const [changeCat, setChangeCat] = useState();

  const handleCategoryButtonClick = (commentId, editedText) => {
    // e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "Thêm"
    setChangeCat(!changeCat);
    // const member_id_list = memberList.map((member) => member.id);
    console.log("selectedCategory:", selectedCategory);
    // // if (formData.member == user.profile.id) {
    // onUpdateCategory(
    //   issue.id,
    //   // description
    //   // selectedMember?.id || null,
    //   selectedCategory?.id || null
    //   // newComment,
    //   // member_id_list
    // );

    // loadIssue(issue.id);
  };

  const handleCommentSave = (e) => {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "Thêm"

    // const member_id_list = memberList.map((member) => member.id);

    // if (formData.member == user.profile.id) {
    // onAddComment(
    //   issue.id,
    //   // description
    //   // selectedMember?.id || null,
    //   // selectedCategory?.id || null,
    //   newComment
    //   // member_id_list
    // );
    // } else {
    //   // console.log(newComment);
    //   onAddComment(formData.title, newComment);
    // }
    onShowSnackbar();
    // alert(`Description: ${description}`);
    onClose(); // Đóng dialog sau khi lưu thành công
  };

  // useEffect(() => {
  //   console.log("memberList:", memberList);
  // }, [memberList]);

  const [comments, setComments] = useState(issue.comment);

  // const [maxID, setMaxID] = useState(200);

  const addComment = (currentTime, editedText) => {
    onAddComment(currentTime, editedText);
  };

  const onChangeSummary = (editedText) => {
    changeSummary(editedText);
  }

  const handleCommentEdit = (commentId, editedText) => {
    // Find the comment by its ID
    // onEditComment(commentId, editedText); // Cập nhật newComment bằng giá trị nhập vào từ trường textarea

    // loadIssue(issue.id);

    // console.log(editedText);
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, text: editedText };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  // const handleSelectAllChange = () => {
  //   // Toggle chế độ chọn tất cả và làm mới danh sách thành viên được chọn
  //   setSelectAll(!selectAll);
  //   setSelectedMembers([]);
  // };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (event) => {
    event.preventDefault();

    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.passwordChangeSuccessDialog}>
      <div className={styles.dialogContent}>
        <div className={styles.leftDiv}>
          <div>
            <h3>{issue.issue_name}</h3>
            <form onSubmit={handleSubmit}>
              <label> Members: </label>
              <span>
                {issue.members &&
                  issue.members.length > 0 &&
                  issue.members.map((member, index) => (
                    <span key={member.id}>
                      {member.user_name}
                      {index < issue.members.length - 1 ? ", " : " "}
                    </span>
                  ))}
                {/* {issueMembers && issueMembers.user_name} */}
              </span>

              <label>Category: </label>
              <span>{selectedCategory && selectedCategory.category_name}</span>
              <br></br>

              <label>Summary:</label>
              <br></br>

              {/* <textarea
                name="description"
                value={description}
                onChange={handleDesChange}
              /> */}

              <Summary
                // key={comment.id}
                // comment={comment}
                changeSummary={onChangeSummary}
                detailedSummary={issue.summary}
                // onDeleteComment={handleCommentDelete}
                // issue
                // loadIssue
              />
              {/* <button onClick={handleSave}>Save</button> */}
              {/* 
          <textarea
            placeholder="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
              {/* <button type="submit" onClick={handleSave}>
                Save
              </button> */}

              <div>
                <label>Comments:</label>
                <br></br>
                {/* <ul>
              {issue.comment &&
                issue.comment.map((comment) => (
                  <li key={comment.id}>
                    <p className={styles.comment}>
                      {comment.commenter.user_name} {comment.created_at}
                    </p>
                    <p>{comment.description}</p>
                    <button
                      className={styles.buttonless}
                      onClick={() => handleCommentEdit(comment.id)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.buttonless}
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul> */}
                <div>
                  <NewComment
                    className={styles.initComment}
                    addComment={addComment}
                  />
                  {issue.comment.map((comment) => (
                    <Comment
                      key={comment.id}
                      comment={comment}
                      onEdit={onEditComment}
                      onDeleteComment={handleCommentDelete}
                      // issue
                      // loadIssue
                    />
                  ))}
                </div>
              
                {/* <textarea
                  name="comment"
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add your comment here"
                /> */}
                {/* <button onClick={handleCommentSubmit}>Submit</button> */}
              </div>
              {/* <div className={styles.customButton}>
                <button type="submit" onClick={handleCommentSave}>
                  Save
                </button>
              </div> */}

              {/* <button type="button" onClick={handleDelete}>
            Delete
          </button> */}
            </form>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.floatRight}>
            <button
              className={styles.closeButton}
              // type="button"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className={styles.clearfix}></div>
          <p>Add to card</p>

          <button type="submit" onClick={handleEditClick}>
            Members
          </button>
          <Members
            issueMembers={issueMembers}
            isEditing={isEditing}
            handleAddMember={handleAddMember}
            projectMembers={projectMembers}
          />
          <button onClick={handleCategoryButtonClick}>Categories</button>
          <Categories
            selectedCategory={selectedCategory}
            changeCat={changeCat}
            handleAddMember={handleAddMember}
            categories={categories}
          />
        </div>
        <div className={styles.clearfix}></div>
      </div>
    </div>
  );
}

export default Dialog;
