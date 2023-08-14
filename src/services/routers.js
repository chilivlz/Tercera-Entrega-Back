import { ProductDao } from "../DAO/mongo/product.dao.js";
import { ProductService } from "./products.service.js";
import { CartsDao } from "../DAO/mongo/cart.dao.js";
import { CartService } from "./carts.service.js";
import { UsersDao } from "../DAO/mongo/user.dao.js";
import { UserService } from "./user.service.js";
import { TicketService } from "./ticket.service.js";
import { Tickets } from "../DAO/mongo/ticket.dao.js";//

export const productService = new ProductService(new ProductDao());

export const cartService = new CartService(new CartsDao());

export const userService = new UserService(new UsersDao());

export const ticketService = new TicketService(new Tickets());