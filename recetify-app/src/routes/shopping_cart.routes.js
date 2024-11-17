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
      const { user_id, product_id, quantity, price } = req.body;
      if (!user_id || !product_id || !price || !quantity) {
        return res.status(400).send({ error: 'Faltan datos requeridos' });
      }
  
      const total = price * quantity;
      const newItem = { product_id, quantity, price, total };
  
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

// CRUD - LISTAR UN CARRITO
router.get("/shopping-carts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelShoppingCart.findById(id);
        res.send(respuesta);
    } catch (error) {
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

// CRUD - ELIMINAR UN CARRITO
router.delete("/shopping-carts/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelShoppingCart.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
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