/** CLASE 04 - FLOGGERS Y TESTING DE PERFORMANCE **/

//Temas de hoy: 
//1) Que son los Logger
//2) Winston
//3) Test de Carga con Artillery
//4) Modelo de performance con Artillery

//////////////////////////////////////////

//LOGGERS: son herramientas que registran información importante sobre el funcionamiento de una aplicación mientras esta se ejecuta.  Estos registros son útiles para diagnosticar problemas, rastrear eventos y ver el rendimiento del sistema. 

//Winston: es una popular biblioteca de Logging para node js, usada ampliamente en el mundillo del backend. 

//Nivel: sistema de prioridad que tiene cada log. 
//Transporte: son los medios para enviar informacion ya sea a consola, email, texto, bd. 

import express from "express";
//Importamos el middleware de Winston: 
import addLogger from "./utils/logger.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
//Uso el addLogger: 
app.use(addLogger);

//Rutas
app.get("/saludito", (req, res) => {
    res.send("Olis!"); 
})

//Ruta para testear el warning: 
app.get("/warning", (req, res) => {
    req.logger.warn("¡Cuidado hombre radiactivo!"); 
    res.send("Prueba de Warning"); 
})

//Endpoint para probar tdos los logs: 

app.get("/loggertest", (req, res) => {
    req.logger.debug("Mensaje de Debug");
    req.logger.http("Mensaje de HTTP");
    req.logger.info("Mensaje de Info"); 
    req.logger.warning("Mensaje de Advertencia");
    req.logger.error("Mensaje de error"); 
    req.logger.fatal("Fatal ya casi muertos");

    res.send("Logs de test generados"); 
})

//Simulamos algunas operaciones: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0;

    for(let i = 0; i < 1000000; i++) {
        suma += i; 
    }

    res.send({suma}); 
})

app.get("/operacioncompleja", (req, res) => {
    let suma = 0;

    for(let i = 0; i < 5e8; i++) {
        suma += i; 
    }

    res.send({suma}); 
})


app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})

//Trabajamos con Artillery para testear nuestra App: 
//Es una herramienta que me permite simular multiples peticiones de informacion a mi servidor con la idea de testear el funcionamiento. 

//Lo instalamos de esta forma: 
//npm install -g artillery


//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json