

const mailchimp=require("@mailchimp/mailchimp_marketing");
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require('https');

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey:"64e712a24462c08cac2b3ac0ef3ba861-us6",
  server:"us6"
});

app.post("/", function(req, res){

  const  firstName=req.body.fName;
  const  lastName=req.body.lName;
  const  email=req.body.email;

  const  data = {
     members:[
       {
         email_address:email,
         status:"subscribed",
         merge_fields:{
           FNAME:firstName,
           LNAME:lastName
         }
       }
    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us6.api.mailchimp.com/3.0/lists/57f8248d3a";
  const options={
    method:"POST",
    auth:"Nazanin:64e712a24462c08cac2b3ac0ef3ba861-us6"

  }

  const request = https.request(url, options, function( response){

    if (response.statusCode ===200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

   response.on("data", function(data){
     console.log(JSON.parse(data));
   })
  })
   request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});


/*  API KEY
64e712a24462c08cac2b3ac0ef3ba861-us6
*/

/* List id
57f8248d3a

*/
