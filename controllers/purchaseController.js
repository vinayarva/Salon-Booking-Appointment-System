const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require("jsonwebtoken")

// const User = require("../model/user model")


module.exports.premiumPurchase = async (req, res) => {
    try {
        const price =  req.query.price;

        console.log(price)
      const instance = new Razorpay({
        key_id: process.env.RAZOR_ID,
        key_secret: process.env.RAZOR_KEY,
      });
  
      const order = await instance.orders.create({
        amount: price,
        currency: "INR",
        receipt: "receipt",
        partial_payment: false,
      });
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).json({success:false,message:"Internal Server Error"})
    }
  };


module.exports.verify = (req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // const data = req.user.ID

    const secret = process.env.RAZOR_KEY; // Replace with your Razorpay secret key

    // Generate signature using order_id and payment_id
    const generatedSignature = crypto.createHmac('sha256', secret)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // Verify that the generated signature matches the received signature
    if (generatedSignature === razorpay_signature) {

       
         res.status(201).json({ success: true,message: "Payment verified successfully"});

       

        
    } else {
        // Payment verification failed
        res.status(400).json({ message: "Payment verification failed" });
    }
}