var elasticsearch = require('elasticsearch');
const fs = require("fs");

const indexName = "caradisiac";
const typeName = "cars";

var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9200',
    log: 'info'
});

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "cars",
        body: {
            properties: {
                brand: {type: "text"},
                image: {type: "text"},
                model: {type: "text"},
                volume: {type: "text"},
                uuid: {type: "text"},
                name: {type: "text"},
            }
        }
    });
}
exports.initMapping = initMapping;

function addCar(car) {  
    return elasticClient.index({
        index: indexName,
        type: "cars",
        body: {
            brand: car.title,
            image: car.image,
            model: car.model,
            volume: car.volume,
            uuid: car.uuid,
            name: car.name
        }
    });
}
exports.addCar = addCar;

function getCars(input) {  
    return elasticClient.search({
        index: indexName,
        type: "cars",
        body: {
            from : 0, size : 100,
            query: {
                match: {
                    brand: input
                }
          }
        }
    })
}
exports.getCars = getCars;

//Index Json cars into elasticsearch (bulk for more than 200 entries)
function bulkCars() {
    const cars = [];
    var data=fs.readFileSync('./populate/cars.json', 'utf8');
    var carsJSON=JSON.parse(data);
    for(var i=0;i<carsJSON.length;i++){
        cars.push({index:{_index:indexName, _type:typeName, _id: i}})
        cars.push(carsJSON[i]);
    } 
    return elasticClient.bulk({"body":cars});
}
exports.bulkCars = bulkCars;

function getCarsHighVolume() {  
    return elasticClient.search({
        index: indexName,
        type: "cars",
        body: {
            from : 0, size : 100,
            query: {
                bool: {
                    must: [
                      {
                        range: {
                          volume: {
                            gt: 700
                          }
                        }
                      }
                    ]
                }
            }
        }
    })
}
exports.getCarsHighVolume = getCarsHighVolume;





 

