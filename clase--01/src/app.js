//MOCK: es una imitación de un dato real. Es una simulacion que generamos en el entorno de desarrollo para no manipular datos reales y tener herramientas de trabajo de forma rápida. 

import express from "express"; 
import usuariosRouter from "./routes/usuarios.router.js"; 
const app = express(); 
const PUERTO = 8080; 

app.use("/api/users", usuariosRouter);

app.listen(PUERTO, () => console.log("Escuchando en el 8080")); 