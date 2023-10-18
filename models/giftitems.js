import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({

    name :{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    }, 
});

export default mongoose.model("giftitems", userSchema);