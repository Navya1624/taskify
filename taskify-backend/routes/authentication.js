import { User } from "../models/user.js";
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router=express.Router();
router.use(cookieParser());
router.use(express.json());

router.post("/signup",async(req,res)=>{
    try{
        const { username ,email , password } = req.body;
        if(!(username && email && password)){
            return res.status(400).send("All fields are mandatory");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User Already Exists");
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user=new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        console.log("User Created: ", user);
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "2h"
        }) 
        res.status(201).json({ user, token });
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
})

router.post("/signin",async(req,res) => {
    try{
        const { email , password } = req.body;
        if (!email || !password) {
            return res.status(400).send("All fields are mandatory");
          }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Incorrect email");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Incorrect password");
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET, // Use environment variable for secret
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true if HTTPS
            sameSite: "Lax", // or "Strict" or "None" (cross-site use)
            maxAge: 24 * 60 * 60 * 1000,
          });
        res.status(200).json({
            message: "Sign in successful",
            token,
            user: {
              id: user._id,
              email: user.email,
              name: user.name // if exists
            }
          });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
})
router.get("/check",authenticateToken,(req,res)=>{
    res.json({authenticated:true,userId:req.userId});
});

router.put("/forgotPassword", async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).send("All fields are mandatory");
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).send("Passwords do not match");
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send("Password updated successfully");
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).send("Server error");
    }
});

export default router;