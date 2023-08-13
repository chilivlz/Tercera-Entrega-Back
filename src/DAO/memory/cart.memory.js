export default class CartsMemory {
	constructor() {
		this.data = [];
	}

	async createCart() {
		return this.data;
	}

	async getCartId(_id) {
        try {
            const cart = await cartsModel.findById(id);
      
            return cart;
          } catch (error) {
            throw new Error("Cart not found");
          }
        }
    
	async addProductToCart(cartId) {
		try {
			const cart = await this.data.find(cart => cart.id === cartId);
			return cart;
		} catch (e) {
			console.log(e);
		}
	}

	async create(data) {
		this.data.push(data);
		return data;
	}

	async updateCartArray(cartId, productArray) {
		try {
			const cart = await this.data.find(cartId, { productArray}, { new: true });
			return cart;
		} catch (error) {
			throw new Error("Error updating cart in database");
		}
	}
}


export const cartsMemory = new CartsMemory();
