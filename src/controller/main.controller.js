/*import { ProductManagerMongo } from "../services/products.service";
const productManagerMongo = new ProductManagerMongo();

class MainController{
    async get (req,res){
       return res.render("login");
    }

    async get (req,res){
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
    };

 }

 export const mainController = new MainController();*/