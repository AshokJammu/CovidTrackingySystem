var express = require("express");
var router = express.Router();
var covidRegistration = require("../models/covidData");

router.post("/register", (req, res) => {
  var employees = new covidRegistration();
  let {
    empId,
    name,
    password,
    department,
    designation,
    status,
    userType,
  } = req.body;

  employees.empId = empId;
  employees.name = name;
  employees.password = password;
  employees.department = department;
  employees.designation = designation;
  employees.status = status;
  employees.userType = userType;

  employees.save(function (err, data) {
    if (err) {
      res.send("error saving employee");
    } else {
      console.log(data);
      res.send("Data Added");
    }
  });

  // console.log(empId,name,password,department,designation,status,userType)
});

router.get("/", (req, res) => {
  console.log("getting all uers");
  // res.send('request is getting')

  covidRegistration.find({ }).exec((err, data) => {
    if (err) {
      res.send("error has occured");
    } else {
      console.log(data);
      res.json(data);
    }
  });

  //   covidRegistration.update(
  //     {},
  //     {
  //       $set: { 'date': new Date(), "days": 0 }
  //     },
  //     {multi:true},
  //   ).exec((err,data)=>{
  //       if(err){
  //           console.log(err)
  //       }else{

  //           console.log(data)
  //           res.send(data)
  //       }
  //   });
});

router.post("/statusUpdate", (req, res) => {
  let { empId,status, days } = req.body;


  covidRegistration
        .update(
          { empId: empId },
          {
            $set: { date: new Date(), days: days, status: status },
          }
        )
        .exec((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            res.send(data);
          }
        });


//   if (quarantinePeople.length === 0) {
//     covidRegistration
//       .update(
//         { empId: empId },
//         {
//           $set: { date: new Date(), days: days, status: status },
//         }
//       )
//       .exec((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
//           res.send(data);
//         }
//       });
//   } else {
//     covidRegistration
//       .update(
//         { empId: empId },
//         {
//           $set: { date: new Date(), days: days, status: status },
//         }
//       )
//       .exec((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
           
//         }
//       });

//     covidRegistration
//       .update(
//         { empId: quarantinePeople[0].empId },
//         {
//           $set: { date: new Date(), days: quarantinePeople[0].days, status: 2 },
//         }
//       )
//       .exec((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
           
//         }
//       });

//     covidRegistration
//       .update(
//         { empId: quarantinePeople[1].empId },
//         {
//           $set: { date: new Date(), days: quarantinePeople[1].days, status: 2 },
//         }
//       )
//       .exec((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
           
//         }
//       });

//     covidRegistration
//       .update(
//         { empId: quarantinePeople[2].empId },
//         {
//           $set: { date: new Date(), days: quarantinePeople[2].days, status: 2 },
//         }
//       )
//       .exec((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
         
//         }
//       });

//     covidRegistration
//       .update(
//         { empId: quarantinePeople[3].empId },
//         {
//           $set: { date: new Date(), days: quarantinePeople[3].days, status: 2 },
//         }
//       )
//       .exec((err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data);
//           res.send(data);
//         }
//       });
//   }
});

// router.delete('/delete', (req, res) => {
//     let {id} = req.body
//     covidRegistration.findOneAndDelete({_id:id}).exec((err, data) => {
//         if(err) {
//             res.send('error has occured')
//         }else {
//             res.json(data)
//         }
//     })

//     covidRegistration.collection.drop()
//})

module.exports = router;
