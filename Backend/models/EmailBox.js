const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    FullName: {type: String, require: true},
    email: {type: String, require: true},
    Subject: {type: String, require: true},
    Message: {type: String, require: true}
});

module.exports = mongoose.model('email',emailSchema);
