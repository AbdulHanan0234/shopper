require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

app.use(express.json());
app.use(cors());
app.set('trust proxy', 1);

//Database Connection with MongoDB

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://usershopper:shopper@cluster0.pukyaae.mongodb.net/Cluster0");

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running");
})

// Image Storage Engine using Memory Storage for Cloudinary

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Creating Upload Endpoint for Images via Cloudinary
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded" });
    }

    const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
            if (error) {
                console.error("Cloudinary Upload Error:", error);
                return res.status(500).json({ success: 0, error: error.message });
            }
            res.json({
                success: 1,
                image_url: result.secure_url
            });
        }
    );

    stream.end(req.file.buffer);
});

// Schema for creating products 

const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
})

app.post("/addproduct",async (req,res)=>{
    let products = await Product.find({});
    let id;
    if (products.length>0) {
        id = products[products.length-1].id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("Product Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

//Creating API for Deleting Products from cloudinary and database

app.post("/removeproduct",async (req,res)=>{
    const product = await Product.findOne({id: req.body.id});
    await Product.findOneAndDelete({id: req.body.id});
    const imagePublicId = "products/" + product.image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(imagePublicId, (err, result) => {
        if (err) {
            console.error("Cloudinary Destroy Error:", err);
            return res.status(500).json({ success: 0, error: err.message });
        }
        console.log("Product Removed");
        res.json({
            success: true,
            name: req.body.name,
        });
    });

})

//Creating API for Getting All Products

app.get("/allproducts",async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//Schema Creating for User Model

const Users = mongoose.model("Users",{
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

//Creating API for User Registration

app.post("/signup", async (req,res)=>{
    let check =await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"Existing user found with same email address"})
    }
    let cart = {};
    for(let i=0; i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const data ={
        user:{
            id:user.id,
        }
    }
    const token = jwt.sign(data, "secret_ecom");
    res.json({success:true,token});
})

//Creating API for User Login

app.post("/login", async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
        const passCompare = req.body.password === user.password;
        if (passCompare){
            const data = {
                user:{
                    id:user.id,
                }
            }
            const token = jwt.sign(data,"secret_ecom");
            res.json({success:true,token});
        }
        else{
            res.json({success:false,error:"Wrong Password"});
        }
    }
    else{
        return res.status(400).json({success:false,error:"Wrong Email Address"})
    }
})

//Creating Endpoint for newcollection data
app.get('/newcollections',async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
})

// Creating End Point for Popular in Women Section
app.get('/popularinwomen',async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log('Popular in women fetched');
    res.send(popular_in_women);
})

// Creating Endpoint for Related Products
app.get('/relatedproducts', async (req, res) => {
    const { category } = req.query;
    if (!category) {
        return res.status(400).json({ success: false, error: "Category is required" });
    }
    let products = await Product.find({ category: category });
    let related = products.slice(0, 4);
    console.log('Related products fetched for category:', category);
    res.send(related);
})

//creating middleware to fetch user
const fetchUser =async(req,res,next)=>{
    const token= req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using a valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

// Creating Endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")

})

//Creating Endpoint to remove product from CartData
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("Removed ",req.body.itemId);

    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] >0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

  //Creating Endpoint to get Cart on login
  app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
    
  })

app.listen(port,(error)=>{
    if (!error) {
        console.log("Server is Running on port " + port);
    } else {
        console.log("Error: " + error);
    }
})
