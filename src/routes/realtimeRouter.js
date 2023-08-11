import express from "express";
import passport from "passport"
import { Router } from "express";
import { ProductManagerMongo } from "../services/products.service.js";
import { CartManagerMongo } from "../services/carts.service.js";
import { checkAdmin, checkUser } from "../middlewares/auth.js";
import { productsController } from "../controller/products.controller.js";
import { cartsController } from "../controller/cart.controllet.js";
import { registerController } from "../controller/register.controller.js";
import { loginController } from "../controller/login.controller.js";
import { sessionController } from "../controller/session.controller.js";
import { chatController } from "../controller/chat.controller.js";
import { logoutController } from "../controller/logout.controller.js";


const productManagerMongo = new ProductManagerMongo();
const cartManagerMongo = new CartManagerMongo();

export const routerRealTime = Router();

routerRealTime.use(express.json());
routerRealTime.use(express.urlencoded({ extended: true }));

routerRealTime.get("/", async (req, res) => {
  res.render("login");
})

//const app = express();
//app.use(express.static("public"));

routerRealTime.get("/", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(
    req.query.limit,
    req.query.page,
    req.query.sort,
    req.query.query
  );

  const products = allProducts.docs.map((product) => ({
    name: product.title,
    description: product.description,
    price: product.price,
  }));

  return res.render("home", {
    style: "../public/css/styles.css",
    products: products,
  });
});
//:..................PRODUCTS.......................................//
routerRealTime.get("/products", productsController.getAll);

routerRealTime.get("/productDetail/:pid", productsController.getOne);

//....................CARTS......................................//

routerRealTime.get("/carts/:cid", cartsController.get);

// ......................REALTIME-PRODUCTS......................//

routerRealTime.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

// .......................... REGISTER .........................//
routerRealTime.get("/register", registerController.get);

routerRealTime.post("/register", passport.authenticate("register", {failureRedirect: "/api/sessions/failregister"}), registerController.postSesh);

//.......................LOGIN-ONE.............................//

routerRealTime.get("/login", loginController.get);
routerRealTime.get("/!login", loginController.getFail);
routerRealTime.post( "/login", passport.authenticate("login", {failureRedirect: "api/sessions/failregister",}),loginController.post)
//........................ SESSION............................//

routerRealTime.get("/session", sessionController.getSe)
routerRealTime.get("/github", passport.authenticate("github", { scope: ["user:email"] }))
routerRealTime.get("/githubcallback",passport.authenticate("github", { failureRedirect: "/login" }), sessionController.getGit),

//...................... LOGOUT...............................//

routerRealTime.get("/logout", logoutController.get)

//.......................... CHAT.............................//

routerRealTime.get("/chat",chatController.get);



routerRealTime.get("/profile", checkUser, async (req, res) => {
  res.render("profile");
});
