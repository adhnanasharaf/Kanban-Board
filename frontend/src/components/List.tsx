import React from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import axios from 'axios';


interface ListProps {
  list: {
    id: number;
    title: string;
  };
  boardLists: any[]; // All lists in the current board
  cards: any[]; // Cards for the current list
  onMoveCard: (cardId: number, toListId: number) => void; // Callback for moving cards
  onEditCard: (cardId: number, title: string, description?: string) => void; // Callback for editing cards
  onDeleteCard: (cardId: number) => void; // Callback for deleting cards
}

const List: React.FC<ListProps> = ({
  list,
  boardLists,
  cards,
  onMoveCard,
  onEditCard,
  onDeleteCard,
}) => {
  // Add a new card
  const handleAddCard = (title: string, description?: string) => {
    axios.post("http://localhost:5000/api/cards", { listId: list.id, title, description })
      .then((response) => {
        onMoveCard((response.data as { id: number }).id, list.id); // Update the state in the parent component
      })
      .catch((error) => console.error("Error adding card:", error));
  };

  return (
    <div className="list">
      <h3>{list.title}</h3>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onEdit={onEditCard}
          onDelete={onDeleteCard}
          onMove={(cardId, toListId) => onMoveCard(cardId, toListId)}
          boardLists={boardLists.filter((l) => l.id !== list.id)} // Exclude the current list
        />
      ))}
      <AddCard onAddCard={handleAddCard} />
    </div>
  );
};

export default List;

