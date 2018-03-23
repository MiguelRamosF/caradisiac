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

//saveCars()
function readJson(){
    var data=fs.readFileSync('cars.json', 'utf8');
    var words=JSON.parse(data);
    //console.log(words[2]);

}
readJson();


//Store all the models received from the car - api in the caradisiac index (elasticsearch)
function IndexCars() {
    var data=fs.readFileSync('cars.json', 'utf8');
    var cars=JSON.parse(data);
    cars.map((car,index) => {
        client.create({
            index: 'caradisiac',
            type: 'cars',
            id: index,
            body: {
                brand: car.brand,
                image: car.image,
                model: car.model,
                volume: car.volume,
                uuid: car.uuid,
                name: car.name,
            }
        }, function (error, response) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("create", response);
            }
        });
    });
}

IndexCars()





