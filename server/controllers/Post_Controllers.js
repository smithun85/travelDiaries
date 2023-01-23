const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose")

//Callback function for GET the user's post Data
const getAllPost = async (req, res) => {
    let posts;
    try{
        posts = await PostModel.find()

        if(!posts){
            return res.status(500).json({
                status: "Posts not found",
            })
        }
        
        res.status(200).json({ posts })
    }catch(err){
        res.status(500).json({message:err.message})
    }

    
}

//Callback function for GetById the post data
const getPostById = async (req, res) => {
    let post;
    try{
        post = await PostModel.findById(req.params.pid)
        // console.log(post,222)
    }catch (err) {
        res.status(500).json({message:err.message})
    }
   
    if(!post){
        return res.status(500).json({message:"Post does not exist"})
    }

    res.status(200).json({post})
    
}

//Callback function for POST/CREATE the user's post Data
const addPost = async (req, res) => {
    const {title,  description, address,  image, date, user} = req.body;

    let existUser;
    try{
        existUser = await UserModel.findById(user)
        // console.log(existUser,111)
    }catch(err){
        res.status(500).json({message:err.message, status:"user does not exist"})
    }
    let post;
    try{        
        post = await PostModel.create({
            title,  
            description,
            address,
            image,
            // date: new Date(`${date}`),
            user
        })

        const session =await mongoose.startSession();
        session.startTransaction();

        existUser.posts.push(post);
        existUser.save({session})
        console.log(existUser)
        // post = await post.save({ session })
        console.log(post)

    }catch(err){
        res.status(500).json({mesage:err.message, status:"document is not created"})
    }

    if(!post){
        return res.status(500).json({message:"unexpected error occured"})
    }

    res.status(200).json({post})
}

//Callback function for UPDATE by id the post data
const updatePost = async (req, res) => {
    const {title,  description, address,  image} = req.body;
    let post;
    try{
         post = await PostModel.findByIdAndUpdate(req.params.id, {
            title,  description, address,  image
         })
         
    }catch(err){
        res.status(500).json({message:err.message})
    }
    console.log(post)
    if(!post){
        return res.status(400).json({message:"Post does not exist"})
    }

    res.status(200).json({ message:"Successfully Updated",post })
}

//callback function for DELETED by id the post data
const deletePost = async (req, res) => {
    let post
    try{
        post = await PostModel.findByIdAndRemove(req.params.ID)
    }catch(err){
        res.status(500).json({ message:err.message})
    }
    if(!post){
        return res.status(404).json({message:"post is not found"})
    }

    res.status(200).json({message:"Successfully deleted"})
}

module.exports = { getAllPost, getPostById, addPost, updatePost, deletePost }