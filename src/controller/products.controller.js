import { ProductManagerMongo } from "../services/products.service.js";

class ProductsController {

  async getAll(req, res) {
      const productManagerMongo = new ProductManagerMongo(); // Crear una instancia de la clase
      const allProducts = await productManagerMongo.getProducts(
        req.query.limit,
        req.query.page,
        req.query.sort,
        req.query.query 
      );

      let sessionDataName = req.session.user?.firstName;
      let sessionAuth = req.session.rol;
      if (sessionAuth) {
        sessionAuth = "Admin";
      } else {
        sessionAuth = "User";
      }
      const products = allProducts.docs.map((product) => ({
        name: product.title,
        description: product.description,
        price: product.price,
        _id: product._id,
      }));

      res.render("products", {
        style: "/public/css/styles.css",
        products: products,
        pagingCounter: allProducts.pagingCounter,
        page: allProducts.page,
        totalPages: allProducts.totalPages,
        hasPrevPage: allProducts.hasPrevPage,
        hasNextPage: allProducts.hasNextPage,
        prevPage: allProducts.prevPage,
        nextPage: allProducts.nextPage,
        session: {
          sessionAuth: sessionAuth,
          sessionDataName: sessionDataName,
        },
      });
    } 

    async getOne(res,req){
      let pId = req.params.pid;
      const product = await productManagerMongo.getProductById(pId);
    
      if (product) {
        return res.render("productDetail", {
          style: "../css/styles.css",
          product: {
            name: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
          },
        });
      } else {
        return res.render({
          status: "error",
          data: "Product not found",
        });
      }


    }
    }


export const productsController = new ProductsController();
