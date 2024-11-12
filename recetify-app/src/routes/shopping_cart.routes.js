const { Router } = require("express");
const router = Router();

const ModelShoppingCart = require("../shopping_cartModel.js");

// Ruta de bienvenida
router.get("/shopping-carts", (req, res) => {
    res.send("Bienvenido a la API de Carritos de Compras!!!");
});

// CRUD - CREAR
router.post("/shopping-carts", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelShoppingCart.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
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

module.exports = router;