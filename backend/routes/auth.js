const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    forgotPassword,
    resetPassword,
    getUserProfile, 
    updatePassword,
    updateProfile,
    googlelogin,
    facebooklogin,
    logout } = require('../controllers/userController');


const { isAuthenticatedUser } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/googlelogin').post(googlelogin);
router.route('/facebooklogin').post(facebooklogin);


router.route('/logout').get(logout);





module.exports = router;