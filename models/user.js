
// models/Product.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    
    name: { type: String, required: false },
   Lname: { type: String, required: false },
   password: { type: String, required: true },
    tel: { type: String, required: false }
},
{Timestamp : true, versionKey : false}
);

module.exports = mongoose.model('User', userSchema);