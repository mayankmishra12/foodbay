var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CustomerSchema = new Schema({ 
    Customername: {type:String},
    CustomerNumber:{type:Number, default:'unknown'},
    orderItem:{
        itemId:{type:Number },
        itemName:String,
        price:{type:Number},
        totalCost:{type:Number}
    } });
module.exports = CustomerSchema;
