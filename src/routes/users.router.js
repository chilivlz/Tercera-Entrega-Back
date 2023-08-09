//Arreglar esto//

import { Router } from "express";
import { UserModel } from "../DAO/models/users.model.js";
const express = require("express");

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

export const routerUser = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send({ result: "success", payload: users });
  } catch (error) {
    res.send({ result: "cannot get users with mongose" });
  }
});

usersRouter.post("/", async (req, res) => {
  let { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    res.send({
      status: "error",
      error: "cannot create with missing fields",
    });
  }

  let result = await UserModel.create({ firstName, lastName, email });

  res.send({ status: "success", payload: result });
});
usersRouter.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  let userToReplace = req.body;
  if (
    !userToReplace.firstName ||
    !userToReplace.lastName ||
    !userToReplace.email
  ) {
    res.send({
      status: "error",
      error: "cannot update user with missing fields",
    });
  }

  let result = await UserModel.updateOne({ _id: uid }, userToReplace);
  res.send({ status: "success", payload: result });
});

usersRouter.delete("/:uid", async (req, res) => {
  let { uid } = req.params;
  let result = await UserModel.deleteOne({ _id: uid });
  res.send({ status: "success, payload: result" });
});

/*routerUser.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const userUptaded = await UserModel.updateUser(id, firstName, lastName, email);
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: userUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

//BIEN!!! RUTEAR!!!
routerUser.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.deleteUser(id);
    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :( please try again',
      data: {},
    });
  }*/
