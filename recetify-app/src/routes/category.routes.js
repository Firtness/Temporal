const { Router } = require("express");
const router = Router();

const ModelCategory = require("../categoryModel.js");

// Ruta de bienvenida
router.get("/categories", (req, res) => {
    res.send("Bienvenido a la API de Categorias!!!");
});

// CRUD - CREAR
router.post("/categories", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelCategory.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR
router.get("/all-categories", async (req, res) => {
    try {
        const respuesta = await ModelCategory.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNO
router.get("/categories/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelCategory.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Actualizar (Put)
router.put("/categories/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelCategory.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Eliminar (Delete)
router.delete("/categories/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelCategory.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;