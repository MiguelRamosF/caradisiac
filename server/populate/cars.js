const fs = require("fs");
const { getBrands } = require('node-car-api');
const { getModels } = require('node-car-api'); 


//Stores cars models recieved from the node-car-api into a JSON file
async function saveCars() {
    var cars = [];
    const brands = await getBrands();
    for (var i = 0; i < brands.length; i++) {
        console.log("Getting cars from brand : "+brands[i])
        const models = await getModels(brands[i])
        cars = cars.concat(models);
    }
    fs.writeFile("cars.json", JSON.stringify(cars, null, 2), function (err) {
        if (err) console.error(err);
        else {
            console.log('\nCars saved in cars.json')
        }
    });
    console.log(cars);
    console.log("Total of " + cars.length + "cars added to cars.json");
}
