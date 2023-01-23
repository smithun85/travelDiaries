const { json } = require('express');
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');

//function for GET the user Data
const getAllUsers = async (req, res) => {
    let users;
    //Communicate to the db
    try {
        users = await UserModel.find();
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    if (!users) {
        return res.status(500).json({
            status: "user does not exist",
        })
    }

    return res.status(200).json({ users })
}

//function for POST/CREATE the user data:signup
const signup = async (req, res) => {
    const { name, email, password }=req.body
    
    // if (!name && name.trim() === ""
    //     && !email && email.trim() === "" &&
    //     !password && password.length < 5
    // ) {
    //     return res.status(422).json({ mesage: "invalid data" })
    // }
   
     //create password encrypted
    const salt =await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    let user;
   try{  
    const existUser = await UserModel.findOne({email})
    if(existUser){
        return res.status(400).json({message: "User already exists"})
    }
    
    //user =await UserModel.create({  email, name, password })    //or
    user = new UserModel({ name, email, password:hashedPassword })
    await user.save();  
    
   }catch (err){
    res.status(400).json({message:err.message})
   }

   if(!user){
    return res.status(500).json({message: "Unexpected error occured"})
   }
  
   return res.status(201).json({ user })
}

//function for POST/findone the user data:login
const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        //find user
        const existUser = await UserModel.findOne({ email }) //finds and returns one document that matches the given selection criteria

        //validate user
        if(!existUser){
            return res.status(400).json({message: "User doesn't exist"})
        };
        //validate password
        const isPasswordCorrect = await bcrypt.compare(password,existUser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password"})
        }
          
        return res.status(200).json({
            id:existUser._id,
            message:"Login Sucessfully"})
    }catch (err){
        res.status(500).json({ message: err.message })
    }
} 

module.exports = { getAllUsers, signup , login}

