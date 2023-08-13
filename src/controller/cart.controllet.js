import {cartService} from "../services/routers.js"

class CartsController {
    async get(req,res){
        const cId = req.params.cid;
        const cart = await cartService.getCartById(cId);
    
        let totalPrice = 0;
        for (const product of cart.products) {
          totalPrice += product.quantity * product.product.price;
        }
    
        res.status(200).render("cartDetail", {
          style: "../css/styles.css",
          products: cart.products.map((product) => ({
            name: product.product.name,
            price: product.product.price,
            quantity: product.quantity,
          })),
          totalPrice: totalPrice,
        });
     res.status(500).render({ error: "Error retrieving cart" });
      }

      async createCart(req,res){
        try {
          const userCart = await cartService.createCart();
          res.status(201).send({ status: "success", data: userCart });
        } catch (error) {
          res.status(400).send({ status: "error", error: "Cart not created" });
        }
      };

      async getCartById(req,res){
        try {
          let cid = req.params.cid;
          const cartId = await cartService.getCartId(cid);
          res.status(200).send({ status: "success", data: cartId });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };

      async addProductToCart(req,res){
        try {
          let cid = req.params.cid;
          let pid = req.params.pid;
          const cartId = await cartService.addProductToCart(cid, pid);
      
          res
            .status(200)
            .send({ status: "success", data: "product added: " + cartId });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };

      async updateQuantityProductFromCart(req,res){
        try {
          let cid = req.params.cid;
          let pid = req.params.pid;
          let body = req.body;
          const cartId = await cartService.updateQuantityProductFromCart(
            cid,
            pid,
            body
          );
          res.status(200).send({ status: "success", data: cartId });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };

      async updateCartArray (req,res){
        try {
          let cid = req.params.cid;
          let body = req.body;
          const cartId = await cartService.updateCartArray(cid, body);
          res.status(200).send({ status: "success", data: cartId });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };

      async deleteAllProductsFromCart(req,res){
        try {
          const cartId = await cartService.deleteAllProductsFromCart(
            req.params.cid
          );
          res.status(200).send({ status: "success", data: cartId });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };

      async deleteProductFromCart (req,res){
        try {
          let cid = req.params.cid;
          let pid = req.params.pid;
          const cartId = await cartService.deleteProductFromCart(cid, pid);
      
          res
            .status(200)
            .send({ status: "success", data: `Product ${pid} removed 1 quantity` });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };
      async deleteProductFromCartComplete(req,res){
        try {
          let cid = req.params.cid;
          let pid = req.params.pid;
          const cartId = await cartService.deleteProductFromCartComplete(
            cid,
            pid
          );
      
          res.status(200).send({ status: "success", data: `Product ${pid} removed` });
        } catch (error) {
          res.status(404).send({ status: "error", error: error.message });
        }
      };

      async purchase(req, res) {
        try {
          const result = await cartService.purchase(
            req.params.cid,
            req.session.user
          );
    
          return res.status(201).json({
            status: "success",
            msg: "Purchase completed",
            data: result,
          });
        } catch (error) {
          return res.status(500).json({
            status: "error",
            msg: error.message,
            data: {},
          });
        }
      }
    }
      

      
      

export const cartsController= new CartsController();