import { productService } from "../services/routers.js";

class ProductsController {

  async getAll(req, res) {
    // Crear una instancia de la clase
    const allProducts = await productService.getProducts({
      limit: req.query.limit,
      page: req.query.page,
      sort: req.query.sort,
      query: req.query.query 
    });
    

      let sessionDataName = req.session.user?.firstName;
      let sessionAuth = req.session.user?.rol;
      let isAdmin = false;
      if (req.session.user?.rol === "admin") {
        isAdmin = true;
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

    async getProducts(req,res){
      try {
        const allProducts = await productService .getProducts(req.query);
    
        res.status(200).send({ 
          payload: allProducts.docs.map((product) => ({
            id: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            thumbnails: product.thumbnails,
            status: product.status,
            code: product.code,
            category: product.category,
          })),
          totalPages: allProducts.totalPages,
          prevPage: allProducts.prevPage,
          nextPage: allProducts.nextPage,
          page: allProducts.page,
          hasPrevPage: allProducts.hasPrevPage,
          hasNextPage: allProducts.hasNextPage,
    
         });
      } catch (error) {
        res.status(400).send({ status: "error", error: error.message });
      }
    };

    async getProductById(req,res){
      try {
        let pid = req.params.pid;
        const findProduct = await productService .getProductById(pid);
       res.status(200).send({ status: "success", data: findProduct });
      } catch (error) {
        res.status(400).send({ status: "error", data: error.message });
      }
    };

    async updateProduct(req,res){
      let updateProductClient = req.body;
      let pid = req.params.pid;
      try {
        const updateProduct = await productService .updateProduct(
          pid,
          updateProductClient
        );
       res.status(200).send({ status: "success", data: updateProduct });
      } catch (error) {
         res.status(400).send({ status: "error", data: error.message });
      }
    };


    async addProduct(req,res){
      let newProduct = req.body;
      try {
        const addProduct = await productService .addProduct(newProduct);
         res.status(201).send({ status: "success", data: addProduct });
      } catch (error) {
          res.status(400).send({
          status: "error",
          data: error.message,
        });
      }
    };

    async deleteProduct(req,res){
      let pid = req.params.pid;
      console.log(pid);
      try {
        const deleteProduct = await productService .deleteProduct(pid);
        return res.status(200).send({
          status: "success",
          data: "El producto eliminado es:" + deleteProduct,
        });
      } catch (error) {
        return res.status(400).send({ status: "error", data: error.message });
      }
    };
    }
      
;
export const productsController = new ProductsController();
