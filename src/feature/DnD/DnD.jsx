import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import styles from "./DetailedProject.module.css";
import Dialog from "./Dialog.jsx";
// import CreateDialog from "./CreateDialog.jsx";
// import { fetchIssues } from "./api/index.js";
// import { createIssue } from "./api/createIssue.js";
// import { deleteIssue } from "./api/deleteIssue.js";
// import { changeStatus } from "./api/dragDrop.js";
// import { getIssue } from "./api/getIssue.js";
// import { changeIssue } from "./api/changeIssue.js";
// import { useLocation } from "react-router-dom";
// import { createComment } from "./api/createComment.js";
// // import { selectUser } from "../Authentication/AuthSlice/userSlice.js";
// // import { useSelector } from "react-redux";
// import { getMembers } from "./api/getMembers.js";
// import { getCategories } from "./api/getCategories.js";
// import { removeComment } from "./api/removeComment.js";
// import { getPrjName } from "./api/getPrjName.js";
// import { searchNewMember } from "./api/searchNewMember.js";
// // import { addPrjMem } from "./api/addPrjMem.js";
// import { editComment } from "./api/editComment.js";
import Snackbar from "./SnackBar.jsx";
import styles from "./css/DnD.module.css";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 6;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#282828",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, itemCount) => ({
  background: isDraggingOver ? "lightblue" : "black",
  padding: grid,
  width: 200,
  // height: itemCount * 140, // Điều chỉnh chiều cao dựa trên số lượng Draggable
});

function DnD() {
  // const location = useLocation();
  // const prjId = location.pathname.substring(18);

  // const [prjName, setPrjName] = useState();

  // getPrjName(prjId).then((res) => {
  //   // console.log("New res: ", res)
  //   setPrjName(res.project_name);
  // });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleShowSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  const [statusInfo, setStatusInfo] = useState(null);

  const [selectedIssue, setSelectedIssue] = useState(null);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  const projectMembers = [
    {
      id: 101,
      user_name: "CongND",
      full_name: null,
      email: "demo1@gmail.com",
      created_at: "2023-11-01T08:53:57.222674+07:00",
      role: 3,
    },
    {
      id: 102,
      user_name: "DuyVV",
      full_name: null,
      email: "demo2@gmail.com",
      created_at: "2023-11-01T08:53:57.222674+07:00",
      role: 1,
    },
    {
      id: 103,
      user_name: "LamHT",
      full_name: null,
      email: "demo3@gmail.com",
      created_at: "2023-11-01T08:53:57.222674+07:00",
      role: 2,
    },
  ];

  const [members, setMembers] = useState(projectMembers);

  // const loadMembers = () => {
  //   getMembers(prjId).then((res) => {
  //     // console.log("New res: ", res);
  //     setMembers(res);
  //   });
  // };

  const [newMembers, setNewMembers] = useState([]);

  // const loadNewMembers = () => {
  //   searchNewMember(prjId).then((res) => {
  //     // console.log("New res: ", res);
  //     setNewMembers(res);
  //   });
  // };

  const [selectedNewMember, setSelectedNewMember] = useState([]);

  const cat = {
    id: 101,
    avatar_url: null,
    project_name: "demo_project_1",
    description: null,
    client: null,
    budget: null,
    start_date: "2023-11-01T08:53:57.222674+07:00",
    end_date: null,
    created_by: [
      {
        id: 101,
        user_name: "demo1",
      },
    ],
    assigned_to: [
      {
        id: 102,
        user_name: "demo2",
      },
    ],
    category: ["Task", "Bug", "Suggestion", "Feature", "Others"],
    member: [
      {
        id: 103,
        user_name: "demo3",
      },
      {
        id: 102,
        user_name: "demo2",
      },
      {
        id: 101,
        user_name: "demo1",
      },
    ],
  };

  const [categories, setCategories] = useState(cat.category);

  // const loadCategories = () => {
  //   getCategories(prjId).then((res) => {
  //     //   console.log("New res: ", res);
  //     setCategories(res);
  //   });
  // };

  const detailedInfo = {
    id: 102,
    status: {
      status_name: "Open",
    },
    category: {
      category_name: "Bug",
    },
    created_by: {
      id: 101,
      user_name: "CongND",
    },
    updated_by: {
      id: 103,
      user_name: "LamHT",
    },
    priority: "Me",
    issue_name: "thêm chức năng xóa comment",
    comment: [
      {
        id: 196,
        commenter: {
          id: 101,
          user_name: "CongND",
        },
        description: "Chạy bộ test và sửa lỗi",
        created_at: "2023-11-01T08:53:57.222674+07:00",
        updated_at: null,
        commented_issue: 102,
      },
      {
        id: 197,
        commenter: {
          id: 102,
          user_name: "DuyVV",
        },
        description: "đồng bộ lại giao diện",
        created_at: "2023-11-01T08:53:57.222674+07:00",
        updated_at: null,
        commented_issue: 102,
      },
      {
        id: 198,
        commenter: {
          id: 103,
          user_name: "LamHT",
        },
        description: "Thêm chức năng lọc và tìm kiếm",
        created_at: "2023-11-01T08:53:57.222674+07:00",
        updated_at: null,
        commented_issue: 102,
      },
    ],
    members: [
      {
        id: 103,
        user_name: "LamHT",
      },
      {
        id: 102,
        user_name: "DuyVV",
      },
    ],
    summary: null,
    description: null,
    created_at: "2023-11-01T08:53:57.222674+07:00",
    start_at: null,
    updated_at: "2023-11-22T10:12:25.262226+07:00",
    end_date: null,
    estimate_time: 10,
    current_duration: 10,
    project: 101,
  };

  const [detailedIssue, setDetailedIssue] = useState(
    // {}
    detailedInfo
  );

  // setDetailedIssue(detailedInfo);

  // const loadIssue = async (id) => {
  //   await getIssue(id).then((res) => {
  //     // console.log("loadIssue: ", res);
  //     setDetailedIssue(res);
  //     // console.log("detailedIssue:",detailedIssue);
  //   });
  // };

  useEffect(() => {
    // console.log("detailedIssue:", detailedIssue);
  }, [detailedIssue]);

  // const loadData = () => {
  //   fetchIssues(prjId).then((res) => {
  //     // console.log("New res: ", res)
  //     setState(res);
  //   });
  // };

  const [issueMembers, setIssueMembers] = useState([]);

  useEffect(() => {
    // loadData();
    // loadMembers();
    // loadCategories();
    // loadNewMembers();
    setIssueMembers(detailedIssue.members);
  }, []);

  // const [selectedCategory, setSelectedCategory] = useState();

  // useEffect(() => {
  //   // loadData();
  //   // loadMembers();
  //   // loadCategories();
  //   // loadNewMembers();
  //   setSelectedCategory(detailedIssue.category);
  // }, []);

  useEffect(() => {
    // console.log(issueMembers); // Log giá trị mới sau khi cập nhậ
    // const member_id_list = issueMembers.map((member) => member.id);
  }, [issueMembers]);

  const addMember = (newMember) => {
    // console.log("member_id_list:",member_id_list);
    // //
    // changeIssue
  };

  const [addIssue, setAddIssue] = useState();
  const handleAddIssue = (e) => {
    setAddIssue(e.target.value);
  };

  // const addIssue = async (prjId, issueName, catId, summary, status_id) => {
  //   // console.log("trc goi api:", prjId, issueName, catId, summary, status_id);
  //   await createIssue(prjId, issueName, catId, summary, status_id);
  //   loadData();
  // };

  // const removeIssue = async (issueId) => {
  //   await deleteIssue(issueId);
  //   loadData();
  // };

  const [snackBarMessage, setSnackBarMessage] = useState();

  // const updateIssue = async (
  //   issueId,
  //   description,
  //   assigned_to_id,
  //   category_id,
  //   newComment,
  //   member_id_list
  // ) => {
  //   try {
  //     await changeIssue(
  //       issueId,
  //       description,
  //       assigned_to_id,
  //       category_id,
  //       newComment,
  //       member_id_list
  //     );
  //     setSnackBarMessage("Successfully saved");
  //     loadIssue(selectedIssue.id);
  //   } catch (error) {
  //     setSnackBarMessage("Failed to save changes");
  //   }
  // };

  const addComment = (currentTime, editedText) => {
    const newComment = {
      id: Math.max(...detailedIssue.comment.map((comment) => comment.id), 0) + 1,
      commenter: {
        user_name: "CongND",
      },
      description: editedText,
      created_at: currentTime.toISOString(),
      updated_at: null,
      commented_issue: 102,
    };

    // Tạo một bản sao của detailedIssue và thêm comment mới vào mảng comment
    const updatedDetailedIssue = {
      ...detailedIssue,
      comment: [...detailedIssue.comment, newComment],
    };

    // Cập nhật state với detailedIssue mới
    setDetailedIssue(updatedDetailedIssue);
    // await createComment(issueId, newComment);
    // loadIssue(selectedIssue.id);
  };

  const changeSummary = (editedText) => {
    const updatedDetailedIssue = {
      ...detailedIssue,
      summary: editedText,
    };

    // Cập nhật state với detailedIssue mới
    setDetailedIssue(updatedDetailedIssue);
  }

  useEffect(() => {
    // console.log(issueMembers); // Log giá trị mới sau khi cập nhậ
    // const member_id_list = issueMembers.map((member) => member.id);
  }, [detailedIssue]);
  // const updateComment = async (id, commentId) => {
  //   await editComment(id, commentId);
  //   loadIssue(selectedIssue.id);
  // };

  // const updateCategory = async (id, category_id) => {
  //   await changeIssue(id, category_id);
  //   loadIssue(selectedIssue.id);
  // };

  // const deleteComment = async (commentId) => {
  //   await removeComment(commentId);
  //   loadData();
  // };

  const handleCreateButtonClick = (droppableId) => {
    // console.log(prjId);
    setStatusInfo(droppableId);
    setIsCreateDialogOpen(true);
  };

  const handleCancelClick = () => {
    // console.log(prjId);
    // setStatusInfo(droppableId);
    setIsCreateDialogOpen(false);
    setOpenDroppable(null);
  };

  const handleIssueClick = async (issue) => {
    setSelectedIssue(issue);
    // console.log(issue);

    // await loadIssue(issue.id);
    setIsDialogOpen(true);
  };

  // const handleAddPrjMem = async (member) => {
  //   // setSelectedIssue(issue);
  //   // console.log(issue);
  //   await addPrjMem(member);

  //   // await loadIssue(issue.id);
  //   // setIsDialogOpen(true);
  // };
  const data = {
    Open: [
      {
        id: 102,
        issue_name: "thêm chức năng xóa comment",
        status: {
          status_name: "Open",
        },
        category: {
          category_name: "Bug",
        },
        summary: null,
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 103,
          user_name: "LamHT",
        },
      },
    ],
    "In Progress": [
      {
        id: 104,
        issue_name: "gửi thay đổi sang backend",
        status: {
          status_name: "In Progress",
        },
        category: {
          category_name: "Feature",
        },
        summary: null,
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 102,
          user_name: "DuyVV",
        },
      },
      {
        id: 106,
        issue_name: "thêm, xóa thành viên cho issue",
        status: {
          status_name: "In Progress",
        },
        category: {
          category_name: "Task",
        },
        summary: null,
        created_by: {
          id: 102,
          user_name: "DuyVV",
        },
        updated_by: null,
      },
    ],
    Reopen: [
      {
        id: 108,
        issue_name: "hiện thông báo sau khi sửa",
        status: {
          status_name: "Reopen",
        },
        category: {
          category_name: "Suggestion",
        },
        summary: null,
        created_by: {
          id: 103,
          user_name: "LamHT",
        },
        updated_by: {
          id: 101,
          user_name: "CongND",
        },
      },
      {
        id: 107,
        issue_name: "sửa giao diện dialogue",
        status: {
          status_name: "Reopen",
        },
        category: {
          category_name: "Bug",
        },
        summary: null,
        created_by: {
          id: 103,
          user_name: "LamHT",
        },
        updated_by: {
          id: 101,
          user_name: "CongND",
        },
      },
    ],
    "Resolved ": [
      {
        id: 109,
        issue_name: "Resize lại image nhận về",
        status: {
          status_name: "Resolved ",
        },
        category: {
          category_name: "Feature",
        },
        summary: "Resize image",
        created_by: {
          id: 103,
          user_name: "LamHT",
        },
        updated_by: {
          id: 101,
          user_name: "CongND",
        },
      },
    ],
    Closed: [
      {
        id: 112,
        issue_name: "create search issue",
        status: {
          status_name: "Closed",
        },
        category: {
          category_name: "Suggestion",
        },
        summary: "create search issue",
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 101,
          user_name: "CongND",
        },
      },
      {
        id: 103,
        issue_name: "hiển thị danh sách thành viên lên giao diện",
        status: {
          status_name: "Closed",
        },
        category: {
          category_name: "Suggestion",
        },
        summary: null,
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 102,
          user_name: "DuyVV",
        },
      },
    ],
    Archive: [
      {
        id: 105,
        issue_name: "fix lỗi sửa issue",
        status: {
          status_name: "Archive",
        },
        category: {
          category_name: "Others",
        },
        summary: null,
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 102,
          user_name: "DuyVV",
        },
      },
      {
        id: 111,
        issue_name: "create search issue",
        status: {
          status_name: "Archive",
        },
        category: {
          category_name: "Bug",
        },
        summary: "create search issue",
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 101,
          user_name: "CongND",
        },
      },
      {
        id: 110,
        issue_name: "updated",
        status: {
          status_name: "Archive",
        },
        category: {
          category_name: "Task",
        },
        summary: "summary",
        created_by: {
          id: 103,
          user_name: "LamHT",
        },
        updated_by: {
          id: 103,
          user_name: "LamHT",
        },
      },
      {
        id: 101,
        issue_name: "updated",
        status: {
          status_name: "Archive",
        },
        category: {
          category_name: "Task",
        },
        summary: "summary",
        created_by: {
          id: 101,
          user_name: "CongND",
        },
        updated_by: {
          id: 103,
          user_name: "LamHT",
        },
      },
    ],
    // ,
    // category: [
    //   {
    //     id: 1,
    //     category_name: "Task",
    //   },
    //   {
    //     id: 2,
    //     category_name: "Bug",
    //   },
    //   {
    //     id: 3,
    //     category_name: "Suggestion",
    //   },
    //   {
    //     id: 4,
    //     category_name: "Feature",
    //   },
    //   {
    //     id: 5,
    //     category_name: "Others",
    //   },
    // ],
  };

  const [state, setState] = useState(
    // []
    data
  );

  useEffect(() => {
    // console.log(issueMembers); // Log giá trị mới sau khi cập nhậ
  }, [state]);

  // useEffect(() => { if (data) { setState(data) } }, [data]);
  // const projectMembers = projectMembersData.projectMembers; // Sử dụng dữ liệu từ projectMembersData

  const convertValue = (value) => {
    switch (value) {
      case "Open":
        return 1;
      case "In Progress":
        return 2;
      case "Reopen":
        return 3;
      case "Resolved ":
        return 4;
      case "Closed":
        return 5;
      case "Archive":
        return 6;
      default:
        return value;
    }
  };

  //   let user = useSelector(selectUser);

  // const [assignedMember, setAssignedMember] = useState("");

  function onDragEnd(result) {
    const { source, destination } = result;
    // getIssue(result.draggableId).then(res => {
    //     // console.log("New res: ", res)
    //     // setAssignedMember(res.assigned_to.id.toString());

    // });

    // console.log("status_id:", convertValue(destination.droppableId));
    // changeStatus(result.draggableId, convertValue(destination.droppableId));

    if (!destination) {
      return;
    }

    const sourceDroppable = source.droppableId;
    const destinationDroppable = destination.droppableId;

    if (sourceDroppable === destinationDroppable) {
      // if (state[sourceDroppable] && state[sourceDroppable].items)
      {
        const items = reorder(
          state[sourceDroppable],
          source.index,
          destination.index
        );
        const newState = { ...state };
        newState[sourceDroppable] = items;
        setState(newState);
      }
    } else {
      // if (state[sourceDroppable]
      //     && state[sourceDroppable].items
      //     && state[destinationDroppable]
      //     && state[destinationDroppable].items
      // )
      {
        const result = move(
          state[sourceDroppable],
          state[destinationDroppable],
          source,
          destination
        );

        // console.log(state[sourceDroppable].items);

        const newState = { ...state };
        newState[sourceDroppable] = result[sourceDroppable];
        newState[destinationDroppable] = result[destinationDroppable];
        setState(newState);
      }
    }

    // setStatusInfo({
    //     itemId: result.draggableId,
    //     destinationDroppable,
    // });
    // loadData();
  }

  const [openDroppable, setOpenDroppable] = useState(null);

  return (
    <div className={styles.page}>
      <div className={styles.Container}>
        <div className={styles.topBar}>
          {/* <h1>{prjName}</h1>
        {members.map((member, index) => (
          <span key={member.id}>
            {member.member.user_name}
            {index < members.length - 1 ? ", " : ""}
          </span>
        ))} */}

          {/* <select
          onChange={(e) => {
            const memberId = e.target.value;

            const selected = newMembers.find(
              (member) => member.member.id == memberId
            );
            setSelectedNewMember(selected.member);
          }}
        >
          {newMembers.map((member) => (
            <option key={member.member.id} value={member.member.id}>
              {member.member.user_name}
            </option>
          ))}
        </select> */}
          {/* <button onClick={handleAddPrjMem(selectedNewMember)}>Add</button> */}
        </div>

        <div style={{ display: "flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {/* {[1, 2, 3, 4, 5].map((ind) => ( */}
            {Object.entries(state).map(([status, items], ind) => (
              <Droppable key={ind} droppableId={status}>
                {(provided, snapshot) => (
                  <div className={styles.droppable}>
                    <div
                      ref={provided.innerRef}
                      className={styles.listContainer}
                      // style={getListStyle(snapshot.isDraggingOver, state[`droppable${ind}`].items.length)}
                      style={getListStyle(
                        snapshot.isDraggingOver,
                        items.length
                      )}
                      {...provided.droppableProps}
                    >
                      {/* <h3>{state[`droppable${ind}`].title}</h3>  */}
                      {/* Hiển thị title */}
                      <h3>{status}</h3>

                      {/* {state[`droppable${ind}`].items.map((item, index) => ( */}
                      {items.map((item, index) => (
                        <Draggable
                          key={item.id.toString()}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {/* <Draggable key={item.id} draggableId={item.id} index={index}> */}
                          {(provided, snapshot) => (
                            <div
                              className={styles.issue}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <div
                                key={item.id}
                                onClick={() => handleIssueClick(item)}
                              >
                                {item.issue_name}
                                <div>
                                  {/* <p>
                                    Assigned Member: {item.assigned_to.user_name}
                                  </p> */}
                                  {/* <ul>
                                                                    {item.teamMembers && item.teamMembers.map((member) => (
                                                                        <li key={member.id}>{member.name}</li>
                                                                    ))}
                                                                </ul> */}
                                </div>

                                {/* {item.category && item.category.category_name}
                                <br></br> */}
                                {/* {item.summary} */}
                                {/* {item.description} */}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {/* <button onClick={() => handleCreateIssue(`droppable${ind}`)}>+ Add Issue</button> */}
                      <div>
                        {openDroppable === status ? (
                          <div>
                            <textarea
                              className={styles.thistextarea}
                              value={addIssue}
                              placeholder="Enter a title for this issue"
                              onChange={handleAddIssue}
                            />
                            <button onClick={handleCreateButtonClick}>
                              Add
                            </button>
                            <button onClick={handleCancelClick}>X</button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={() => {
                                setOpenDroppable(status);
                                // Add any other logic you need when opening the textarea
                              }}
                            >
                              + Add Issue
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
        <Dialog
          show={isDialogOpen}
          onClose={closeDialog}
          projectMembers={members}
          categories={categories}
          issueMembers={issueMembers}
          onAddMember={addMember}
          issue={detailedIssue}
          // selectedCategory={selectedCategory}
          // onDeleteIssue={removeIssue}
          // onUpdateIssue={updateIssue}
          onAddComment={addComment}
          // currentUser={user}
          // prjId={prjId}
          // detailedIssue={detailedIssue}
          // // droppableId={droppableId}
          // // onLogin={handleLogin}
          // onDeleteComment={deleteComment}
          // onEditComment={updateComment}
          onShowSnackbar={handleShowSnackbar}
          // onUpdateCategory={updateCategory}
          changeSummary={changeSummary}
        />

        <div>
          {showSnackbar && (
            <Snackbar message={snackBarMessage} duration={3000} />
          )}
          {/* {draggedItemInfo && (
                    <p>
                        Item ID: {draggedItemInfo.itemId}, Destination Droppable: {draggedItemInfo.destinationDroppable}
                    </p>
                )} */}

          {/* Các phần khác trong JSX */}
        </div>
      </div>
    </div>
  );
}

export default DnD;
