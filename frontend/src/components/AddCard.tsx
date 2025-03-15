import React, { useState } from "react";

interface AddCardProps {
  onAddCard: (title: string, description?: string) => void;
}

const AddCard: React.FC<AddCardProps> = ({ onAddCard }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onAddCard(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className="add-card">
      <input
        type="text"
        placeholder="Add a card"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default AddCard;