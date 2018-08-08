const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(user => {
            res.status(200).json(user);
        });
});

router.get('/:id', (req,res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if(!user) res.status(404).send();
            res.status(200).json(user);
        }).catch(err => res.status(404))
    //     .then(function(userID){
    //     if(usedID) {
    //         console.log('/:id')
    //         return res.status(200).json(userID)
    //     } else {
    //         console.log('error');
    //         res.status(404).send('User does not exist');

    //     }
    // })
});

router.post('/', (req,res) => { 
    User(req.body)
        .save()
        .then(User => {
            res.status(201).json(User);
        });
});

router.put('/:id', (req,res) => {
    User
        .findByIdAndUpdate(req.params.id)
        .then(user => {
            if(!user) res.status(404);
            res.status(204).json(user);
        }).catch(err => res.status(404).send());
});

router.delete('/:id', (req,res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(user => {
            if(!user) res.status(404).send();
            res.status(200).json(user);
        }).catch(err => res.status(500).send());
});


module.exports = router;