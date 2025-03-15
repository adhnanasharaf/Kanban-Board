import express from "express";
import { getBoards, createBoard, getBoardById } from "../controllers/boardController";

const router = express.Router();

router.get("/", getBoards);
router.post("/", createBoard);
router.get("/:id", getBoardById);

export { router as boardRoutes };