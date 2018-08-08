const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs)
        });
});
router.get('/featured', (req, res) => {
    Blog
        .where("featured").equals(true)
        .then(blogs => {
            res.status(200).json(blogs)
        });
});
router.get('/:id', (req, res) => {
    Blog 
        .findById(req.params.id)
        // .then(blogs => {
        //     res.status(200).json(blogs)
        // }).catch(err => res.status(404));
        .then(function(blogID){
            if(blogID) {
                console.log('/:id')
                return res.status(200).json(blogID)
            } else {
                console.log('error');
                res.status(404).send('User does not exist');
    
            }
        })
});
router.post('/', (req, res) => {
    let dbUser = null;
    User
      .findById(req.body.authorId)
      .then(user => {
        dbUser = user;
        const newBlog = new Blog(req.body);
        newBlog.author = user._id;
        return newBlog.save();
      })
      .then(blog => {
        dbUser.blogs.push(blog)
        dbUser.save().then(() => res.status(201).json(blog));
        }).catch(err => res.status(200).send('not working'));
  });

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, (req.body))
        .then(blogs => {
            res.status(204).json(blogs)
        }).catch(err => res.status(404).send());
});
router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs)
        }).catch(err => res.status(404).send());
});



module.exports = router;