
import express from "express";
import handlesbars from "express-handlebars";
import { Server } from "socket.io";
import { cartsRouter } from "./routes/carts.router.js";
import { productManagerRouter } from "./routes/products.router.js";
import {routerRealTime} from "./routes/realtimeRouter.js";
import { ProductManagerMongo } from "./services/products.service.js";
import { MsgModel } from "./DAO/models/msgs.model.js";
import {__dirname} from "./utils.js"
import http from 'http'
import { connectMongo } from "./utils/connect-db.js";
import { loginRouter } from "./routes/login.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import { ent } from "./config.js";

const app = express();
const port = ent.PORT;

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: ent.MONGO_URL }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);


connectMongo();

const server = http.createServer(app);
export const io = new Server (server);


app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManagerMongo();

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});


const socketServer = new Server(httpServer);



app.engine("handlebars", handlesbars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use( express.static(__dirname +"/public"));

app.use("/", routerRealTime)

socketServer.on("connection", async (socket) => {
  console.log("New Client connected");
  const products = await productManager.getProducts();
  socket.emit("products", products);
  const msgs = await MsgModel.find({});
  socketServer.sockets.emit("all_msgs", msgs);

  socket.on("formSubmission", async (data) => {
    await productManager.addProduct(data); 
    const products = await productManager.getProducts();
    socketServer.sockets.emit("products", products);
  });

  socket.on("msg_front_to_back", async (msg) => {
    const msgCreated = await MsgModel.create(msg);
    const msgs = await MsgModel.find({});
    socketServer.sockets.emit("all_msgs", msgs);
  });
});

initializePassport();
app.use(passport.initialize());
app.use(passport.session());



app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", routerRealTime); // aca modifique la ruta//

app.use("/api/sessions/current", (req,res)=>{   
  console.log(req.session.user)  
  return res.status(200).json({
    status: "sucess",
    msg: "User data session",
    payload: req.session.user || {},
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});












