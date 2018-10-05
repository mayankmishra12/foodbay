var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({ 
   foodId:{type :Number, required:true},
   foodName:{type :String, required:true},
   price:{type :Number, required:true},
   available:{type :Number, required:true},
});
module.exports =itemSchema;

  