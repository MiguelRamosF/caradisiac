# CARADISIAC

**Before starting the server**, check your elasticsearch server is running and listenning the port 9200


**To run the server**, follow these commands:

```sh
npm install
cd server
node server.js
```

**To test the API**, go to :

`localhost:9292/api/cars`

It allows you to get the cars with the highest car boot volume


**Before populate:**

You can update the cars.json file by running (it takes around 3min):

```sh
cd server/populate
node cars.js
```
**Then go to**:

`localhost:9292/api/populate`

It allows you to index the updated cars models to elasticsearch

**You can check and test the results in client-side made with React**:
**Go to**:
`localhost:9292/index.html`


**Screenshots**:

`localhost:9292/api/cars`
![capture](https://github.com/MiguelRamosF/caradisiac/blob/master/img/Capture01.JPG)

`Updating cars.json`
![capture](https://github.com/MiguelRamosF/caradisiac/blob/master/img/Capture03.JPG)
![capture](https://github.com/MiguelRamosF/caradisiac/blob/master/img/Capture04.JPG)

`localhost:9292/api/populate`
![capture](https://github.com/MiguelRamosF/caradisiac/blob/master/img/Capture02.JPG)


`localhost:9292/index.html`
![capture](https://github.com/MiguelRamosF/caradisiac/blob/master/img/Capture05.JPG)

![capture](https://github.com/MiguelRamosF/caradisiac/blob/master/img/Capture06.JPG)








> Drive comfortably

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Objective - Workshop in 1 sentence](#objective---workshop-in-1-sentence)
- [How to do that?](#how-to-do-that)
  - [Stack](#stack)
- [Just tell me what to do](#just-tell-me-what-to-do)
- [Examples of steps to do](#examples-of-steps-to-do)
  - [Populate](#populate)
  - [List of cars](#list-of-cars)
- [MVP](#mvp)
  - [Client-side (bonus)](#client-side-bonus)
- [Don't forget](#dont-forget)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

[caradisiac.com](http://www.caradisiac.com/fiches-techniques) provides a tone of technical records related to car specification.

## Objective - Workshop in 1 sentence

**Build an api that get the list of cars with the higher rate and the higher volume (car boot)**

The api

* must listen port `9292`
* must provide endpoint `/populate` to index records to Elasticsearch
* must provide endpoint `/cars` that return list of cars with the higher car boot volume

## How to do that?

By indexing technical records from caradisiac to Elasticsearch and build an api with Node.js

### Stack

```
Node.js + ES6 + Elasticsearch
```

## Just tell me what to do

* Fork the project via `github`
* Clone your forked repository project `https://github.com/YOUR_USERNAME/caradisiac`

```sh
❯ cd /path/to/workspace
❯ git clone git@github.com:YOUR_USERNAME/caradisiac.git
```

* Follow the steps
* commit your different modifications:

```sh
❯ cd /path/to/workspace/caradisiac
❯ git add -A && git commit -m "feat(es): index in bulk all car records"
```

([why following a commit message convention?](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits))

* Don't forget to push before the end of the workshop **and** before the end of the dedicated sessions

```sh
❯ git push origin master
```

**Note**: if you catch an error about authentication, [add your ssh to your github profile](https://help.github.com/articles/connecting-to-github-with-ssh/).

1. If you need some helps on git commands, read [git - the simple guide](http://rogerdudler.github.io/git-guide/)

## Examples of steps to do

### Populate

1. use the package [node-car-api](https://github.com/92bondstreet/node-car-api) to get all records in json format
1. index - with bulk - all records to Elasticsearch

### List of cars

1. Build an api that provide endpoint `/populate`
1. Build an api that provide endpoint `/cars`
1. The `/cars` endpoint could be a ES query to fetch the right data


## MVP

1. Build an api that provide endpoint `/populate` to index records to Elasticsearch
1. Build an api that provide endpoint `/cars` that return list of 10 first cars with the higher car boot volume

### Client-side (bonus)

Display the list of the cars with React

## Don't forget

**Focus on api**

## Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
