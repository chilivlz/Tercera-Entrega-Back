
import express from "express";
import handlesbars from "express-handlebars";
import { Server } from "socket.io";
import { cartsRouter } from "./routes/carts.routes.js";
import { productManagerRouter } from "./routes/products.routes.js";
import {viewsRouter} from "./routes/view.routes.js";
//import { ProductManagerMongo } from "./services/products.service.js";
//import { MsgModel } from "./DAO/mongo/models/msgs.model.js";//
import {__dirname} from "./utils.js"
import http from 'http'
import { connectMongo } from "./utils/connect-db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import errorHandler from "./middlewares/error.js"
import { ent } from "./config.js";
import { addLogger } from "./middlewares/logger.js";
import { userModel } from "./DAO/mongo/models/users.model.js";
import bcrypt from "bcrypt";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";



const app = express();


app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: ent.MONGO_URL }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);

const port = ent.PORT;
connectMongo();

const server = http.createServer(app);
export const io = new Server (server);


app.use(express.urlencoded({ extended: true }));
//const productManager = new ProductManagerMongo();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce CoderHouse Backend",
      description: "Practica de backend de Ecommerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});


const socketServer = new Server(httpServer);



app.engine("handlebars", handlesbars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use( express.static(__dirname +"/public"));

app.use("/", viewsRouter)
app.use(addLogger);

app.post("/recover-pass", async (req, res) => {
  const { code, email, password } = req.body;
  const findRecoverCode = await RecoverCodesSchema.findOne({ email, code });
  if (Date.now() < findRecoverCode.expire) {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const updatedUser = await userModel.findOneAndUpdate({
        password: newPassword,
      });
      res.send("Password updated");
    }
  } else {
    res.send("Codigo expirado");
  }
});

/*socketServer.on("connection", async (socket) => {
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
});*/

initializePassport();
app.use(passport.initialize());
app.use(passport.session());



app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", viewsRouter); // aca modifique la ruta//

app.get("/mockingproducts", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      _id: `6483de46fc7349e7c00e547${i}`,
      title: `Mock ${i}`,
      description: `Mock desc ${i}`,
      price: 100 * i,
      thumbnail: `/img${i}.png`,
      code: `abc${i}`,
      stock: 5,
      status: true,
      category: `Mock`,
      __v: 0,
    });
  }
  return res.status(200).json({
    status: "success",
    msg: "Products created",
    docs: products,
  });
});

/*app.use("/api/sessions/current", (req,res)=>{   
  console.log(req.session.user)  
  return res.status(200).json({
    status: "sucess",
    msg: "User data session",
    payload: req.session.user || {},
  });
});*/

app.get("/loggerTest", (req, res) => {
  req.logger.debug("debug alert!!");
  req.logger.http("http alert!!");
  req.logger.info("info alert!!");
  req.logger.warning("warning alert!!!");
  req.logger.error("error alert!!!");
  req.logger.fatal("fatal error!!");
  res.send({ message: "test logger" });
});

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});
app.use(errorHandler);

//app.use(errorHandler);//











