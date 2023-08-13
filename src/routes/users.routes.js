//Arreglar esto//

import { Router } from "express";
import { use } from "passport";
import { usercontroler } from "../controller/user.controller.js";
import { UserModel } from "../DAO/mongo/models/users.moongose.js";
const express = require("express");

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

export const routerUser = express.Router();

usersRouter.get("/", usercontroler.getUser);

usersRouter.post("/", usercontroler.postUser);

usersRouter.put("/:uid", usercontroler.putUser);

usersRouter.delete("/:uid", usercontroler.deleteUser)


