//import express from 'express'
//import cors from 'cors'

const express = require('express');
const app = express(); 
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