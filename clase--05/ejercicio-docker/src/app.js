/** PRACTICA CON DOCKER **/

import express from "express";
const app = express(); 
const PUERTO = 8080; 

app.get("/", (req, res) => {
    res.send("HOLA, SOY DOCKER"); 
})

app.listen(PUERTO, () => console.log("Escuchando en 8080")); 