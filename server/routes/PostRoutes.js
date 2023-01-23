const express = require('express')
const routerPost = express.Router();

const { getAllPost, addPost, getPostById, updatePost, deletePost } = require('../controllers/Post_Controllers')

routerPost.get('/', getAllPost)
routerPost.get('/:pid', getPostById)
routerPost.post('/', addPost)
routerPost.patch('/:id', updatePost)
routerPost.delete('/:ID',deletePost)

module.exports = routerPost