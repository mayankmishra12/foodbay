var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var selecteditemSchema = new Schema({ 
   foodId:Number,
   orderTime:{type:Date,default: new Date()},
   CustomerMobileNumber: Number,

});
module.exports =selecteditemSchema;