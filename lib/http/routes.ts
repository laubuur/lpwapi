import { Request, Response, Express } from "express";
import  { api, prisma }  from "../app";

export class Routes {

    public static buildRoutes(app: Express) {

        app.route('/').get((req: Request, res: Response) => {
            res.json({result: "success"})
        })

        app.route('/test').get(async (req: Request, res: Response) => {
            const user = await prisma.user.create({
                data: {
                    name: 'Alice',
                    email: 'alice@prisma.io',
                  },
            });
            return res.json(user);
        })
    }
}