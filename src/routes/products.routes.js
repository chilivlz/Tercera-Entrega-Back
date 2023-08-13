// @ts-nocheck
import { Router } from "express";
import express from 'express'
import { productsController } from "../controller/products.controller.js";

export const productManagerRouter = Router();


productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

productManagerRouter.get("/", productsController.getProducts);

productManagerRouter.get("/:pid", productsController.getProductById);

productManagerRouter.post("/", productsController.updateProduct);

productManagerRouter.delete("/:pid", productsController.updateProduct);


