//Contacts CRUD routes

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Contact = require('../models/Contact');


// @route    GET api/contacts
//@desc    GET all users contacts
// @access    Private 
router.get('/', auth, async (req, res) => { 
    try {
        // set the contacts by finding Contact by user.id
        // Then sort it by most recent with date: -1
        const contacts = await Contact.find({ user: req.user.id }).sort({date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    POST api/contacts
//@desc    Add new contact
// @access    Private 
router.post('/', [ 
    auth, 
    [
        // setting up checks to make sure name is filled
    check('name', 'Name is required').not().isEmpty()
    ]
],
 async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, phone, type } = req.body;

    try {

        // setting up the new contact
        // using the initializing a new Instance of Contact
        // setting up the fields to whats inpute
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        // saving the newContact
        const contact = await newContact.save();

        // sending back the contact
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
 }
);

// @route    PUT api/contacts
//@desc      Update contact
// @access    Private 
router.put('/:id', auth, async (req, res) => { 
    const {name, email, phone, type } = req.body;

    // Build contact object
    // Checking if fields are submitted
    const contactField = {};

    // checks if these are included
    // adds to contact field
    if(name) contactField.name = name;
    if(email) contactField.email = email;
    if(phone) contactField.phone = phone;
    if(type) contactField.type = type;


    try {
        // Declaring contact with contact found with params id
        let contact = await Contact.findById(req.params.id);
        

        // Checking if contact found 
        if(!contact) return res.status(404).json({ msg:'Contact no found' });
        
        // Making sure user owns contact
        // checking if contact.user is equal to req.user.id(token) 
        // change contact.user to a string
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorize'})
        }


        // seting contact to the contactfield
        // Update
        contact = await Contact.findByIdAndUpdate(req.params.id, 
            {$set: contactField},
            { new: true});

            res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});






 // @route    DELETE api/contacts
//@desc      Delete contact
// @access    Private 
router.delete('/:id', auth, async (req, res) => { 
    try {
        // Declaring contact with contact found with params id
        let contact = await Contact.findById(req.params.id);
        

        // Checking if contact found 
        if(!contact) return res.status(404).json({ msg:'Contact no found' });
        
        // Making sure user owns contact
        // checking if contact.user is equal to req.user.id(token) 
        // change contact.user to a string
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorize'})
        }

        // No need for const variable
        // set up await with Contact and Remove
        // Dont use Delete(depricated)
        await Contact.findByIdAndRemove(req.params.id);

            res.json({msg: 'Contact Removed'});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }    
});

module.exports = router