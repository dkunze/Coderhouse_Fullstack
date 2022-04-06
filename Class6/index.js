/*
>> Consigna:
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
*/
const fs = require("fs")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

let productJson = null
let productRandom = null

class Container {
    constructor(name) {
        this.name = name
    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está
    async getById(id) {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let getData = JSON.parse(readFile)

            let search = getData.filter(d => {
                return d.id === id
            })
            productRandom = search
        } catch (err) {
            throw err
        }
    }

    // Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            productJson = JSON.parse(readFile)
        } catch (err) {
            throw err
        }
    }
}

let files = new Container("public/productos.json")

app.get("/productos", async (req, res) => {
    await files.getAll()
    res.send(productJson)
})

app.get("/productosRandom", async (req, res) => {
    let numberRandom = parseInt(Math.random() * (25 - 1) + 1)
    await files.getById(numberRandom)
    res.send(productRandom)
})

app.listen(PORT, () => {
    console.log("Server run on port " + PORT)
})
