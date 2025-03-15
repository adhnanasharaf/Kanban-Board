import React, { useState } from "react";

interface CardProps {
  card: {
    id: number;
    title: string;
    description?: string;
  };
  onEdit: (cardId: number, title: string, description?: string) => void;
  onDelete: (cardId: number) => void;
  onMove: (cardId: number, newListId: number) => void;
  boardLists: any[]; // Lists in the current board (excluding the current list)
}

const Card: React.FC<CardProps> = ({ card, onEdit, onDelete, onMove, boardLists }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");

  const handleSave = () => {
    onEdit(card.id, title, description);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <h4>{card.title}</h4>
          <p>{card.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(card.id)}>Delete</button>
          <select
            defaultValue="" // Ensure no option is pre-selected
            onChange={(e) => {
              const newListId = parseInt(e.target.value);
              if (newListId) {
                onMove(card.id, newListId);
              }
            }}
          >
            {/* Placeholder option */}
            <option value="" disabled>
              Move to...
            </option>
            {/* List options */}
            {boardLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default Card;