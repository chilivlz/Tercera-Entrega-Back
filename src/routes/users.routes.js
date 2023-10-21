//Arreglar esto//

//Arreglar esto//

import { Router } from "express";
import { checkAdmin } from "../middlewares/auth.js";
import { usercontroler } from "../controller/user.controller.js";
import express from "express";

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

export const routerUser = express.Router();

usersRouter.get("/", usercontroler.getUser);

usersRouter.post("/", usercontroler.postUser);

usersRouter.put("/:uid", usercontroler.putUser);

usersRouter.delete("/:uid", usercontroler.deleteUser)

usersRouter.put("/premium/:uid", checkAdmin, usercontroler.toggleUserRole);



