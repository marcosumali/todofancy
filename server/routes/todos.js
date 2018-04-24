var express = require('express');
const ControllerTodo = require('../controllers/c_todo');

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with todos');
// });

router
  .get('/', ControllerTodo.findTodos)
  .post('/find', ControllerTodo.findOneUser)
  .post('/', ControllerTodo.add)
  .put('/:id', ControllerTodo.update)
  // .delete('/:id', ControllerTodo.delete)
  .post('/delete', ControllerTodo.delete)


module.exports = router;
