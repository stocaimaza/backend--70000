//npm install winston
//importamos: 
import winston from "winston";

//Primer Ejemplo:


// const logger = winston.createLogger({
//     //Le pasamos un objeto para crear un logger. 
//     //Configuramos el transporte a nivel consola. 
//     transports: [
//         new winston.transports.Console({level: "http"}),
//         //Agregamos un nuevo transporte: 
//         new winston.transports.File({
//             filename: "./errors.log", 
//             level: "warn"
//         })
//     ]
// })

/////////////////////////////////////////////////////////////////////
//Personalizamos nuestros niveles: 

const niveles = {
    nivel: {
        fatal: 0, 
        error: 1,
        warning: 2, 
        info: 3,
        http: 4,
        debug: 5
    } , 
    colores: {
        fatal: "red", 
        error: "yellow", 
        warning: "blue", 
        info: "green", 
        http: "magenta", 
        debug: "white"
    }
}


// const logger = winston.createLogger({
//     levels: niveles.nivel, 
//     transports: [
//         //Consola:
//         new winston.transports.Console({
//             level: "http", 
//             format: winston.format.combine(
//                 winston.format.colorize({colors: niveles.colores}),
//                 winston.format.simple()
//             )
//         }),

//         //Archivo: 
//         new winston.transports.File({
//             filename: "./errors.log", 
//             level: "warning", 
//             format: winston.format.simple()
//         })
//     ]
// })

//Logger multi entorno: 
//1) Se traen configObject. 
//2) Y toman el node_env del objeto configObject

const node_env = "desarrollo";

//3) Crean el devLogger y el prodLogger

const devLogger = winston.createLogger({
    levels: niveles.nivel, 
    transports: [
        new winston.transports.Console({
            level: "debug"
        })
    ]
})

const prodLogger = winston.createLogger({
    levels: niveles.nivel,
    transports: [
        new winston.transports.File({
            filename: "./desafio.log",
            level: "warning"
        })
    ]
})

//4) Pueden determinar cual usar con un ternario: 

const logger = node_env == "produccion" ? prodLogger : devLogger; 

//Creamos un Middleware: 

const addLogger = (req, res, next) => { 
    req.logger = logger; 
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next(); 
}

export default addLogger;