import express from "express";
import { getListsByBoard, createList, updateList } from "../controllers/listController";

const router = express.Router();

//  GET lists for a specific board
router.get("/:boardId/lists", getListsByBoard);

//  Create a new list
router.post("/", createList);

//  Update a list
router.put("/:id", updateList);

export { router as listRoutes };
