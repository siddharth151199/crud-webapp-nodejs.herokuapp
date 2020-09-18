const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
// const uri = "mongodb+srv://sid123:123@cluster0.7avt2.mongodb.net/user?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("MongoDB connected");
    }).catch(err => console.log(err))

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.use('/', require('./routes/index.js'))

app.get('/',(req, res) =>{
    res.send("show me")
})

app.listen(3000, () =>{
    console.log("server runnig");
})