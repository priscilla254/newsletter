const bodyParser=require("body-parser");
// const e = require("express");
const express= require ("express");
const request=require("request")
const https= require("https")

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req,res){
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const emailAddress=req.body.email;

    var data={
        members:[
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    var jsonData= JSON.stringify(data);
    const url= "https://us8.api.mailchimp.com/3.0/lists/e03b946de6";
    const options={
        method:"POST",
        auth:"Priscilla:f570961b69e8027ea7af036b45e6bea2-us8"
    }
    const request= https.request(url, options, function(response){
         if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
         }else{
            res.sendFile(__dirname+"/failure.html")
         }
        response.on("data", function(data){

            console.log(JSON.parse(data));
        })

        
    })

request.write(jsonData);
request.end();
   
})

app.post("/failure", function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT|| 3000, function(req,res){
    console.log("server is running on port 3000")
})
// API key
// ca517603638790a39e21b1fd01584e28-us8


// list ID
// e03b946de6