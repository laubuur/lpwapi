import { Request, Response } from "express";
import  { prisma }  from "../app";
export class UserController {

    private db = prisma;

    public async create(req: Request, res: Response) {
        const db = prisma;
        const user = await db.user.create({
            data: {
                name: 'Alice',
                email: 'alice@prisma.io',
              },
        });
        return res.json(user);
    }
}