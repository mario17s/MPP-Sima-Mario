//import express from 'express'
//import cors from 'cors'

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express(); 
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');
app.use(express.json());
app.use(cors());


let countriesList = [
    {
        id: 1,
        name: "Germany",
        continent: "Europe",
        capital: "Berlin",
        population: 60,
        checked: false
    },
    {
        id: 2,
        name: "France",
        continent: "Europe",
        capital: "Paris",
        population: 70,
        checked: false
    }
  ];

//   io.on('connection', (socket) => {
//     console.log('Client connected');
  
//     // Send initial entities to the client
//     socket.emit('initialEntities', countriesList);
//   });

//   const createEntity = () => {
//     // Create a new entity
//     const newEntity = {
//       id: entities.length + 1,
//       name: "",
//       continent: "",
//       capital: "",
//       population: 3,
//       checked: false
//     };
  
//     // Add the new entity to the list
//     countriesList.push(newEntity);
  
//     // Emit the new entity to all connected clients
//     io.emit('newEntity', newEntity);
//   };
  
//   // Schedule creation of new entity every 10 seconds
//   setInterval(createEntity, 10000);
  
//   app.post('/createEntity', (req, res) => {
//     // Create a new entity manually (if needed)
//     createEntity();
  
//     res.status(201).json(countriesList[entities.length - 1]);
//   });


app.listen(8081, () =>{ 
    console.log("Listening...");
}); 

app.get('/', (req, res) => {
    res.status(200).send(countriesList);
})

app.get('/:idd', (req, res) => {
    const {idd} = req.params;
    let idx = parseInt(idd);
    res.status(200).send(countriesList.filter(c => c.id == idx));
})

app.post('/add', (req, res) => {
    let country = req.body;
    console.log(req.body);
    countriesList.push(country)
    res.status(201).sendStatus(201);
})

app.delete(`/del/:idx`, (req, res) => {
    const {idx} = req.params;
    let idxx = parseInt(idx)
    console.log(req);
    countriesList = countriesList.filter(c => {return c.id != idxx})
    console.log(countriesList);
    res.status(204).sendStatus(204);
})

app.put(`/upd/:idx`, (req, res) => {
    const {idx} = req.params;
    console.log(req);
    let idxx = parseInt(idx);
    let newobj = req.body;
    countriesList = countriesList.map(c => {
        if(c.id === idxx) return newobj
        else return c;
    })
    res.status(200).sendStatus(200);
})

module.exports = app;