const { Router } = require("express");
const router = Router();

const ModelPublication = require("../publicationModel.js");

// Ruta de bienvenida
router.get("/publications", (req, res) => {
    res.send("Bienvenido a la API de Publicaciones!!!");
});

// CRUD - CREAR
router.post("/publications", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelPublication.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR
router.get("/all-publications", async (req, res) => {
    try {
        const respuesta = await ModelPublication.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNO
router.get("/publications/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelPublication.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Actualizar (Put)
router.put("/publications/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelPublication.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Eliminar (Delete)
router.delete("/publications/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelPublication.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;