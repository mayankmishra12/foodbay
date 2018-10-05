const mongoose = require('mongoose');
const orderSchema = require('./model/orderSchema');
const selecteditemSchema = require('./model/SelectedItemSchema');
const orders = mongoose.model('orders', orderSchema);


function orderslist(req) {
     return orders.find({})
    .then((res)=>{
        if(res == null || undefined) throw new Error("unblr to find items")
        return res;
    })
    .catch((err)=>err)   
}
module.exports = orderslist;