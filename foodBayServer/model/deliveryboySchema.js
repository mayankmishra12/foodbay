var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var deliveryboySchema = new Schema({
    mobilenumber: Number,
    name: String,
    status: String,
});
module.exports = deliveryboySchema;