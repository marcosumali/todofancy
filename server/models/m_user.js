var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    // todolist: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Todo'
    // }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;