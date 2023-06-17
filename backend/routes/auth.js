const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middlewere/fetchuser');
const JWT_SECRET = 'sherisagood$boy'


// 🚩 🚩
// CREATING A NEW USER

// ROUTE NO. 1 craete a user using post '/api/auth/createuser' . No login Reqiured


router.post('/createuser', [
    body('name', 'name at leatst three characters 😁').isLength({ min: 3 }),
    body('email', 'inavlid email 😁').isEmail(),
    body('password', 'password must be at least 5 chracters 😁').isLength({ min: 5 }),
], async (req, res) => {
    let success = true;

    // if there are errors return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success ,  errors: errors.array() });
    }
    // Check wheather th User with this Email  Exists already 
    try {
        let user = await User.findOne({ email: req.body.email })
        let nam = await User.findOne({ email: req.body.name })
        if (user || nam) {
            success = false;
            return res.status(400).json({ success , error: 'sorry a user with  already exists 🙉  ' })

        }
        // :smile
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // Create a new User

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success ,  authtoken })

    }
    // catch errors 
    catch (error) {
        console.log(error.message);
        res.status(500).send("some error has occured 😏");
    }
})
// 🚩 🚩
//    LOGIN

//  ROUTE NO.2  authenticate a  using post '/api/auth/login' . User must be created 


router.post('/login', [
    body('email', 'inavlid email').isEmail(),
    body('name', 'name cannot be blank')
], async (req, res) => {
    let success = true;
    // if there are errors return bad request and the errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, name } = req.body;
    try {
        let user = await User.findOne({ email });
        let username = await User.findOne({ name });
        if (!user || !username ) {
            success = false;
            return res.status(400).json({ success , error: "Please try to login with correct credentials 😏 " })

        }
        



        //    // Passwords match
        //    console.log('Passwords match!');
        //  } else {
        //    // Passwords don't match
        //    console.log('Passwords do not match!');
        //  }
        // if(!passwordcompare){
        //     return res.status(800).json({error :"Please try to login with correct credential "});
        //     //  return console.log(passwordcompare);

        // }
        // in ideal casses 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success ,  authtoken });
        
        success = true;
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error occured 😠 ");
    }

});
// 🚩 🚩
// GETTING DETAILS OF THE LOGIND USER

// ROUTE NO.3   get logind user details using POST "api/auth/getuser" . Login reqiured

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)


    } catch (error) {
        console.log(error.message);
        res.status(800).send("Internal Server Error occured 😠 ");

    }
})

module.exports = router