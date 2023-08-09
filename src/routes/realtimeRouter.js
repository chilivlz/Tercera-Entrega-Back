import express from "express";
import passport from "passport"
import { Router } from "express";
import { ProductManagerMongo } from "../services/products.service.js";
import { CartManagerMongo } from "../services/carts.service.js";
import { checkAdmin, checkUser } from "../middlewares/auth.js";
import { productsController } from "../controller/products.controller.js";
import { cartsController } from "../controller/cart.controllet.js";
import { registerController } from "../controller/register.controller.js";


const productManagerMongo = new ProductManagerMongo();
const cartManagerMongo = new CartManagerMongo();

export const routerRealTime = Router();

routerRealTime.use(express.json());
routerRealTime.use(express.urlencoded({ extended: true }));

routerRealTime.get("/", async (req, res) => {
  res.render("login");
});

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
//:..................PRODUCTS..............://///
routerRealTime.get("/products", productsController.getAll);

routerRealTime.get("/productDetail/:pid", productsController.getOne);

//....................CARTS.......................//

routerRealTime.get("/carts/:cid", cartsController.get);

// ......................REALTIME-PRODUCTS..............//

routerRealTime.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
  res.json({});
});

// .......................... REGISTER .................:///   Esto es lo que me aparece Cannot POST /api/sessions/register
loginRouter.get("/login",registerController.get)
loginRouter.post("/login",passport.authenticate("register", { failureRedirect: "api/sessions/failregister"}), registerController.post)

//.......................LOGIN-ONE.......................//

routerRealTime.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
  res.json({});
});

routerRealTime.get("/chat", async (req, res) => {
  res.render("chat", {});
});


routerRealTime.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
    res.redirect("/login");
  });
});

routerRealTime.get("/register", async (req, res) => {
  res.render("register");
});

routerRealTime.get("/profile", checkUser, async (req, res) => {
  res.render("profile");
});
