import cluster from "cluster";
import { cpus } from "os";
import express from "express";

const numeroDeProcesadores = cpus().length;
//console.log(numeroDeProcesadores); 

if (cluster.isPrimary) {
    console.log("Proceso primario");
    for (let i = 0; i < numeroDeProcesadores; i++) {
        cluster.fork();
    }

} else {
    console.log(`Me presento, soy un proceso worker con el id: ${process.pid}`);
    const app = express();

    app.get("/operacionsimple", (req, res) => {
        let suma = 0;
        for (let i = 0; i < 1000000; i++) {
            suma += i;
        }
        res.send({ suma });
    })

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0;
        for (let i = 0; i < 5e8; i++) {
            suma += i;
        }
        res.send({ suma });
    })

    app.listen(8080, () => console.log(`Escuchando en el puerto 8080`))
}

//Testeamos con Artillery: 

//artillery quick --count 40 --num 50 "http://localhost:8080/operacionsimple" -o simple.json

//artillery quick --count 40 --num 50 "http://localhost:8080/operacioncompleja" -o compleja.json