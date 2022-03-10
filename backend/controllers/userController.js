const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary');
const crypto =require('crypto');
const fetch = require('node-fetch');

// Register a user   => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {


    const { fname, lname, email, country, password } = req.body;

    const user = await User.create({
        fname,
        lname,
        email,
        country,
        password,
    })

    sendToken(user, 200, res)

})

// Login User  =>  /a[i/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Veuillez saisir votre email et votre mot de passe', 400))
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Email ou mot de passe invalide', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Email ou mot de passe invalide', 401));
    }

    sendToken(user, 200, res)
})


// Forgot Password   =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('Utilisateur introuvable avec cet e-mail', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'BAGNGO Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

})

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Le jeton de réinitialisation du mot de passe n est pas valide ou a expiré', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Le mot de passe ne correspond pas', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Ancien mot de passe est incorrect'));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})
// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {

        fname: req.body.fname,
        lname: req.body.lname,
        country: req.body.country,
        email: req.body.email,
  

    }

    // avatar to do

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

exports.facebooklogin = catchAsyncErrors(async (req, res) => {
        const {userID, accessToken} = req.body;

        let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
        fetch(urlGraphFacebook, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response => {
            const {email, name} =response;
            User.findOne({email}).exec((err, user) => {
                if(err) {
                    return res.status(400).json({
                        error: "Something went wrong..."
                    })
                }else {
                    let password = email+process.env.JWT_SECRET;
                    let newUser = new User({name, email, password});
                    newUser.save((err, data) => {
                        if(err) {
                            return res.status(400).json({
                                error: "Something went wrong..."
                            })
                        }
                        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, JWT_EXPIRES_TIME);
                        const {_id, name, email} = data;

                        res.json({
                            token,
                            user: {_id, name, email}
                        })
                    })
                }
            })
        })
    })

exports.googlelogin = catchAsyncErrors(async (req, res) => {


})



// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Déconnecté'
    })
})
