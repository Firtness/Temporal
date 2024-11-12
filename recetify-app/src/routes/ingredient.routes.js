const { Router } = require("express");
const router = Router();

const ModelIngredient = require("../ingredientModel.js");

// Ruta de bienvenida
router.get("/ingredients", (req, res) => {
    res.send("Bienvenido a la API de Ingredientes!!!");
});

// CRUD - CREAR
router.post("/ingredients", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelIngredient.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR
router.get("/all-ingredients", async (req, res) => {
    try {
        const respuesta = await ModelIngredient.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNO
router.get("/ingredients/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelIngredient.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Actualizar (Put)
router.put("/ingredients/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelIngredient.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Eliminar (Delete)
router.delete("/ingredients/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelIngredient.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;