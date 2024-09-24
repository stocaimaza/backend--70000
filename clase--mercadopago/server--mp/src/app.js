//Backend de nuestra App con MercadoPago 
//instalamos: npm i express cors mercadopago

import express from "express";
import cors from "cors";
const app = express();
const PUERTO = 3000;

//Importamos herramientas de MercadoPago:
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
    accessToken: "APP_USR-5326111376048976-092321-93ede66b5b448b246176117bdcc2e7ea-2002752925"
});

//Middleware
app.use(cors());
app.use(express.json());

//Ruta 

// app.get("/", (req, res) => {
//     res.send("Soy el Server y no tengo miedo a nadaaaaa");
// })

app.post("/create-preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://www.mercadolibre.com.ar/",
                failure: "https://www.mercadolibre.com.ar/",
                pending: "https://www.mercadolibre.com.ar/"
            },
            auto_return: "approved",
        };
        const preference = new Preference(client);
        const result = await preference.create({ body });

        //Se lo enviamos al front: 
        res.json({
            id: result.id
        })
    } catch (error) {
        console.log(error);
        res.send("Error fatal!");
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})