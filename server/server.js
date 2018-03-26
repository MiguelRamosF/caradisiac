const express = require('express');
const bodyParser = require('body-parser');
var elastic = require('./elasticsearch');

// set up express app
const app = express();
app.use('/api',require('./routes/api'));

//set up static files
app.use(express.static('../public'));

app.listen(9292, function () {
    console.log('Listening server on port 9292');
});


// //Store all the models received from the car - api in the caradisiac index (elasticsearch) limited to 200 entries
// function IndexCars() {
//     var data=fs.readFileSync('cars.json', 'utf8');
//     var cars=JSON.parse(data);
//     cars.map((car,index) => {
//         elastic.addCar({
//                 brand: car.brand,
//                 image: car.image,
//                 model: car.model,
//                 volume: car.volume,
//                 uuid: car.uuid,
//                 name: car.name
//             })
//         })
// }





