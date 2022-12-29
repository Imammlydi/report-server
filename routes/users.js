var express = require('express');
var router = express.Router();
const Users = require('../controllers/usersMysql')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register' , Users.registerUsers);
router.get('/register' , Users.getUsers);
router.put('/register/:id' , Users.updateUsers);
router.delete('/register/:id' , Users.deleteUsers);

module.exports = router;
