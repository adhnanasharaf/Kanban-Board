import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBoards = async (req: Request, res: Response) => {
  const boards = await prisma.board.findMany();
  res.json(boards);
};

export const createBoard = async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await prisma.board.create({ data: { title } });
  res.json(board);
};

export const getBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const board = await prisma.board.findUnique({ where: { id: Number(id) } });
  res.json(board);
};