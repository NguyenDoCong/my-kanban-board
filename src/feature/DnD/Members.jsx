import React, { useEffect, useState } from "react";
// import styles from "./Dialog.module.css";
import styles from "./css/Members.module.css";

function Members({ issueMembers, isEditing, handleAddMember, projectMembers }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  //   const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    // Khi issueMembers thay đổi, cập nhật selectedMembers thành mảng id của tất cả thành viên
    const allMemberIds = issueMembers.map((member) => member.id);
    setSelectedMembers(allMemberIds);
  }, [issueMembers]);

  const handleCheckboxChange = (memberId) => {
    // Kiểm tra xem memberId đã được chọn chưa
    if (selectedMembers.includes(memberId)) {
      // Nếu đã được chọn, loại bỏ khỏi danh sách
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((id) => id !== memberId)
      );
    } else {
      // Nếu chưa được chọn, thêm vào danh sách
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        memberId,
      ]);
    }

    // Sử dụng hàm callback để đảm bảo selectedMembers đã được cập nhật
    setSelectedMembers((updatedSelectedMembers) => {
      //   console.log("Những người được chọn:", updatedSelectedMembers);

      const membersWithNames = updatedSelectedMembers.map((id) => {
        const member = projectMembers.find((member) => member.id === id);
        if (member) {
          return { id: member.id, user_name: member.user_name };
        }
        return null; // Handle the case where a member with the specified id is not found
      });
      console.log(membersWithNames);

      handleAddMember(membersWithNames);
      return updatedSelectedMembers;
    });
  };

  return (
    <div>
      {isEditing && (
        <div className={styles.checkboxContainer}>
          {projectMembers.map((member) => (
            <div key={member.id}>
              <input
                type="checkbox"
                id={`member-${member.id}`}
                value={member.id}
                checked={selectedMembers.includes(member.id)}
                onChange={() => handleCheckboxChange(member.id)}
              />
              <label htmlFor={`member-${member.id}`}>{member.user_name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Members;
