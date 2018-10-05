const mongoose = require('mongoose');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
const deliveryboySchema = require('./model/deliveryboySchema');
const Item = mongoose.model('Item', itemSchema);
const orders = mongoose.model('orders', orderSchema);
const deliverboy = mongoose.model('deliveryboy', deliveryboySchema);

function checkStatusOfdeliveryBoy(deliverboynumber) {
    console.log(deliverboynumber)
    return orders.find({
        'orderedItem.deliveryboynumber': deliverboynumber,orderStatus:'confirm'
    }).sort({ orderTime: 1 }).exec();
}

function deliveryStatus(req) {
    let deliverboynumber = req.query.CallFrom;
    let statusOfOrder = req.query.status;
    let   checkStatusOfdelivery = checkStatusOfdeliveryBoy(deliverboynumber);
    
    return checkStatusOfdelivery.then((result) => {
        console.log(result)
        if (result.length == 0 || null) throw new Error('no items found for delivery');
       orders.updateOne({'orderedItem.deliveryboynumber':deliverboynumber,orderStatus:"confirm"},
       {$set:{orderStatus:statusOfOrder}}
          ).exec((err, result)=>console.log(result));
    }).then((res) => {
        deliverboy.updateOne({ mobilenumber: deliverboynumber }, { $set: { status: "free" } }).exec(function(err,result){
            console.log(result)
        }); 
    }).then((res) => {
        return "thanks for deliveying the food"
    }).catch((err) => {
        return err;
    })
}
module.exports = deliveryStatus;