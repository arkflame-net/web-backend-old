import { model, Schema } from 'mongoose';

model("Customer", new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    payments: Set,
}));