const mongoose = require('mongoose');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
deliveryboySchema = require('./model/deliveryboySchema');
const selecteditemSchema = require('./model/SelectedItemSchema');
const Item = mongoose.model('Item', itemSchema);
const orders = mongoose.model('orders', orderSchema);
const deliveryboy = mongoose.model('deliveryboy', deliveryboySchema);
const selecteditem = mongoose.model('selecteditem', selecteditemSchema);
function checkAvailabilityOfItem(foodId, foodQuantity) {
    return Item.findOne({ foodId: foodId }).exec();
}

function orderFood(req) {
    let that = this;
    let customerNumber = req.query.CallFrom;
    let foodId ;
    let foodQuantityString = req.query.digits;
    var foodQuantity = parseInt(foodQuantityString.substring(1, foodQuantityString.length - 1));
    return selecteditem.find({ CustomerMobileNumber: customerNumber })
        .then((selecteditems) => {
            foodId = selecteditems[selecteditems.length-1].foodId;
            return checkAvailabilityOfItem(foodId, foodQuantity)
        })
        .then((res) => {
            if (res.available >= foodQuantity) {
                return deliveryboy.findOne({ status: "free" })
                    .then((resp) => {
                        if (resp == null || undefined) {
                            throw new Error("all delivery boy are busy kindly  call latter");
                        }
                        return orders.insertMany(
                            [{
                                CustomerMobileNumber: customerNumber,
                                orderedItem: {
                                    foodName: res.foodName,
                                    foodId: foodId,
                                    quantity: foodQuantity,
                                    totalAmount: res.price * foodQuantity,
                                    deliveryboynumber: resp.mobilenumber
                                },
                                orderStatus: 'confirm'
                            }]).then((result) => {
                                console.log(result[0].deliveryboynumber);
                                Item.updateOne({ foodId: foodId }, { $set: { available: (res.available - foodQuantity) } }).exec();
                                deliveryboy.updateOne({ status: "free" }, { $set: { status: "busy" } }).exec();
                                return result;
                            })
                    })
            } else {
                if (res.available == 0) {
                    return new Error("we are unable to serve " + res.foodName + " at this moment")
                }
                return new Error("kindly enter quantity  leass than " + res.available)
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => err)
}

module.exports = orderFood;
