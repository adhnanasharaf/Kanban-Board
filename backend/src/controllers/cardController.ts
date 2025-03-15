import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all cards in a list
export const getCardsByList = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const cards = await prisma.card.findMany({
      where: { listId: Number(listId) },
      orderBy: { position: "asc" }, // Ensure correct ordering
    });
    res.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new card
export const createCard = async (req: Request, res: Response) => {
  try {
    const { listId, title, description } = req.body;

    // Get the last card in the list to determine position
    const lastCard = await prisma.card.findFirst({
      where: { listId: Number(listId) },
      orderBy: { position: "desc" },
    });

    // Set the next position
    const newPosition = lastCard ? lastCard.position + 1 : 1;

    const card = await prisma.card.create({
      data: {
        title,
        description,
        listId: Number(listId),
        position: newPosition, // Ensure position is included
      },
    });

    res.json(card);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a card
export const updateCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const card = await prisma.card.update({
      where: { id: Number(id) },
      data: { title, description },
    });

    res.json(card);
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a card
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.card.delete({ where: { id: Number(id) } });

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Move a card to another list
export const moveCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { listId } = req.body;

    const card = await prisma.card.update({
      where: { id: Number(id) },
      data: { listId: Number(listId) },
    });

    res.json(card);
  } catch (error) {
    console.error("Error moving card:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
