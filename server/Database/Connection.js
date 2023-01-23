 //connect to DB
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/travelDiaries')
.then(()=>{
    console.log(`Connection is established`)
})
.catch( (err)=>{
    console.log(`some error as ${err}`)
})