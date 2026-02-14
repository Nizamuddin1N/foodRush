import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    restaurantId: String,
    name: String, 
    price: Number,
    category: String,
    isAvailable: {type: Boolean, default: true}
}, {timestamps: true});

export default mongoose.model('MenuItem', menuItemSchema);