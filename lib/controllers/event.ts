import { Request, Response } from "express";
import { prisma } from "../app";
import { Event } from "@prisma/client";

export class EventController{

    public async create(req: Request, res: Response) {
        try {
            let errors = await this.validation(req.body.data);
           
            if (errors.length > 0) {
                return res.json({status: "error", errors})
            }

            const event = req.body.data;
            const newEvent = await prisma.event.create({
                data: event
            });
            console.log("event", newEvent);
    
            return res.json({result: "success", data: newEvent});
        }
        catch (e) {
            return res.status(500).json({result: "error", error: e});
        }
       
    }

    async list(req: Request, res: Response) {
        let query: any = {
            select: {
                id: true,
                title: true
            }
        }
        if(req.query.page && req.query.take) {
            let skip = (+req.query.page * +req.query.take) - +req.query.take;
            query['skip'] = skip;
        }
        if(req.query.take) {
            query['take'] = +req.query.take;
        }

        const [count, events] = await prisma.$transaction([
            prisma.event.count(),
            prisma.event.findMany(query)
        ]);

        return res.json({data: events, total: count});
    }

    async read(req: Request, res: Response) {
        const event = await prisma.event.findFirst({
            where: {
                id: +req.params.id
            }
        });
        return res.json({data: event});
    }

    async update(req: Request, res: Response) {
        let errors = await this.validation(req.body.data);
           
        if (errors.length > 0) {
            return res.json({status: "error", errors})
        }

        try {
            const event = await prisma.event.update({
                where: {
                    id: +req.params.id
                },
                data: req.body.data
            });

            return res.json({result: "success", data: event});
        }
        catch (e) {
            return res.status(500).json({result: "error", error: e});
        }
    }

    private async validation(data: Event) {
        let errors: string[] = [];
            
        if (!data) {
            errors.push('Aucun evenement lié')
        }

        if (!(data.title && data.description.length > 2)) {
            errors.push('Veuillez mettre un titre') 
        }

        if (!(data.description && data.description.length > 10)) {
            errors.push('Veuillez mettre une description') 
        }

        if (!(data.address && data.address.length > 5)) {
            errors.push('Veuillez mettre une adresse')
        }

        if (!(data.date)) {
            errors.push('Veuillez mettre une date')
        }

        if (!(data.price && data.price > 0)) {
            errors.push('Veuillez mettre un prix valide')
        }

        if (!(data.eventTypeId)) {
            errors.push('Veuillez mettre un type')
        }
        else {
            const nb = await prisma.eventType.count({where: {id: data.eventTypeId}});
            if (nb === 0) {
                errors.push('Veuillez mettre un type valide');
            }
        }

        return errors;
    }

}