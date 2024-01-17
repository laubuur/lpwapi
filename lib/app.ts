import express from "express";
import cors from "cors";
import { Routes } from "./http/routes";
import ViteExpress from "vite-express";
import { authMiddleware } from "./http/middleware/auth";
import { PrismaClient } from '@prisma/client';

class App {
    private readonly port = 4500;
    private app = express();

    constructor() {
        this.config();
        this.startServer();
    }

    private async config() {
        this.app.use(cors());
        this.app.use(express.json({ limit: "250mb" }));
        // this.app.use(bodyParser.json({ limit: "250mb"}));
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: true, limit: "250mb" }));
      //  this.app.use(authMiddleware);
        Routes.buildRoutes(this.app);
    }

    private startServer() {
        ViteExpress.listen(this.app, this.port, () => console.log("Server is listening..."));
    }
}

export const prisma = new PrismaClient();

new App();