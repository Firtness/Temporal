const { Router } = require("express");
const router = Router();

const ModelUserRecipe = require("../user_recipeModel.js");

// Ruta de bienvenida
router.get("/user-recipes", (req, res) => {
    res.send("Bienvenido a la API de Usuarios-Recetas!!!");
});

// CRUD - CREAR
router.post("/user-recipes", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelUserRecipe.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR TODOS LOS USERS-RECIPES
router.get("/all-user-recipes", async (req, res) => {
    try {
        const respuesta = await ModelUserRecipe.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UN USER-RECIPE
router.get("/user-recipes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUserRecipe.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - ACTUALIZAR UN USER-RECIPE
router.put("/user-recipes/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelUserRecipe.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - ELIMINAR UN USER-RECIPE
router.delete("/user-recipes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUserRecipe.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;