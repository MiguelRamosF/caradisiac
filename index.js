const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const { getBrands } = require('node-car-api');
const { getModels } = require('node-car-api');

const Brands = require('./models/brands');


var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


async function saveCars() {
    var cars = [];
    const brands = await getBrands();
    for (var i = 0; i < brands.length; i++) {
        const models = await getModels(brands[i])
        cars = cars.concat(models);
    }

    fs.writeFile("cars.json", JSON.stringify(cars, null, 2), function (err) {
        if (err) console.error(err);
        else {
            console.log('\nCars saved in cars.json')
        }
    });
    //console.log(cars);
}




saveCars()


//Store all the brands received from the car - api in the caradisiac index (elasticsearch)
// async function IndexBrands() {
//     try {
//         const brands = await getBrands()
//         brands.map((brand, index) => {
//             client.create({
//                 index: 'caradisiac',
//                 type: 'brands',
//                 id: index,
//                 body: {
//                     name: brand,
//                 }
//             }, function (error, response) {
//                 if (error) {
//                     console.log(error);
//                 }
//                 else {
//                     console.log("create", response);
//                 }
//             });
//         })
//     } catch (err) {
//         console.log(err)
//     }
// }

//Store all the models received from the car - api in the caradisiac index (elasticsearch)
// async function IndexModels() {
//     try {
//         const brands = await getBrands()
//         const promises = brands.map(async (brand) => {
//             const models = await getModels(brand)
//             return models
//         })

//         Promise.all(promises).then(models=>{
//             console.log(models);
//models.forEach(element=>{console.log(element)});
// models.map((model, index) => {
//     client.create({
//         index: 'caradisiac',
//         type: 'models',
//         id: index,
//         body: {
//             brand: model.brand,
//             image: model.image,
//             model: model.model,
//             volume: model.volume,
//             uuid: model.uuid,
//             name: model.name,
//         }
//     }, function (error, response) {
//         if (error) {
//             console.log(error);
//         }
//         else {
//             console.log("create", response);
//         }
//     });
// })     
//         })

//     } catch (err) {
//         console.log(err)
//     }
// }

// IndexModels()





