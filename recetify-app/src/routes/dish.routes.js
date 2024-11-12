const { Router } = require("express");
const router = Router();

const ModelDish = require("../dishModel.js");

// Ruta de bienvenida
router.get("/dishes", (req, res) => {
    res.send("Bienvenido a la API de Platos!!!");
});

// CRUD - CREAR
router.post("/dishes", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelDish.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR
router.get("/all-dishes", async (req, res) => {
    try {
        const respuesta = await ModelDish.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNO
router.get("/dishes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelDish.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Actualizar (Put)
router.put("/dishes/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelDish.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Eliminar (Delete)
router.delete("/dishes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelDish.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;