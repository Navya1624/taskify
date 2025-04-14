import { User } from "../models/user.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

const router=express.Router();
router.use(cookieParser());
router.use(express.json());

router.post("/signup",async(req,res)=>{
    try{
        const { username ,email , password } = req.body;
        if(!(username && email && password)){
            res.status(400).send("All fields are mandatory");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).send("User Already Exists");
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user=new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        console.log("User Created: ", user);

        const token = jwt.sign({id: user._id}, "Your _jwt_ secret",{
            expiresIn: "2h"
        }) 
        res.status(201).json({ user, token });
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
})

export default router;