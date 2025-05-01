"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    banner: String,
}, {
    timestamps: true,
});
var ProductModel = mongoose_1.default.models.Product || mongoose_1.default.model('Product', productSchema);
exports.default = ProductModel;
