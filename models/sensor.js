const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({}, { collection: 'test1', strict: false }); 

module.exports = mongoose.model('Test', testSchema);
