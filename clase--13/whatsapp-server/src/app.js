import express from "express"; 
import qrcode from "qrcode-terminal"; 
import { Client } from "whatsapp-web.js";
import cors from "cors"; 

const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(cors()); 

//Vamos a inicializar el cliente de WhatsApp: 
const client = new Client({
    //Configuración de puppeteer: 
    puppeteer: {
        headless: true
        //Ejecuta en el modo "headless" en el navegador, sin mostrar la interfaz grafica. 
    }
})

//Variable para ayudarme en el proceso de autenticación: 
let estaAutenticado = false; 

//Generamos el QR de autenticación: 

client.on("qr", qr => {
    //Usamos qrcode para generar y mostrar el código QR en la terminal: 
    qrcode.generate(qr, {small: true}); 
})

//Evento cuando confirmamos que el cliente esta listo para enviar mensajes: 

client.on("ready", () => {
    console.log("Cliente de WhatsApp listo"); 
    estaAutenticado = true; 
})

//Manejamos errores en caso de que existan, pero como somos seres perfectos esto nunca nos va a pasar a nosotros. 
client.on("auth_failure", msg => {
    console.log("Error de autenticacion: ", msg );
})

//Inicializamos el cliente: 
client.initialize(); 

//Rutas: 

//Ruta para enviar un mensaje: 
app.post("/send-message", (req, res) => {
    //Paso 1: Verificamos la autenticación: 
    if(!estaAutenticado) {
        //Si no escaneaste el qr, respondemos con un error: 
        return res.status(400).json({error: "Cliente no autenticado, escanea el QR primero gatooo"}); 
    }

    //Paso 2: Obtener los datitos del cuerpo de la solicitud: 
    const {numeroDestino, mensajeDestino} = req.body; 
    

    //Paso 3: Formatear el ID del Chat
    //El número de telefono debe tener un sufijo "@c.us". Entonces vamos a formatear el número recibido para que tenga esta caracteristica. 
    const chatId = `${numeroDestino}@c.us`

    //Paso 4: Enviar el mensaje a traves de WhatsApp Web.
    client.sendMessage(chatId, mensajeDestino)
        .then(response => {
            res.json({success: true, response})
        })
        .catch(error => {
            console.log("Error al enviar el mensaje: ", error); 
            res.status(500).json({error: "No se pudo enviar el mensaje", details: error});
        })
})


//Iniciamos el servidor: 
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`); 
})

