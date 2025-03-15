import React, { useState, useEffect } from "react";
import axios from "axios";
import BoardView from "./components/BoardView";
import "./styles.css";

const App: React.FC = () => {
  const [boards, setBoards] = useState<any[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const [lists, setLists] = useState<any[]>([]);

  // Fetch all boards
  useEffect(() => {
    axios.get<any[]>("http://localhost:5000/api/boards")
      .then((response) => {
        console.log("Boards fetched:", response.data);
        setBoards(response.data);
      })
      .catch((error) => console.error("Error fetching boards:", error));
  }, []);

  // Handle board selection
  const handleSelectBoard = (boardId: number) => {
    // Set the selected board
    const board = boards.find((board) => board.id === boardId);
    setSelectedBoard(board);

    // Fetch lists for the selected board
    axios.get<any[]>(`http://localhost:5000/api/lists/${boardId}/lists`)
      .then((response) => {
        console.log("Lists fetched:", response.data);
        setLists(response.data);
      })
      .catch((error) => console.error("Error fetching lists:", error));
  };

  // Handle adding a new list
  const handleAddList = (newList: any) => {
    setLists([...lists, newList]); // Update the lists state in real-time
  };

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <div className="container">
        <div className="sidebar">
          <h2>Boards</h2>
          <ul>
            {boards.map((board) => (
              <li key={board.id} onClick={() => handleSelectBoard(board.id)}>
                {board.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="main-content">
          {selectedBoard ? (
            <BoardView board={selectedBoard} lists={lists} onAddList={handleAddList} />
          ) : (
            <div>Select a board to view its lists and cards.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;