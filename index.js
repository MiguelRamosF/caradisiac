const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const { getBrands } = require('node-car-api');
const { getModels } = require('node-car-api');
var documents = require('./routes/documents');  
var elastic = require('elasticsearch');
// set up express app
const app = express();
app.use('/documents', documents);

elastic.indexExists().then(function (exists) {  
    if (exists) {
      return elastic.deleteIndex();
    }
  }).then(function () {
    return elastic.initIndex().then(elastic.initMapping).then(function () {
      //Add a few titles for the autocomplete
      //elasticsearch offers a bulk functionality as well, but this is for a different time
      var promises = [
        'Thing Explainer',
        'The Internet Is a Playground',
        'The Pragmatic Programmer',
        'The Hitchhikers Guide to the Galaxy',
        'Trial of the Clone'
      ].map(function (bookTitle) {
        return elastic.addDocument({
          title: bookTitle,
          content: bookTitle + " content",
          metadata: {
            titleLength: bookTitle.length
          }
        });
      });
      return Promise.all(promises);
    });
  });
  

// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//     host: 'localhost:9200',
//     log: 'trace'
// });


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
//readJson();


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

//IndexCars()





