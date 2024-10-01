/** CLASE 2 - OPTIMIZACIÓN  **/

//1) Compresión
//2) Manejo personalizado de errores. 

import express from "express"; 
const app = express(); 
const PUERTO = 8080; 
import compression from "express-compression"; 
import usuariosRouter from "./routes/usuarios.router.js"; 
import manejadorError from "./middleware/error.js";

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(compression({
    brotli: {
        enabled: true, 
        zlib: {}
    }
}));


//Rutas

app.get("/", (req, res) => {
    let string = "Hola comisión, somos programadores y no sabemos arreglar impresoras";
    
    for (let i = 0; i < 5e4; i++ ) {
        string += "Hola comisión, somos programadores y no sabemos arreglar impresoras";
    }
    res.send(string); 
})


app.use("/usuarios", usuariosRouter);
app.use(manejadorError);

app.listen(PUERTO, () => console.log("Trabajando en 8080")); 

//Datos: 

//Sin compresión: 3.4 mb
//Con compresión: 11.9 kb
//Con brotli: 357bytes


//La compresión de brotli es considerablemente más efectiva que gzip. Sin embargo, utilizarlo como middleware implica un uso del algoritmo de compresión que consume más recursos, por lo que existe una nivelación entre tiempo de compresión y efectividad.

//Middleware para el manejo de errores: 
//Vamos a desarrollar nuestra propia gestión interna de errores y para lograr esto necesitamos 3 cosas: 

//1) Un middleware de recepción de errores. 
//2) Un generador personalizado de errores. 
//3) Un diccionario de errores. 