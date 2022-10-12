const express = require('express');
const Controllers = require('../controllers/index');

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.post('/create-post', (req, res) => {
            Controllers.post.createOne(req,res)
        })
        this.router.get('/get-posts', (req, res) => {
            Controllers.post.getPublishedPosts(req,res)
        })
        this.router.get('/get-drafts', (req, res) => {
            Controllers.post.getDrafts(req,res)
        })
        this.router.get('/:id', (req, res) => {
            Controllers.post.getOne(req,res)
        })
        this.router.post('/publish-post', (req, res) => {
            Controllers.post.publishPost(req,res)
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
