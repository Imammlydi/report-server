const router = require('express').Router();
const adminController = require('../controllers/adminMysql')

router.post('/signin', adminController.actionSignIn);
router.get('/signin', adminController.viewSignIn);
router.get('/logout', adminController.actionLogout);   
router.get('/dashboard', adminController.viewDashboard);

//ROLE & USER
router.get('/role', adminController.viewRolesUser);
router.get('/user', adminController.viewUser);
router.get('/user/:id', adminController.view_detail_user);
router.post('/userrole', adminController.createUserRole);
router.delete('/userrole/:id', adminController.deleteUserRole);
router.post('/user', adminController.createUser);
router.put('/role', adminController.updateUser);


// VIEW INSPECTOR
router.post('/inspector', adminController.createInspector);
router.get('/inspector', adminController.viewInspector);
router.put('/inspector', adminController.updateInspector);
router.delete('/inspector/:id', adminController.deleteInspector);



// ENGINEER
router.get('/engineer', adminController.viewEngineer);
router.post('/engineer', adminController.createEngineer);
router.put('/engineer', adminController.updateEngineer);
router.delete('/engineer/:id', adminController.deleteEngineer);



//REPORT
router.get('/report', adminController.viewReport);
router.get('/report/:id', adminController.view_detail_report);
router.delete('/report/:id', adminController.deleteReport);


module.exports = router;