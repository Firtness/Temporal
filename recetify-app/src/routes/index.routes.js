const { Router } = require("express");
const path = require("path"); // Asegúrate de importar el módulo 'path'

const router = Router();

const ModelUser = require("../userModel.js");

router.get("/users", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/users.html"));
});

// CRUD - CREAR
router.post("/users", async (req, res) => {
    try {
        const body = req.body;
        const respuesta = await ModelUser.create(body);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR
router.get("/all-users", async (req, res) => {
    try {
        const respuesta = await ModelUser.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNO
router.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Actualizar (Put)
router.put("/users/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelUser.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Eliminar (Delete)
router.delete("/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelUser.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;