var mongoClient =require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
const { request, response } = require("express");

var connectionString = "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());


app.get("/users", (request,response) => {
    mongoClient.connect(connectionString).then((clientObject)=>{
        var database = clientObject.db("shopper-db");
            database.collection("users").find({}).toArray().then((documents)=> {
                response.send(documents);
            });
    });
});
app.get("/",(req,resp)=>{
    resp.send("<h1>Welcoem to Home</h1>");
})
app.post("/register",(request,response)=>{
    console.log(request.body.UserId);
    var user = {
        "UserId":request.body.UserId,
        "UserName":request.body.UserName,
        "Password" : request.body.Password,
        "Email" : request.body.Email,
        "Mobile": request.body.Mobile,
        "Age" : parseInt(request.body.Age)
    };
    mongoClient.connect(connectionString).then((clientObject)=>{
        var database = clientObject.db("shopper-db");
        database.collection("users").insertOne(user).then((result)=>{
            console.log("Record Inserted");
            response.redirect("/users");
        });
    });
})
app.listen(8080);
console.log("Server Started : http://127.0.0.1:8080")