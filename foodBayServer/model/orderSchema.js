var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    Customername: { type: String, default: 'unknown' },
    CustomerMobileNumber: Number,
    orderedItem: {
        foodId :Number,
        foodName: String,
        quantity: Number,
        totalAmount: Number,
        deliveryboynumber:Number
    },
    orderStatus: String,
    orderTime:{type:Date,default: new Date()}
});
module.exports = orderSchema;