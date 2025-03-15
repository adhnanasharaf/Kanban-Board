import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Get all lists for a board (ordered by position)
export const getListsByBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  try {
    const lists = await prisma.list.findMany({
      where: { boardId: Number(boardId) },
      orderBy: { position: "asc" }, // Ensure lists are in order
    });
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Error fetching lists" });
  }
};

// ✅ Create a new list with position handling
export const createList = async (req: Request, res: Response) => {
  const { boardId, title } = req.body;
  try {
    // Find the highest position in the board
    const lastList = await prisma.list.findFirst({
      where: { boardId: Number(boardId) },
      orderBy: { position: "desc" },
    });

    const newPosition = lastList ? lastList.position + 1 : 1;

    const newList = await prisma.list.create({
      data: { title, boardId: Number(boardId), position: newPosition },
    });

    res.status(201).json(newList);
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ error: "Error creating list" });
  }
};

// ✅ Update a list's title
export const updateList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedList = await prisma.list.update({
      where: { id: Number(id) },
      data: { title },
    });

    res.json(updatedList);
  } catch (error) {
    console.error("Error updating list:", error);
    res.status(500).json({ error: "Error updating list" });
  }
};

// ✅ Reorder lists (move a list to a new position)
export const reorderLists = async (req: Request, res: Response) => {
  const { boardId, listId, newPosition } = req.body;
  try {
    const lists = await prisma.list.findMany({
      where: { boardId: Number(boardId) },
      orderBy: { position: "asc" },
    });

    if (!lists.some((list: { id: number }) => list.id === Number(listId))) {
      return res.status(404).json({ error: "List not found in the board" });
    }

    interface List {
        id: number;
        position: number;
    }

    const updatedLists: List[] = await Promise.all(
        lists.map(async (list: List): Promise<List> => {
            let position = list.position;
            if (list.id === Number(listId)) {
                position = newPosition;
            } else if (list.position >= newPosition) {
                position += 1;
            }
            return prisma.list.update({
                where: { id: list.id },
                data: { position },
            });
        })
    );

    res.json(updatedLists);
  } catch (error) {
    console.error("Error reordering lists:", error);
    res.status(500).json({ error: "Error reordering lists" });
  }
};
