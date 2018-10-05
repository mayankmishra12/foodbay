const mongoose = require('mongoose');
const CustomerSchema = require('./model/CustomerSchema');
const itemSchema = require('./model/ItemSchema');
const orderSchema = require('./model/orderSchema');
const Item = mongoose.model('Item', itemSchema);
const customers = mongoose.model('customers', CustomerSchema);
const orders = mongoose.model('orders', orderSchema);
const ERROR = "ERROR";
const SUCCESS = "SUCCESS";
function checkStatus(customerNumber) {
    console.log(customerNumber);
    return orders.find({CustomerMobileNumber:customerNumber}).sort({orderTime:1}).exec();    
}
function statudOfFood(req) {
    let that = this;
    let customerNumber = req.query.CallFrom;
    console.log(customerNumber)
    var availabiltyOfItem = checkStatus(customerNumber);
    return availabiltyOfItem.then((res) => res
    ).then((res) => res[res.length-1])
    .then((res)=> {
        if (res == undefined) throw new Error("unble to find your order");
      if (res.orderStatus == 'confirm' ) {
          return res 
      } else {
     throw new Error("your order already  delivered");
      }
    })
    .catch((err)=> {
        return err;
    });
}

module.exports = statudOfFood;
