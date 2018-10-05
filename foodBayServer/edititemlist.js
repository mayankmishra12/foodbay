const mongoose = require('mongoose');
const CustomerSchema = require('./model/CustomerSchema');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
const deliveryboySchema = require('./model/deliveryboySchema');
const Item = mongoose.model('Item', itemSchema);

function editlistItems(req){
let foodId = req.query.foodId;
let foodName = req.query.foodName;
let foodPrice = req.query.price;
let availableItem = req.query.available;
return Item.findOne({foodId:foodId})
.then((res)=>{
    if(res== null || undefined ){
        throw new Error("no items found for editing")
    }
    else {
        console.log(res);
       return  Item.updateOne({foodId:foodId},{$set:{foodName:foodName,price :foodPrice,available:availableItem}});
    }
}).catch((err)=>err)
}
module.exports = editlistItems;