import mongoose from 'mongoose';
const giftItemSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  Name:{
    type: String,
    required: true,
  },
  MobileNo:{
    type: String,
    required: true,
  },
  Pincode:{
    type: String,
    required: true,
  },
  Locality1:{
    type: String,
  },
  Address1:{
    type: String,
    required: true,
  },
  Landmark:{ 
    type: String,
    },
    AlternatePhoneno:{
        type: String,

    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
  items: [
    {
      category: {
        type: String,
        
      },
      count: {
        type: Number,
        
      },
      id: {
        type: String,
        
      },
      name: {
        type: String,
    
      },
      price: {
        type: Number,
        
      },
      url: {
        type: String,
        
      },
    },
  ],
});

export default mongoose.model('OrderDetails', giftItemSchema);
