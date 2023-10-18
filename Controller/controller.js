import User from "../models/User.js";
import giftitems from "../models/giftitems.js";
import Gift from "../models/giftitems.js"
import Cart from '../models/Cart.js'
import Order from "../models/OrderDetails.js";
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(422).json({ message: 'Invalid Inputs' });
    }
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  
    if (!existingUser) {
      return res.status(401).json({ message: 'User not found' });
    }
  
    // Assuming existingUser contains the saved plain-text password
    const savedPlainTextPassword = existingUser.password;
  
    if (password === savedPlainTextPassword) {
      return res.status(200).json({ message: 'Authentication successful' });
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  };
export const signUp = async (req, res , next) => {
 
    const { name,email,password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim()==="" && !password && password.trim()==="" ){
            return res.status(422).json({message:"Invalid Inputs"});
    }
    let user;
    try{

        user = new User({name,email,password});
        user = await user.save();
     }
    catch(err)
    {
      return next(err);
    }  
    if (!user) {
        return res.status(500).json({message:"Unexpected error Occured" });
     }
    
     return res.status(201).json({ user });
    

};
export const getAllGift = async (req, res , next) => {
    let gift;
    try{
       gift = await Gift.find()
    }
    catch(err){
       return next(err);
    }
   
    if (!gift) {
       return res.status(500).json({message:"Unexpected error Occured" });
    }
   
    return res.status(200).json({ gift });
   
   };
export const searchGift = async (req, res , next) => 
   {const giftName = req.query.name;
   try {
     if (!giftName) {
      
       return res.status(400).json({ message: 'Missing query parameter: gift_name' });
     }
     const formattedGiftName = giftName.replace(/\s+/g, '').toLowerCase();

    // Use a regular expression for case-insensitive and space-insensitive search
    const regexGiftName = new RegExp(formattedGiftName, 'i');

    const Gift = await giftitems.find({ name: { $regex: regexGiftName } });
     if (!Gift|| Gift.length === 0) {
       
       return res.status(404).json({ message: 'No Gift found' });
     }
     return res.status(200).json({ Gift });
   } catch (err) {
    
     return next(err);
   }
 };
export const addToCart=async(req,res,next)=>{
  try {
    const { email, id, count,name,category,url,price } = req.body;

    // Check if required fields are provided
    if (!email || !id || !count||!name||!category||!url||!price ) {
      return res.status(422).json({ message: 'Invalid Inputs' });
    }

    // Create a new CartItem
    const cartItem = new Cart({
      email,
      id,
      count,
      name,category,url,price 
    });

    // Save the cart item to the database
    const savedCartItem = await cartItem.save();
    console.log(savedCartItem);

    if (!savedCartItem) {
      return res.status(500).json({ message: 'Unexpected error occurred' });
    }

    return res.status(201).json({ cartItem: savedCartItem });
  } catch (error) {
    return next(error);
  }
};
export const giftsByEmail = async (req, res , next) => 
{const userEmail = req.query.email;

try {
  if (!userEmail) {
   
    return res.status(400).json({ message: 'Missing query parameter: gift_name' });
  }

  const Gift = await Cart.find({email: userEmail });

  if (!Gift|| Gift.length === 0) {
    
    return res.status(404).json({ message: 'No Gift found' });
  }

 
  return res.status(200).json({ Gift });
} catch (err) {
 
  return next(err);
}
};
export const searchCategory = async (req, res , next) => 
   {const giftCategory = req.query.category;
   try {
     if (!giftCategory) {
       return res.status(400).json({ message: 'Missing query parameter: gift_category' });
     }
     const formattedGiftCategory = giftCategory.replace(/\s+/g, '').toLowerCase();

    
    const regexGiftCategory = new RegExp(formattedGiftCategory, 'i');

    const Gift = await giftitems.find({ category: { $regex: regexGiftCategory } });
     if (!Gift|| Gift.length === 0) {
       return res.status(404).json({ message: 'No Gift found' });
     }
     return res.status(200).json({ Gift });
   } catch (err) {
    
     return next(err);
   }
 };

 export const updatequantity = async(req,res,next)=>{
  const { itemId } = req.params;
  const { newCount } = req.body;

  try {
    console.log(itemId,newCount)
    const giftItem = await GiftItem.findById(itemId);

    if (!giftItem) {
      return res.status(404).json({ message: 'Gift item not found' });
    }

    giftItem.count = newCount;
    await giftItem.save();

    return res.status(200).json({ message: 'Count updated successfully' });
  } catch (error) {
    console.error('Error updating count:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
 };
 export const OrderDetails=async(req,res,next)=>{
  try {
    const { email, Name, MobileNo,Pincode,Locality1,Address1,Landmark,AlternatePhoneno,city,state,items } = req.body;

    // Check if required fields are provided
    if (!email ||!Name||!MobileNo||!Pincode||!Locality1||!Address1||!Landmark||!city||!state ||!AlternatePhoneno) {
      return res.status(422).json({ message: 'Invalid Inputs' });
    }

    // Create a new CartItem
    const cartItem = new Order({
      email,
      Name,
      MobileNo,
      Pincode,Locality1,Address1,Landmark,city,state,items
    });

    // Save the cart item to the database
    const savedCartItem = await cartItem.save();
    console.log(savedCartItem);

    if (!savedCartItem) {
      return res.status(500).json({ message: 'Unexpected error occurred' });
    }

    return res.status(201).json({ cartItem: savedCartItem });
  } catch (error) {
    return next(error);
  }
};