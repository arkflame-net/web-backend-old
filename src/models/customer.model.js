import { model, Schema } from 'mongoose';

const CustomerSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    products: Set,
});

model("User", CustomerSchema);