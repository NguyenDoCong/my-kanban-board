import React, { useEffect, useState } from "react";
// import styles from "./Dialog.module.css";
import styles from "./css/Members.module.css";

function Categories({ selectedCategory, changeCat, handleAddMember, categories }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  //   const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    // Khi issueMembers thay đổi, cập nhật selectedMembers thành mảng id của tất cả thành viên
    // const allMemberIds = issueMembers.map((member) => member.id);
    // setSelectedMembers(allMemberIds);
    // console.log("selectedCategory:",selectedCategory);
  }, []);

  const handleRadioChange = (memberId) => {
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
      {changeCat && (
        <div className={styles.checkboxContainer}>
          {categories.map((category, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`category-${index}`}
                value={category}
                checked={selectedCategory.category_name === category}
                onChange={() => handleRadioChange(category)}
              />
              <label htmlFor={`category-${index}`}>{category}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
