var express = require('express');
const ControllerUser = require('../controllers/c_user');

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router
  .get('/', ControllerUser.findUsers)
  .post('/register', ControllerUser.add)
  .post('/login', ControllerUser.findOneUser)
  .put('/:id', ControllerUser.update)
  .delete('/:id', ControllerUser.delete)


module.exports = router;
