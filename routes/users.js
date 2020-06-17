//register a user

const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check')


const User = require('../models/User')


// @route    POST api/users
//@desc    Register a user
// @access    Public 
router.post('/', [
    // setting up the checks
    // check('field you want to check', 'message you want to display')
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({min:6})
], async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructoring req.body
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({email});
    
    // if user resturns as true (user already exist)
        if(user){
            return res.status(400).json({mesg: 'User already exists'})
        }

    // creating a new instance of a User
        user = new User({
            name,
            email,
            password
        })

        // need salt to encrypt password
        // takes .genSalt('takes how much salt it is default is 10')
        // returns a promise // Need await
        const salt = await bcrypt.genSalt(10)

        // Encrypting password hashing
        // bcrypt.hash(takes plane word password, salt) returns a promise
        // use await
        user.password = await bcrypt.hash(password, salt);

        // save the user
        await user.save();

        // Creating object we want to send in token 
        // just send user id in payload 
        const payload = {
            user: {
                id: user.id
            }
        }

        // Set up jwt.sign (takes payload, jwtSecret, {object of options}, Callback )
        // jwtSecret should be set up in config file
        // expiresIn set to 3600 = 1hr 
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;
              res.json({ token }) 
        });

        // Handling error
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
    
})



module.exports = router