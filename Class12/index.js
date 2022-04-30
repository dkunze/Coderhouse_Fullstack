const express = require("express")
const momentjs = require("moment")

const bodyParser = require('body-parser'); // we need to install a middleware called body-parser, which helps us decode the body from an HTTP request
const cors = require('cors'); // this is optional - Since we are calling the API from different locations by hitting endpoints in the browser. We also have to install the CORS middleware
const PORT = process.env.PORT || 8080

const app = express()
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Convierte todo lo que venga a json
app.use(express.json())

// Server 
const http = require('http');
const server = http.createServer(app);

// Socket
const { Server } = require('socket.io')
const io = new Server(server)

const ProductosApi = require("./api/methods.js").Container
let productosApi = new ProductosApi("public/products.json")

app.set("views", "./views")
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

// Data
let messages = []

// Connection 
io.on("connection", async (socket) => {
    console.log('User has been connected')

    // Retrieve Products
    let products = await productosApi.getAll().then((r) => {
        return r
    })
    socket.emit("products", products)

    // Create Products
    socket.on("addProduct", (data) => {
        let { title, price, thumbnail } = data
        let newProduct = { title, price, thumbnail }

        productosApi.save(newProduct).then(async (r) => {
            if (r.result === 'Success') {
                products = await productosApi.getAll().then((r) => r)
                io.sockets.emit("products", products) // multiple sockets     
            } else {
                console.log('Error', r.details)
                //res.send({ message: 'Error', details: r.details })
            }
        })
    })

    // Chat History
    messages.length > 0 && socket.emit("messages", messages)

    // Create Messages
    socket.on("createMessage", (data) => {
        console.log('create messages')
        data.date = momentjs().format("DD/MM/YYYY HH:mm:ss")
        messages.push(data)
        io.sockets.emit("messages", messages) // multiple sockets
    })

})

// Open the server
server.listen(PORT, () => {
    console.log('Server running')
})