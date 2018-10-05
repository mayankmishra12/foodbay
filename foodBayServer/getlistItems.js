const mongoose = require('mongoose');
const CustomerSchema = require('./model/CustomerSchema');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
const deliveryboySchema = require('./model/deliveryboySchema');
const Item = mongoose.model('Item', itemSchema);

function getlistItems(req){
 return Item.find({}).sort({foodId:1}).exec();
}
module.exports = getlistItems;