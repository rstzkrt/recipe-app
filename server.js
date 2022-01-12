const express = require('express')
const app = express()
const { error } = require('./middlewares')
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors');
const admin = require('firebase-admin')

admin.initializeApp({
    credential:admin.credential.applicationDefault()
})

app.use(express.json());

app.use(cors());

const uri=process.env.DATABASE_URL

mongoose.connect(uri).then().catch();
mongoose.connection.once('open',()=>{
    console.log("connected")
})

const userRouter=require('./components/user/user.route')
const recipeRouter=require('./components/recipe/recipe.route')

app.use('/user',userRouter);
app.use('/recipe',recipeRouter);

// Catch 404 and forward to error handler.
app.use(error.notFound)
// Use custom error handler
app.use(error.handler)

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = {
    app
}