import  express  from 'express';

import {signUp,login,getAllGift,searchGift,addToCart,giftsByEmail,searchCategory,updatequantity, OrderDetails} from '../Controller/controller.js'
const userRouter=express();
userRouter.post("/signup",signUp);
userRouter.post("/login",login);
userRouter.get("/getallGift",getAllGift);
userRouter.get("/searchgift",searchGift);
userRouter.post("/addtocart",addToCart);
userRouter.get("/giftsbyemail",giftsByEmail);
userRouter.get("/searchCategory",searchCategory);
userRouter.put("/updateQuantity",updatequantity);
userRouter.post("/orderDetails",OrderDetails)
export default userRouter;