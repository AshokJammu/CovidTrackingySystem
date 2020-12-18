var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var port = 5000

mongoose.connect('mongodb+srv://ashok:Ashok@18@mongooseappcluster.feazr.mongodb.net/mongooseAppDB?retryWrites=true&w=majority',{useNewUrlParser: true})
var x = mongoose.connection

x.once('open', function () {
    console.log('db connected') 
    // console.log(x.modelNames())
})


 
var loginRouter = require('./routes/login')
var covidRegisterRouter = require('./routes/covidRegister')

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

 
app.use('/drorlogin', loginRouter)
app.use('/drorUsers',covidRegisterRouter)

// app.get("/hello",(req,res)=>{
//     res.send("helloworld")
// })

app.listen(port, function() {
    console.log('app listening on port ' + port )
})

// console.log("ah")