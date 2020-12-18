var express = require('express');
var router = express.Router();
var UserData = require('../models/covidData')

router.post("/", (req,res)=> {
    console.log(UserData,"user")
    let {empId,password} = req.body
    console.log(empId,password)
        UserData.find({empId:empId, password:password}).exec((err,data)=> {
            if(err) {
                res.send('Invalid credentials')
            } else {
                //let token =  Math.random().toString(36).substring(5);
                console.log(data, 'firstCheck')
                // UserData.findOneAndUpdate({_id:data[0]._id},  {token:token}).exec((err,data) => {
                //     if(err) {
                //         res.send("unable to get token")
                //     }else {
                //         console.log("success")
                //         console.log(data, 'after update')
                //     }
                // })
                // res.json({error:false, message:"login successful", data:data})

                if(data.length ===0){
                    res.json({error:true, message:"ooops user not found", data:data})
                }else{
                    res.json({error:false, message:"login successful", data:data})
                }
            }
        })

})

module.exports = router;