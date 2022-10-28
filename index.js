
 var express=require('express')
 var bodyParser=require('body-parser')
 var mongoose=require('mongoose')

 const app=express()
 app.use(bodyParser.json())
 app.use(express.static('public1'))
 app.use(bodyParser.urlencoded({
     extended:true
 }))
 mongoose.connect('mongodb://localhost:27017/logindb',
 {
     useNewUrlParser:true,
     useUnifiedTopology:true
 })
 var db=mongoose.connection
 db.on('error',()=>console.log("Error in connecting to database"))
 db.once('open',()=>console.log("connected to database"))
 app.post("/sign_up",(req,res)=>
 {
     var name=req.body.name
    var email=req.body.email
     var phoneno=req.body.phoneno
     var password=req.body.password
     var Confirm_password=req.body.Confirm_password
    var data={
      "name":name,
        "email": email,
         "phoneno":phoneno,
         "password":password,
         "Confirm-password":Confirm_password
     }
    db.collection('userd').insertOne(data,(err,collection)=>
    {
       
         if(err)
        {
           throw err
       }
        console.log("Record inserted successfully")
     })
     return res.redirect('success.html')
 })
  
 app.get("/",(req,res)=>{
     res.set({         "Allow-access-Allow-origin":'*'
        
     })
     return res.redirect('index.html')
 }).listen(3000)
 console.log("listening on port 3000")
