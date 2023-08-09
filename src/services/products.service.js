import { productsModel } from "../DAO/models/products.model.js";

export class ProductManagerMongo {
  constructor() {}

  addProduct(addedProduct) {
    return new Promise((resolve, reject) => {
      const product = {
        name: addedProduct.name,
        description: addedProduct.description,
        price: addedProduct.price,
        stock: addedProduct.stock,
        thumbnails: addedProduct.thumbnails,
        status: true,
        code: addedProduct.code,
        category: addedProduct.category,
      };

      productsModel
        .create(product)
        .then((newProduct) => {
          resolve(newProduct);
        })
        .catch((error) => {
          if (error.code === 11000) {
            console.log(error);
            reject(new Error('El campo "code" ya existe en la base de datos.'));
          } else {
            reject(error);
          }
        });
    });
  }

  getProducts(limit = 10, page, sort, query) {
    const filter = {};

    if (query) {
      filter.category = query;
    }

    const options = {
      page: page || 1,
      limit: limit || 10,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
    };

    return productsModel.paginate(filter, options);
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      productsModel
        .findById(id)
        .then((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Product not found"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  

  updateProduct(id, product) {
    return new Promise((resolve, reject) => {
      if (product.code) {
        reject(new Error("Code cant be modified"));
      }

      productsModel
        .findByIdAndUpdate(id, product)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(new Error("Product not found"));
        });
    });
  }

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      productsModel
        .findByIdAndDelete(id)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}