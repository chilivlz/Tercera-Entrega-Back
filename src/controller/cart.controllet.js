import { cartManagerMongo} from "../services/carts.service.js";

class CartsController {
    async get(req,res){
        const cId = req.params.cid;
        const cart = await cartManagerMongo.getCartById(cId);
    
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
} 


export const cartsController= new CartsController();