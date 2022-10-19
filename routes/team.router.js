const express = require('express');
const Controllers = require('../controllers/index');

class RouterClass{
    constructor(){
        this.router = express.Router();
    }

    routes(){
        this.router.get('/get-users/', (req, res) => {
            Controllers.team.getAll(req,res)
        })
        this.router.get('/get-data/', (req, res) => {
            Controllers.data.getAdminData(req,res)
        })
    }

    init(){
        this.routes();
        return this.router;
    }
}
module.exports = RouterClass;
