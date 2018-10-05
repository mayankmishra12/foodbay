const mongoose = require('mongoose');
const itemSchema = require('./model/ItemSchema');
const selecteditemSchema = require('./model/SelectedItemSchema');
const Item = mongoose.model('Item', itemSchema);
const selecteditem = mongoose.model('selecteditem',selecteditemSchema);


function selecteItem(req) {
    let customerNumber = req.query.CallFrom;
    let foodIdString = req.query.digits;
    var foodId= parseInt(foodIdString.substring(1, foodIdString.length - 1));
    return selecteditem.insertMany([{
        foodId:foodId,
        CustomerMobileNumber:customerNumber
    }])
    .then((res)=>{
      return Item.findOne({foodId:foodId}).exec();
    })
    .then((res)=>{
        if(res == null || undefined) throw new Error("no item found")
        return res;
    })
    .catch((err)=>err)   
}
module.exports = selecteItem;