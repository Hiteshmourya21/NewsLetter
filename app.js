//jshint esversion:6

const express  = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
      members : [
        {
          email_address : email,
          status : "subscribed",
          merge_fields :{
            FNAME : firstName,
            LNAME : lastName
          }
        }
      ]
    };

    var jsonData = JSON.stringify(data);


  var options = {
    url : "https://us17.api.mailchimp.com/3.0/lists/e45d3e0190",
    method : "POST",
    headers : {
      "Authorization" : "HiteshMourya 156331b885e3c79ea8ca172e5d6a3c80"
    },
    body : jsonData
  };
  request(options,function(error,request,boby){
    if(error){
      res.sendFile(__dirname+"/failure.html")

    }
    else{
      if(request.statusCode==200){
        res.sendFile(__dirname+"/success.html")

      }
      else{
        res.sendFile(__dirname+"/failure.html")


      }

    }
  })

})

app.post("/failure",function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started at port : 3000")
})

// 156331b885e3c79ea8ca172e5d6a3c80-us17
//e45d3e0190
