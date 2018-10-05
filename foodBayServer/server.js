var request = require('request');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const orderFood = require('./orderFood');
const StatusOfFood = require('./StatusOfFood');
const deliveryStatus = require('./delivery');
const availableItems = require('./availableItems');
const selectedItem = require('./selectedItem');
const getlistItems = require('./getlistItems');
const editlistItems = require('./edititemlist');
const addlistItems = require('./addItemlist');
const removelistItems = require ('./removelistitems');
const orderslist = require('./orders');
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())

app.get('/foodbay', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  orderFood(req).then((result) => {
    if(result instanceof Error){
      res.send(result.message)
    }
    if (result == 'ERROR' || result instanceof Error) {
      res.status(400);
      res.send('you order can not proceed at this moment ');
    } else {
      StatusOfFood(req)
      .then((result) => {
        if (result != (undefined || null)) {
          var AppletConfirmMsg = "your booking is confirmed with total amount is" + result.orderedItem.totalAmount;
          res.send(AppletConfirmMsg);
        }
      })
    }
  }).catch((err)=>{
    console.log(err +"43");
    res.send("unabled to confirm your booking")
  })
});

app.get('/foodbay/connecttodeliveryboy', function (req, res) {
 // res.setHeader('Content-Type', 'text/plain');
  let customerNumber = req.query.CallFrom;
  StatusOfFood(req)
    .then((result) => { 
      if (result != undefined || null|| (result.length != 0)) {
        console.log(result);
        let deliveryboynumber = result.orderedItem.deliveryboynumber
         res.send(`${deliveryboynumber}`);
         console.log(deliveryboynumber);
      } else {
        throw  res.send("you order is not confirmed ");
      }
    }).then((result) => res.send("thanks for calling us"))
    .catch((err) => res.send("unable to connect to delivery boy"))
})

app.get('/foodbay/statusoforder', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  StatusOfFood(req).then((result) => {
    if(result instanceof Error)  {
      res.status(400);
     res.send("no items found");
     return;
    };
    if(result == undefined ||null || result.length ==0){
      res.status(400);
      res.send('not found');
    }
    if (result.orderStatus == 'confirm') {
      res.send(`your previous order  of ${result.orderedItem.foodName} with  ${result.orderedItem.quantity} unit and
       total amount ${result.orderedItem.totalAmount} is on the way, to call delivery boy press 1 and for another 
       order press 2
      `);
    } else {
      res.status(400);
      res.send('not found');
    }
  })
})

app.get("/foodbay/delivered", function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  deliveryStatus(req).then((result) => {
    if(result instanceof Error) res.send(result.message);
   res.send(result);
  }).catch((err) => res.send(err.message))
})

app.get("/foodbay/availableitems",function(req,res){
  res.setHeader('Content-Type', 'text/plain');
  let availableItemsListString ='';
 availableItems().then((result)=> {
  result.forEach(element => {
    console.log(element);
    availableItemsListString =  availableItemsListString +",press "+element.foodId +"for " +element.foodName 
 }); 
 return availableItemsListString;
 }).then((result)=> res.send(result));
})

app.get("/foodbay/selectedItem",function(req,res){
  res.setHeader('Content-Type', 'text/plain');
       selectedItem(req)
       .then((result)=>{
             if(result instanceof Error )
             {
               res.send("wrong input")
             }
             res.send( `you have selected ${result.foodName} whose cost for 1 is ${result.price} kindly enter
             the quantity followed by #`)})
             .catch((err)=> res.send("wrong input"))
})
app.get("/foodbay/itemslist",function(req,res){
  getlistItems(req).then((result)=>{
   if(result instanceof Error) res.send(result.message)
    res.send(result);
  })
  .catch((err)=>res.send(err.message))
})
app.put("/foodbay/itemslist",function(req,res){
   editlistItems(req).then((result)=>{
    if(result instanceof Error) res.send(result.message)
     res.send('successfully edited the items');
   })
   .catch((err)=>res.send(err.message))
})

app.post("/foodbay/itemslist",function(req,res){
  res.setHeader('Content-Type', 'text/plain');
  console.log(req.body);
  console.log(req.query);
  addlistItems(req).then((result=>{
    if(result instanceof Error) res.send(result.message)
    return res.send("succesfully added items")
  }))
  .catch((err)=>res.send("can not add items"))
})

app.delete("/foodbay/itemslist",function(req,res){
  removelistItems(req).then((result=>{
    if(result instanceof Error) res.send(result.message)
    return res.send("succesfully deleted items")
  }))
  .catch((err)=>res.send("can not add items"))
})
app.get("/foodbay/order",function(req, res){
  orderslist()
 .then((result)=>{
   if(result instanceof Error)  throw new Error("unble to fetch orders");
   res.send(result);
 }).catch((err)=> {
  res.status(400);
  res.send(err)})
})


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
