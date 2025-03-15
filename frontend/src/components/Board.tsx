import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import AddList from "./AddList";

interface BoardProps {
  board: {
    id: number;
    title: string;
    lists: any[];
  };
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const [lists, setLists] = useState<any[]>(board.lists);
  const [allCards, setAllCards] = useState<{ [listId: number]: any[] }>({});

  // Fetch cards for all lists when the board is loaded
  useEffect(() => {
    lists.forEach((list) => {
      axios.get(`http://localhost:5000/api/cards/${list.id}/cards`)
        .then((response) => {
          setAllCards((prev) => ({ ...prev, [list.id]: response.data as any[] }));
        })
        .catch((error) => console.error("Error fetching cards:", error));
    });
  }, [lists]);

  // Add a new list
  const handleAddList = (title: string) => {
    axios.post("http://localhost:5000/api/lists", { boardId: board.id, title })
      .then((response) => setLists([...lists, response.data]))
      .catch((error) => console.error("Error adding list:", error));
  };

  // Move a card to another list
  const handleMoveCard = (cardId: number, fromListId: number, toListId: number) => {
    axios.put(`http://localhost:5000/api/cards/${cardId}/move`, { listId: toListId })
      .then(() => {
        // Remove the card from the source list
        setAllCards((prev) => ({
          ...prev,
          [fromListId]: prev[fromListId].filter((card) => card.id !== cardId),
        }));
        // Add the card to the destination list (fetch updated cards for the destination list)
        axios.get(`http://localhost:5000/api/cards/${toListId}/cards`)
          .then((response) => {
            setAllCards((prev) => ({ ...prev, [toListId]: response.data as any[] }));
          })
          .catch((error) => console.error("Error fetching cards:", error));
      })
      .catch((error) => console.error("Error moving card:", error));
  };

  // Edit a card
  const handleEditCard = (cardId: number, title: string, description?: string) => {
    axios.put(`http://localhost:5000/api/cards/${cardId}`, { title, description })
      .then((response) => {
        setAllCards((prev) => ({
          ...prev,
          [(response.data as { listId: number }).listId]: prev[(response.data as { listId: number }).listId].map((card) =>
            card.id === cardId ? response.data : card
          ),
        }));
      })
      .catch((error) => console.error("Error editing card:", error));
  };

  // Delete a card
  const handleDeleteCard = (cardId: number) => {
    // Find the list that contains the card being deleted
    const listId = Object.keys(allCards).find((listId) =>
      allCards[parseInt(listId)].some((card) => card.id === cardId)
    );

    if (listId) {
      axios.delete(`http://localhost:5000/api/cards/${cardId}`)
        .then(() => {
          // Remove the card from the list
          setAllCards((prev) => ({
            ...prev,
            [parseInt(listId)]: prev[parseInt(listId)].filter((card) => card.id !== cardId),
          }));
        })
        .catch((error) => console.error("Error deleting card:", error));
    }
  };

  return (
    <div className="board">
      <h2>{board.title}</h2>
      <div className="lists">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            boardLists={lists}
            cards={allCards[list.id] || []}
            onMoveCard={(cardId, toListId) => handleMoveCard(cardId, list.id, toListId)}
            onEditCard={handleEditCard}
            onDeleteCard={handleDeleteCard}
          />
        ))}
        <AddList boardId={board.id} onAddList={handleAddList} />
      </div>
    </div>
  );
};

export default Board;