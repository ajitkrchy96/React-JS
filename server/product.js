var mongoClient =require("mongodb").MongoClient;
var express = require("express");
var cors = require("cors");
//const { request, response } = require("express");
var connectionString = "mongodb://127.0.0.1:27017";

var app =express();
app.use(cors());
app.use(
    express.urlencoded({
        extended:true
    })
)
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
//User Details Above
app.get("/products",(request, response)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopper-db");
        database.collection("tbl_products").find({}).toArray().then(document=>{
            response.send(document);
            response.end();
        })
    })
}) 

app.get("/details/:id",(request,response)=>{
    var id = parseInt(request.params.id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopper-db");
        database.collection("tbl_products").find({ProductId:id}).toArray().then(document=>{
            response.send(document);
            response.end();
        })
    })
}) 

app.post("/addproducts",(request,response)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopper-db");
        var product = {
            "ProductId" : parseInt(request.body.ProductId),
            "Name":request.body.Name,
            "Price":parseFloat(request.body.Price),
            "Stock": ("true" == ""+request.body.Stock) ? true : false
        };
        database.collection("tbl_products")
        .insertOne(product)
        .then(document=>{
            console.log("record Inserted ...")
            response.redirect("/products");
            response.end();
        })
    })
});

app.put("/updateproducts",(request,response)=>{
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopper-db");
        var findQuery = {ProductId:parseInt(request.body.ProductId)};
        var updateQueary = {$set : {Name: request.body.Name, Price : parseFloat(request.body.Price), Stock : ("true" == ""+request.body.Stock)?true : false}};
    
        database.collection("tbl_products")
        .updateOne(findQuery,updateQueary)
        .then(document=>{
            console.log("Record Updated ...")
           // response.redirect("/products");
            response.end();
        })
    })
});
app.delete("/deleteproducts",(request,response)=>{
    var id = parseInt(request.body.id);
    console.log("Delete call for : "+id);
    mongoClient.connect(connectionString).then(clientObject=>{
        var database = clientObject.db("shopper-db");
        database.collection("tbl_products")
        .deleteOne({ProductId:id})
        .then(document=>{
            console.log("Record Deleted ...")
            response.redirect("/products");
            response.end();
        })
    })
});
app.listen(8080);
console.log(`Server Started : http://127.0.0.1:8080`);
