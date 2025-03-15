import express from "express";
import { boardRoutes } from "./routes/boardRoutes";
import { listRoutes } from "./routes/listRoutes";
import { cardRoutes } from "./routes/cardRoutes";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function localCors(): any {
    throw new Error("Function not implemented.");
}

