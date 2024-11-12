const express = require("express");

const cors = require('cors');

const path = require("path"); // Asegúrate de importar el módulo 'path'
//Hola
const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

require("./database");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes/index.routes.js"));
app.use(require("./routes/category.routes.js"));
app.use(require("./routes/comment.routes.js"));
app.use(require("./routes/dish.routes.js"));
app.use(require("./routes/ingredient.routes.js"));
app.use(require("./routes/publication.routes.js"));
app.use(require("./routes/recipe.routes.js"));
app.use(require("./routes/shopping_cart.routes.js"));
app.use(require("./routes/user_recipe.routes.js"));

app.use(require("./userModel"));
app.use(require("./categoryModel"));
app.use(require("./commentModel"));
app.use(require("./dishModel"));
app.use(require("./ingredientModel"));
app.use(require("./publicationModel"));
app.use(require("./recipeModel"));
app.use(require("./shopping_cartModel"));
app.use(require("./user_recipeModel"));



app.listen(3000, () => {
    console.log("Server on port", 3000);
});

