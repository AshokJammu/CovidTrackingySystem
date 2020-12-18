var mongoose = require('mongoose')
var Schema = mongoose.Schema

var covidRegistration = new Schema({
    empId: { type: Number, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    department:{type: String, required:true},
    designation:{type:String, required:true},
    status:{type:Number, required:true},
    userType:{type:String,required:true}

})

module.exports = mongoose.model('covidRegistration', covidRegistration)