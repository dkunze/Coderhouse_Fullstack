/*
>> Consigna: Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos. 
En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.
*/

const express = require("express")
const bodyParser = require('body-parser'); // we need to install a middleware called body-parser, which helps us decode the body from an HTTP request
const cors = require('cors'); // this is optional - Since we are calling the API from different locations by hitting endpoints in the browser. We also have to install the CORS middleware

const app = express()
const productRoutes = require("./routes/products")

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Convierte todo lo que venga a json
app.use(express.json())

// Routing with Products as exported module
app.use("/api/productos", productRoutes)

// Retrieve index.html file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

// Open the server
app.listen('8080', () => {
    console.log('Server running at port 8080')
})