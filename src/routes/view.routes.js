import express from "express";
import passport from "passport"
import { Router } from "express";
import { checkAdmin, checkUser } from "../middlewares/auth.js";
import { productsController } from "../controller/products.controller.js";
import { cartsController } from "../controller/cart.controllet.js";
import { registerController } from "../controller/register.controller.js";
import { loginController } from "../controller/login.controller.js";
import { sessionController } from "../controller/session.controller.js";
import { chatController } from "../controller/chat.controller.js";
import { logoutController } from "../controller/logout.controller.js";
import { viewrouterController } from "../controller/viewRouter.controller.js";


//const productManagerMongo = new ProductManagerMongo();
//const cartManagerMongo = new CartManagerMongo();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

//....................MAINPAGE.........................................//

viewsRouter.get("/", async (req, res) => {
  res.render("login");
})

viewsRouter.get("/", viewrouterController.get);
 
//:..................PRODUCTS.......................................//
viewsRouter.get("/products", productsController.getAll);

viewsRouter.get("/productDetail/:pid", productsController.getOne);

//....................CARTS......................................//

viewsRouter.get("/carts/:cid", cartsController.get);

// ......................REALTIME-PRODUCTS......................//

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

// .......................... REGISTER .........................//
viewsRouter.get("/register", registerController.get);

viewsRouter.post("/register", passport.authenticate("register", {failureRedirect: "/api/sessions/failregister"}), registerController.postSesh);

//.......................LOGIN-ONE.............................//

viewsRouter.get("/login", loginController.get);
viewsRouter.get("/!login", loginController.getFail);
viewsRouter.post( "/login", passport.authenticate("login", {failureRedirect: "api/sessions/failregister",}),loginController.post)
//........................ SESSION............................//

viewsRouter.get("/session", sessionController.getSe)
viewsRouter.get("/github", passport.authenticate("github", { scope: ["user:email"] }))
viewsRouter.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }), sessionController.getGit),

//...................... LOGOUT...............................//

viewsRouter.get("/logout", logoutController.get)

//.......................... CHAT.............................//

viewsRouter.get("/chat",chatController.get);

//.............................PROFILE.........................//

viewsRouter.get("/profile", checkUser, async (req, res) => {
  res.render("profile");
});
