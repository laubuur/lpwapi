import { Request, Response } from "express";
import { prisma } from "../app";
import { json } from "stream/consumers";

export class EventTypeController {
    
    async create(req: Request, res: Response) {

        if (!(req.body.eventType && req.body.eventType.length > 0)) {
            return res.json({status: 'error', data: 'Veuillez encoder un eventType valide'});
        }

        try {
            const type = await prisma.eventType.create({
                data: {
                    name: req.body.eventType
                }
            });
            return res.json({status: 'success', data: type});
        }
        catch (e) {
            return res.status(500).json({status: 'error', data: "error"});
        }
    }

    async list(req: Request, res: Response) {
        const types = await prisma.eventType.findMany({});
        return res.json({data: types});
    }

    async remove(req: Request, res: Response) {
        try {
            const id = +req.params.id;
            let result = await prisma.eventType.delete({
                where: {
                    id: id
                }
            })
            return res.json({result: result});
        }
        catch (e) {
            return res.status(500).json({status: 'error', data: "error"});
        }
    }

}