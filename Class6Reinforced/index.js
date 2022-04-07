/*
>> Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
*/
const express = require("express")
const Contenedor = require('./Contenedor.js').Container;

let files = new Contenedor("public/productos.json")
let productJson = []
let productRandom = null

const app = express()
const PORT = process.env.PORT || 8080

app.get("/productos", async (req, res) => {
    await files.getAll().then((res) => {
        productJson = res
    })
    res.send(productJson)
})

app.get("/productosRandom", async (req, res) => {
    if (productJson.length === 0) {
        await files.getAll().then((res) => {
            productJson = res
        })
    }
    let numberRandom = parseInt(Math.random() * (productJson.length - 1) + 1)
    await files.getById(numberRandom).then((res) => {
        productRandom = res
    })
    res.send(productRandom)
})

app.listen(PORT, () => {
    console.log("Server run on port " + PORT)
})