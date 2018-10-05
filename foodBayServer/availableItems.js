const mongoose = require('mongoose');
const itemSchema = require('./model/ItemSchema');
const Item = mongoose.model('Item', itemSchema);
var  availableItemsList ;
function availableItems(){
   return  Item.aggregate([{$match: {available: {$gt: 0}}},{$sort:{foodId:1}}],function(err, result){
      if (err) throw err;
    return result;
    })
}

module.exports = availableItems;




