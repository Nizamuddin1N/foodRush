import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: String,
    description: String,
    ownerId: String,
    isOpen: {type: Boolean, default: true}
}, {timestamps: true});

export default mongoose.model('Restaurant', restaurantSchema);