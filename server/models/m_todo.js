var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: String,
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;