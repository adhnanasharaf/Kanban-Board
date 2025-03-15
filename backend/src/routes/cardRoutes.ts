import express from "express";
import { getCardsByList, createCard, updateCard, deleteCard, moveCard } from "../controllers/cardController";

const router = express.Router();

router.get("/:listId/cards", getCardsByList);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);
router.put("/:id/move", moveCard);

export { router as cardRoutes };