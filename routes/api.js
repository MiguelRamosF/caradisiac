const express = require ('express');
const router = express.Router();
const Brands = require('../models/brands');

// get a list of brands from the db
router.get('/brands', function(req, res, next){
    Brands.find({}).then(function(brand){
        res.send(brand);
    }).catch(next);
});

// add a new brand to the db
router.post('/brands', function(req, res, next){
    Brands.create(req.body).then(function(brand){
        res.send(brand);
    }).catch(next);
});

module.exports = router;