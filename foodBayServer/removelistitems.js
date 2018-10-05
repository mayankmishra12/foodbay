const mongoose = require('mongoose');
const CustomerSchema = require('./model/CustomerSchema');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
const deliveryboySchema = require('./model/deliveryboySchema');
const Item = mongoose.model('Item', itemSchema);

function removelistItems(req){
let foodId = req.query.foodId;
return Item.findOne({foodId:foodId})
.then((res)=>{
    if(res== null || undefined ){
        throw new Error("no items found for deleting")
    }
    else {
        console.log(res);
       return  Item.deleteOne({foodId:foodId});
    }
}).catch((err)=>err)
}
module.exports = removelistItems;