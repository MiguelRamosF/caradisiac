var express = require('express');  
var router = express.Router();
var elastic = require('../elasticsearch');

/* GET cars */
router.get('/allcars/:input', function (req, res, next) {  
  elastic.getCars(req.params.input).then(function (result) {res.json(result) });
});

router.get('/cars/', function (req, res, next) {  
  elastic.getCarsHighVolume().then(function (result) {res.json(result) });
});

router.get('/populate/', function (req, res, next) {  
  elastic.deleteIndex()
    .then(()=>{elastic.bulkCars().then(function (result) {res.json(result) })})
    .catch(err=>console.log(err))
});

/* POST car to be indexed */
router.post('/', function (req, res, next) {  
  elastic.addCar(req.body).then(function (result) { res.json(result) });
});

module.exports = router;