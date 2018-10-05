const mongoose = require('mongoose');
const CustomerSchema = require('./model/CustomerSchema');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
const deliveryboySchema = require('./model/deliveryboySchema');
const Item = mongoose.model('Item', itemSchema);

function addlistItems(req) {
    let foodId = req.query.foodId;
    let foodName = req.query.foodName;
    let foodPrice = req.query.price;
    let availableItem = req.query.available;
    console.log(req.query.available);
    console.log(req.query);
    return Item.findOne({ foodId: foodId })
        .then((res) => {
            if (res == null || undefined) {
                return Item.insertMany([{ foodId: foodId, foodName: foodName, price: foodPrice, available: availableItem }]);
            }
            else {
                throw new Error(`foodId ${foodId} already present kindly change the foodId`);
            }
        }).catch((err) => err)
}
module.exports = addlistItems;