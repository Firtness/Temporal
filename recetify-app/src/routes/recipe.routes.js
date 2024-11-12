const { Router } = require("express");
const router = Router();

const ModelRecipe = require("../recipeModel.js");

// Ruta de bienvenida
router.get("/recipes", (req, res) => {
    res.send("Bienvenido a la API de Recetas!!!");
});

// CRUD - CREAR
router.post("/recipes", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelRecipe.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR TODAS LAS RECETAS
router.get("/all-recipes", async (req, res) => {
    try {
        const respuesta = await ModelRecipe.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNA RECETA
router.get("/recipes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelRecipe.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - ACTUALIZAR UNA RECETA
router.put("/recipes/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelRecipe.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - ELIMINAR UNA RECETA
router.delete("/recipes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelRecipe.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;