import * as fs from "fs";
import { ProductManager } from "./productManager.js";
const productManager = new ProductManager("./products.json");

export class CartManager {
  constructor(path) {
    this.path = path;
    fs.existsSync(this.path) === false
      ? fs.writeFileSync(this.path, JSON.stringify(this.carts), (err) => {
          if (err) throw err;
          console.log("Existe");
        })
      : console.log("Iniciando servidor");
  }

  newCart = async () => {
    try {
      let carts = [];
      if (fs.existsSync(this.path)) {
        const archive = await fs.promises.readFile(this.path, "utf-8");
        carts = JSON.parse(archive);
      }
      const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;
      const newCart = { id, products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    const cartFound = this.carts.find((cart) => cart.id == id);
    return cartFound ? cartFound : false;
  };

  addProductToCart = async (cid, pid) => {

    this.carts = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
        const productList = await productManager.getProducts();
        const cartById = this.carts.find((cart) => cart.id == cid);
        const productById = productList.find((product) => product.id == pid);
        const productExist = cartById.products.find((product) => product.id == pid);
         console.log(productExist);

        if (productExist) {
          
        productExist.quantity += 1;
        return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
       } else {

      const { title, id } = productById;
      const newProduct = { title, id };
      const addProduct = { title: title, id: id, quantity: 1 };
      cartById.products = [...cartById.products, addProduct, ];
      return await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
    }
  };
}

export const cartManager = new CartManager("./src/cartTest.json");
