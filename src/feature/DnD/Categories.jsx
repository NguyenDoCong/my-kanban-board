import React, { useEffect, useState } from "react";
// import styles from "./Dialog.module.css";
import styles from "./css/Members.module.css";

function Categories({
  selectedCategory,
  changeCat,
  handleAddMember,
  categories,
  updateCat,
}) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  //   const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    // Khi issueMembers thay đổi, cập nhật selectedMembers thành mảng id của tất cả thành viên
    // const allMemberIds = issueMembers.map((member) => member.id);
    // setSelectedMembers(allMemberIds);
    // console.log("selectedCategory:",selectedCategory);
  }, []);

  const handleRadioChange = (category) => {
    updateCat(category);
    console.log("category:",category);
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
