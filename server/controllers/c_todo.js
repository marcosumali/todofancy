const ModelTodo = require('../models/m_todo');
const ObjectId = require('mongodb').ObjectID;
var jwt = require('jsonwebtoken');

class ControllerTodo {

    static findOneUser(req,res) {
        let token = req.body.token;

        if (token) {
            let decoded = jwt.decode(token, {complete:true});
            let id = decoded.payload.id;
            // console.log('ini dari jwt',decoded.payload.id);    
    
            ModelTodo.find({userId: ObjectId(id)})
            .populate('userId')
            .exec()
            .then(result => {
                // console.log(result);
                res.status(200).json({
                    message: 'Find specific todos successful !',
                    todos: result
                })
            })
            .catch(err => {
                res.status(404).json({
                    message: 'Error: Not found'
                })
            })
        }


    }


    static findTodos(req,res) {
        // ModelTodo.find(function(err,result){
        //     if(err) {
        //         res.status(404).json({
        //             message: 'Error: Not found'
        //         })
        //     } else {
        //         res.status(200).json({
        //             message: 'Find all todos successful !',
        //             todos: result
        //         })
        //     }
        // })

        ModelTodo.find()
        .populate('userId')
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Find all todos successful !',
                todos: result
            })
        })
        .catch(err => {
            res.status(404).json({
                message: 'Error: Not found'
            })
        })



    }

    static add(req,res) {
        let {token,description} = req.body;

        if(token) {
            let decoded = jwt.decode(token, {complete:true});
            let id = decoded.payload.id;
            // console.log('ini dari jwt addtodo',decoded.payload.id);    

            let objTodo = {
                userId: id,
                description
            }
            // console.log(objTodo);
    
            let newTodo = new ModelTodo(objTodo);
    
            newTodo.save((err,result) => {
                if(err) {
                    res.status(400).json({
                        message: 'Error: Bad Request Add New Todo'
                    })
                } else {
                    res.status(201).json({
                        message: 'Add new todo successful!',
                        todo: result
                    })
                }
            })    
            

        }
    }


    static update(req,res) {
        let id = req.params.id

        let objTodo = {
            userId: req.body.userId,
            description: req.body.description
        }

        ModelTodo.findOneAndUpdate({_id: ObjectId(id)}, objTodo, function(err,result) {
            if(err) {
                res.status(400).json({
                    message: 'Error: Bad Request Update Todo'
                })
            } else {
                res.status(200).json({
                    message: 'Update todo data successful!',
                    todo_before: result
                })
            }
        })
    }

    static delete(req,res) {
        // let id = req.params.id;
        let {id,token} = req.body;
        // console.log('masuk delete todo')
        // console.log(id, token);

        if(token) {
            ModelTodo.deleteOne({_id: ObjectId(id)}, function(err,result) {
                if(err) {
                    res.status(400).json({
                        message: 'Error: Bad Request Delete Todo'
                    })
                } else {
                    res.status(200).json({
                        message: 'Delete todo data successful!',
                        id_todo: id,
                        todo_to_delete: result
                    })
                }
            })
        }

    }


}


module.exports = ControllerTodo;