const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        photo_url: { type: String, required: true },
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
        shopping_cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'shopping_carts', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelIngredient = mongoose.model("ingredients", ingredientSchema);

module.exports = ModelIngredient;