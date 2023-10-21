import { Router } from "express";
import express from 'express'
import { cartsController } from "../controller/cart.controllet.js";
import { checkOwner } from "../middlewares/auth.js";


export const cartsRouter = Router();


cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", cartsController.createCart);

cartsRouter.get("/:cid", cartsController.getCartById);
cartsRouter.post("/:cid/product/:pid", cartsController.addProductToCart);

cartsRouter.put("/:cid/product/:pid", checkOwner, cartsController.updateQuantityProductFromCart);

cartsRouter.put("/:cid", cartsController.updateCartArray);

cartsRouter.delete("/:cid", cartsController.deleteAllProductsFromCart);

cartsRouter.delete("/:cid/product/:pid/quantity", cartsController.deleteProductFromCart);

cartsRouter.delete("/:cid/product/:pid", cartsController.deleteProductFromCartComplete);

cartsRouter.post("/:cid/purchase", cartsController.purchase)
//cartsRouter.get("/purchase-success", cartsController.purchaseSuccess);