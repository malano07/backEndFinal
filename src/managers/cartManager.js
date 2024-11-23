const Cart = require('./models/Cart');

class CartManager {
  async createCart() {
    try {
      const cart = await Cart.create({ products: [] });
      return cart;
    } catch (error) {
      throw new Error(`Error al crear carrito: ${error.message}`);
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate('products.product');
      if (!cart) throw new Error('Carrito no encontrado');
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener carrito: ${error.message}`);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al agregar producto al carrito: ${error.message}`);
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
      );
      if (!cart) throw new Error('Carrito no encontrado');
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar carrito: ${error.message}`);
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) throw new Error('Carrito no encontrado');

      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );
      if (!cart) throw new Error('Carrito no encontrado');
      return cart;
    } catch (error) {
      throw new Error(`Error al limpiar carrito: ${error.message}`);
    }
  }
}

module.exports = CartManager;
