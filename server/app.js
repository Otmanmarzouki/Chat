const express = require('express');
const session = require("express-session")
const passport = require('passport');
require("./passport/pssportConfig")
const userRouter= require("./routes/User")
const chatRouter= require("./routes/Chat")


var cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json())

app.use(session({
  secret: '7861',
  resave: false,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());



//app.use('/',routers)
app.use("/api",userRouter)
app.use("/api",chatRouter)



app.get('/', (req, res) => {
    res.send('hello world')
  })



module.exports= app