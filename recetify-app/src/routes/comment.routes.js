const { Router } = require("express");
const router = Router();

const ModelComment = require("../commentModel.js");

// Ruta de bienvenida
router.get("/comments", (req, res) => {
    res.send("Bienvenido a la API de Comentarios!!!");
});

// CRUD - CREAR
router.post("/comments", async (req, res) => {
    try {
        const body = req.body;
        
        // Registro del cuerpo de la solicitud para verificar el contenido
        console.log("Request body:", body);
        
        // Creación del comentario en la base de datos
        const respuesta = await ModelComment.create(body);
        
        // Registro de la respuesta para verificar el objeto devuelto
        console.log("Comment created:", respuesta);
        
        res.send(respuesta);
    } catch (error) {
        console.error("Error creating comment:", error); // <-- Log de error detallado
        res.status(500).send({ message: "Error creating comment", error });
    }
});


// CRUD - LISTAR
router.get("/all-comments", async (req, res) => {
    try {
        const respuesta = await ModelComment.find({});
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - LISTAR UNO
router.get("/comments/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelComment.findById(id);
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Actualizar (Put)
router.put("/comments/:id", async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const respuesta = await ModelComment.findOneAndUpdate({ _id: id }, body, { new: true });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

// CRUD - Eliminar (Delete)
router.delete("/comments/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const respuesta = await ModelComment.deleteOne({ _id: id });
        res.send(respuesta);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;