import { model, Schema } from 'mongoose';

const ProductSchema = new Schema({
    commands: Set,
    name: String,
    description: String,
    price: Number,
    // Wether the product can be bought once or multiple times
    once: Boolean,
});

model("Product", ProductSchema);