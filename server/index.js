//import Globally:
const express = require('express')
require('./Database/Connection')        //import the connections
const dotenv = require('dotenv');        // import dotenv from 'dotenv' or
//import the routes
const userRouter = require('./routes/UserRoutes');
const routerPost = require('./routes/PostRoutes');


//express app
const app = express();
dotenv.config()                 //call the dotenv using config method

//create port for localhost server
const port = process.env.RORT || 4000



//middlewares
app.use(express.json())
app.use("/users", userRouter)          //localhost:4000/users/signup/
app.use('/posts', routerPost)


app.listen(port,(err) => {
    if(!err){
        console.log(`SERVER is runniing on port ${port}`)
    }else{
        console.log(`server is not running as: ${err}`)
    }
})
