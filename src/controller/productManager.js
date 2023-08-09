import { productsModel } from "../Implementacion-login/src/DAO/models/products.model.js";

export class ProductManager {
  constructor() {}

  async addProduct(title, category, description, price, thumbnail, code, stock, status) {
    const codeError = await productsModel.findOne({ code: code });

    if (codeError) {
      console.log("Error: existing code");
      return 409;
    } else {
      const product = new productsModel({
        title,
        category,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
      });

      await product.save();
      return product;
    }
  }

  async getProducts() {
    const allProducts = await productsModel.find();
    return allProducts;
  }

  async getProductById(id) {
    const product = await productsModel.findById(id);

    if (product) {
      console.log(product);
      return product;
    } else {
      console.log("Product not found");
      return null;
    }
  }

  async updateProduct(id, title, category, description, price, thumbnail, code, stock, status) {
    const product = await productsModel.findById(id);

    if (!product) {
      console.log("Product not found");
      return null;
    }

    const codeExist = await productsModel.findOne({ code: code, _id: { $ne: id } });

    if (codeExist) {
      return 409;
    }

    product.title = title || product.title;
    product.category = category || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.thumbnail = thumbnail || product.thumbnail;
    product.code = code || product.code;
    product.stock = stock || product.stock;
    product.status = status || product.status;

    await product.save();
    return product;
  }

  async deleteProduct(id) {
    const product = await productsModel.findByIdAndDelete(id);

    if (product) {
      console.log("Delete product successfully");
      return "Delete product successfully";
    } else {
      console.log("Product not found");
      return "Product not found";
    }
  }
}
