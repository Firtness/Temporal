const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        price: { type: Number, required: true },
        photo_url: { type: String, required: true },
        shopping_cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'shopping_carts', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelDish = mongoose.model("dishes", dishSchema);

module.exports = ModelDish;