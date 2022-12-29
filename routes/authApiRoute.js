const router = require('express').Router();
const autApiController =require('../controllers/authApiController');


router.post('/api', autApiController.actionSignIn);


module.exports = router;