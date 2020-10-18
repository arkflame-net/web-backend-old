import { model, Schema } from 'mongoose';

model("Product", new Schema({
    commands: Set,
    name: String,
    description: String,
    price: Number,
    onetime: Boolean,
}));