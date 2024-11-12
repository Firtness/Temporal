const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        quantity: { type: Number, required: true },
        total_cost: { type: Number, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelShoppingCart = mongoose.model("shopping_carts", shoppingCartSchema);

module.exports = ModelShoppingCart;