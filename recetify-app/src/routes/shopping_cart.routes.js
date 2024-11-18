const express = require('express');
const router = express.Router();

const ModelShoppingCart = require("../shopping_cartModel.js");

// Ruta de bienvenida
router.get("/shopping-carts", (req, res) => {
    res.send("Bienvenido a la API de Carritos de Compras!!!");
});

// CRUD - CREAR
// Ruta para añadir elementos al carrito
router.post("/shopping-carts", async (req, res) => {
    try {
        const { user_id, product_id, quantity, price, photo_url } = req.body;
        if (!user_id || !product_id || !price || !quantity || !photo_url) {
            return res.status(400).send({ error: 'Faltan datos requeridos' });
        }

        const total = price * quantity;
        const newItem = { product_id, quantity, price, total, photo_url };

        let shoppingCart = await ModelShoppingCart.findOne({ user_id });
        if (shoppingCart) {
            shoppingCart.items.push(newItem);
            shoppingCart.total_price += total;
        } else {
            shoppingCart = new ModelShoppingCart({
                user_id,
                items: [newItem],
                total_price: total
            });
        }

        const savedCart = await shoppingCart.save();
        res.send(savedCart);
    } catch (error) {
        res.status(500).send({ error: 'Error al añadir al carrito' });
    }
});

// CRUD - LISTAR TODOS LOS CARRITOS
router.get("/all-shopping-carts", async (req, res) => {
    try {
        const respuesta = await ModelShoppingCart.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UN CARRITO POR USER_ID
router.get("/shopping-carts/user/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const carrito = await ModelShoppingCart.findOne({ user_id });
        if (!carrito) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        res.send(carrito);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send(error);
    }
});

// CRUD - ACTUALIZAR UN CARRITO
router.put("/shopping-carts/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelShoppingCart.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Eliminar un producto del carrito y actualizar el total
router.delete("/shopping-carts/user/:userId/product/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Eliminar el producto del carrito
        await ModelShoppingCart.updateOne(
            { user_id: userId },
            { $pull: { items: { product_id: productId } } }
        );

        // Recalcular el total del carrito
        const cart = await ModelShoppingCart.findOne({ user_id: userId });
        const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        // Actualizar el total en la base de datos
        cart.total_price = totalPrice;
        await cart.save();

        res.status(200).json({ message: 'Producto eliminado y total actualizado', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error });
    }
});

// CRUD - LISTAR UN CARRITO POR USER_ID
router.get("/shopping-carts/user/:user_id", async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const respuesta = await ModelShoppingCart.findOne({ user_id });
        if (!respuesta) {
            return res.status(404).send({ error: 'Carrito no encontrado' });
        }
        res.send(respuesta);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).send(error);
    }
});

//CHECKOUTt
router.post("/checkout", async (req, res) => {
  try {
      const { user_id, items, total_price } = req.body;
      if (!user_id || !items || !total_price) {
          return res.status(400).send({ error: 'Faltan datos requeridos' });
      }

      const newCart = new ModelShoppingCart({
          user_id,
          items,
          total_price
      });

      const savedCart = await newCart.save();
      res.send(savedCart);
  } catch (error) {
      res.status(500).send({ error: 'Error al procesar el pago' });
  }
});

module.exports = router;