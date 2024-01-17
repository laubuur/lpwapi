import { Request, Response, Express } from "express";
import { prisma }  from "../app";
import { json } from "stream/consumers";
import { EventTypeController } from "../controllers/eventType";

export class Routes {

    public static buildRoutes(app: Express) {

        app.route('/').get((req: Request, res: Response) => {
            res.json({result: "success"})
        })

        app.route('/bonjour').get((req: Request, res: Response) => {
            res.json({'content': 'Hello world, vous voyez c\'est pas si compliqué.'});
        })

        app.route('/bonjour').post((req: Request, res:Response) => {
            const body = req.body.prenom;
            res.json({'content': 'Ha salut ! Tu t\'appelles '+body});
        })

        app.route('/test').get(async (req: Request, res: Response) => {
            try {
                const user = await prisma.user.create({
                    data: {
                        name: 'Alice',
                        email: 'alice@prisma.iosdsd',
                      },
                });
                return res.json(user);
            }
            catch (e) {
                return res.json({"error": e});
            }
            
        });

        app.route('/george').post((req: Request, res: Response) => {
            console.log(req.query);
            let password = req.body.password;
            let login = req.body.login;
            console.log(password + ' - ' + login);
            return res.json({});
        });

        app.route('/eventType').post((req: Request, res: Response) => {
            const controller = new EventTypeController();
            controller.create(req, res);
        });

        app.route('/eventType').get((req: Request, res: Response) => {
            const controller = new EventTypeController();
            controller.list(req, res);
        })

        app.route('/eventType/:id').delete((req: Request, res: Response) => {
            const controller = new EventTypeController();
            controller.remove(req, res);
        })

    }
}