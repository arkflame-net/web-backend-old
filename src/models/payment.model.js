import { model, Schema } from 'mongoose';

model("Payment", new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    external_id: String,
    method: String,
    amount: Number,
}));