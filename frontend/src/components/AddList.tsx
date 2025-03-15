import React, { useState } from "react";
import axios from "axios";

interface AddListProps {
  boardId: number;
  onAddList: (newList: any) => void;
}

const AddList: React.FC<AddListProps> = ({ boardId, onAddList }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      // Call the API to create a new list
      axios.post("http://localhost:5000/api/lists", { boardId, title })
        .then((response) => {
          onAddList(response.data); // Notify the parent component
          setTitle(""); // Clear the input
        })
        .catch((error) => console.error("Error adding list:", error));
    }
  };

  return (
    <div className="add-list">
      <input
        type="text"
        placeholder="Add a list"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddList;