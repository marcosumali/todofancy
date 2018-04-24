const ModelUser = require('../models/m_user');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var sendemail = require('../helpers/nodemailer.js');

const saltRounds = Number(process.env.SALTROUNDS);
const secretKey = process.env.SECRETKEY;

class ControllerUser {

    static findUsers(req,res) {
        ModelUser.find(function(err,result){
            if(err) {
                res.status(404).json({
                    message: 'Error: Not found'
                })
            } else {
                res.status(200).json({
                    message: 'Find all user successful !',
                    users: result
                })
            }
        })

        // ModelUser.find()
        // .populate('todolist')
        // .exec()
        // .then(result => {
        //     res.status(200).json({
        //         message: 'Find all user successful !',
        //         users: result
        //     })
        // })
        // .catch(err => {
        //     res.status(404).json({
        //         message: 'Error: Not found'
        //     })
        // })
    }


    static findOneUser(req,res) {
        let {email,password} = req.body;
        // console.log('user js body',req.body);

        ModelUser.findOne({email: email}, function(err,result) {
            // console.log(result);

            if (email == '' || !email || password == '' || !password) {
                res.status(400).json({
                    message: 'Error: Username or password is null',

                })

            } else {
                let hashCheck = bcrypt.compareSync(password, result.password); // true
                // console.log('hasil check hash',hashCheck);    

                if (hashCheck) {
                    let token = jwt.sign({id: result.id}, secretKey);
                    // console.log(token);
    
                    res.status(201).json({
                        message: 'Find one user successful!',
                        user: result,
                        token: token
                    })
    
                } else {
                    res.status(400).json({
                        message: 'Error: Bad Request Find One User',
    
                    })
                    
                }
    
            } 

            // if (result.password === password) {
            //     res.status(201).json({
            //         message: 'Find one user successful!',
            //         user: result
            //     })
            // } else {
            //     res.status(400).json({
            //         message: 'Error: Bad Request Find One User'
            //     })
            // }
        })
    }

    static add(req,res) {
        let {first_name,last_name,email,password} = req.body;
        let hash = bcrypt.hashSync(password, saltRounds);

        let objUser = {
            first_name,
            last_name,
            email,
            password: hash
        }
        // console.log(objUser);

        let newUser = new ModelUser(objUser);

        newUser.save((err,result) => {
            if(err) {
                res.status(400).json({
                    message: 'Error: Bad Request Add New User'
                })
            } else {
                let token = jwt.sign({id: result.id}, secretKey);

                // console.log('ini test new user send email', result.email);
                sendemail(result.email);

                res.status(201).json({
                    message: 'Add new user successful!',
                    user: result,
                    token: token
                })
            }
        })
    }


    static update(req,res) {
        let id = req.params.id

        let objUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }

        ModelUser.findOneAndUpdate({_id: ObjectId(id)}, objUser, function(err,result) {
            if(err) {
                res.status(400).json({
                    message: 'Error: Bad Request Update User'
                })
            } else {
                res.status(200).json({
                    message: 'Update user data successful!',
                    user_before: result
                })
            }
        })
    }

    static delete(req,res) {
        let id = req.params.id;

        ModelUser.deleteOne({_id: ObjectId(id)}, function(err,result) {
            if(err) {
                res.status(400).json({
                    message: 'Error: Bad Request Delete User'
                })
            } else {
                res.status(200).json({
                    message: 'Delete user data successful!',
                    user_to_delete: result
                })
            }
        })


    }


}


module.exports = ControllerUser;