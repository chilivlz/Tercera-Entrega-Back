import { productService } from "./routers.js";
import { CartsDao } from "../DAO/mongo/cart.dao.js";

export const cartsDao = new CartsDao();

export class CartService {
  constructor() {}

  async createCart() {
    try {
      const newCart = await cartsDao.createCart();
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartId(id) {
    try {
      const cart = await cartsDao.findById(id);

      return cart;
    } catch (error) {
      throw new Error("Cart not found");
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await cartsDao.getProductById(pId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      console.log(productToAdd._id);

      let cart = await cartsDao.findOneAndUpdate(
        { _id: cId, "products.product": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartsDao.findByIdAndUpdate(cId, {
          $push: { products: { product: productToAdd._id, quantity: 1 } },
        });
      }

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const productToDelete = await cartsDao.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.product": productToDelete._id },
        {
          $inc: { "products.$.quantity": -1 },
        }
      );

      let findIndexArray = cart.products.findIndex(
        (product) => product.product.toString() === pId
      );
      console.log(cart.products);
      console.log(findIndexArray);

      if (cart.products[findIndexArray].quantity <= 1) {
        await cartsModel.findByIdAndUpdate(cId, {
          $pull: { products: { product: productToDelete._id } },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCartComplete(cId, pId) {
    try {
      const productToDelete = await cartsDao.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.product": productToDelete._id },
        {
          $pull: { products: { product: productToDelete._id } },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantityProductFromCart(cId, pId, quantity) {
    try {
      const productToUpdate = await cartsDao.getProductById(pId);

      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      if (
        quantity.quantity < 0 ||
        quantity.quantity === 0 ||
        quantity.quantity === null ||
        quantity.quantity === undefined ||
        typeof quantity.quantity === "string"
      ) {
        throw new Error("Quantity should be a positive number");
      }

      let cart = await cartsDao.findOneAndUpdate(
        { _id: cId, "products.product": productToUpdate._id },
        {
          $set: { "products.$.quantity": quantity.quantity },
        }
      );

      return cart + ` QUANTITY updated to ${quantity.quantity}`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCartArray(cId, productArray) {
    try {
      let newCartProducts = productArray.products.map((product) => {
        return {
          product: product._id,
          quantity: product.quantity,
        };
      });

      for (let i = 0; i < newCartProducts.length; i++) {
        if (
          newCartProducts[i].quantity < 0 ||
          newCartProducts[i].quantity === 0 ||
          newCartProducts[i].quantity === null ||
          newCartProducts[i].quantity === undefined ||
          typeof newCartProducts[i].quantity === "string"
        ) {
          newCartProducts[i].quantity = 1;
        }
      }

      let cart = await cartsDao.findByIdAndUpdate(cId, {
        products: newCartProducts,
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cId) {
    try {
      await cartsDao.findByIdAndUpdate(cId, { products: [] });
      return "Cart empty";
    } catch (error) {
      throw new Error("Cart not found");
    }
  }

  async purchase(cid, user) {
    try {
      const cart = await this.dao.getCartId(cid);

      if (cart.products.length === 0) {
        throw new Error("Cart is empty");
      }

      const purchasedProducts = [];
      const notPurchasedProducts = [];

      for (const item of cart.products) {
        if (item.product.stock >= item.quantity) {
          await cartsDao.updateProduct(item.product._id.toString(), {
            stock: item.product.stock - item.quantity,
          });
          purchasedProducts.push(item);
        } else {
          notPurchasedProducts.push(item);
        }
      }

      let ticket;
      if (purchasedProducts.length > 0) {
        const amount = purchasedProducts.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );

        ticket = await ticketService.createTicket({
          amount,
          code: " ",
          purchaser: user.email,
        });
      } else {
        throw new Error("Cart is empty");
      }

      if (notPurchasedProducts.length > 0) {
        await this.dao.updateCartProducts(
          cid,
          notPurchasedProducts.map((item) => ({
            id: item.product._id.toString(),
            quantity: item.quantity,
          }))
        );
      } else {
        await this.dao.findByIdAndUpdate(cid);
      }

      return {
        ticket,
        notPurchasedProducts: notPurchasedProducts.map((item) =>
          item._id.toString()
        ),
      };
    } catch (error) {
      throw new Error(error);
    } finally {
    }
  }
}



