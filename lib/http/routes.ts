import { Request, Response, Express } from "express";
import { EventTypeController } from "../controllers/eventType";
import { EventController } from "../controllers/event";

export class Routes {

    private static eventTypeController = new EventTypeController();
    private static eventController = new EventController();

    public static buildRoutes(app: Express) {

        app.route('/').get((req: Request, res: Response) => {
            res.json({result: "success"})
        });

        app.route('/eventType').post((req: Request, res: Response) => {
            this.eventTypeController.create(req, res);
        });

        app.route('/eventType').get((req: Request, res: Response) => {
            this.eventTypeController.list(req, res);
        });

        app.route('/eventType/:id').delete((req: Request, res: Response) => {
            this.eventTypeController.remove(req, res);
        });

        app.route('/event').post((req: Request, res: Response) => {
            this.eventController.create(req, res);
        });

        app.route('/event').get((req: Request, res: Response) => {
            this.eventController.list(req, res);
        });

        app.route('/event/:id').get((req: Request, res: Response) => {
            this.eventController.read(req, res);
        });

        app.route('/event/:id').post((req: Request, res: Response) => {
            this.eventController.update(req, res);
        })

    }
}