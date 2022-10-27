const express = require('express');
const Controllers = require('../controllers/index');
const upload = require("../middleware/upload.middleware");

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/get-user/:id', (req, res) => {
            Controllers.auth.readOne(req,res)
        })
        this.router.get('/users', (req, res) => {
            Controllers.auth.readAll(req,res)
        })
        this.router.post('/register', (req, res) => {
            Controllers.auth.createOne(req,res)
        })
        this.router.post('/login', (req, res) => {
            Controllers.auth.login(req,res)
        })
        this.router.post('/check-user-token', (req, res) => {
            Controllers.auth.checkAccessToken(req,res)
        })
        this.router.post('/edit-user/:id', (req, res) => {
            Controllers.auth.updateOne(req,res)
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
