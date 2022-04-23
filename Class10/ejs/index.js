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

app.set("views", "./views")
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

// Routing with Products as exported module
app.use("/productos", productRoutes)

// Open the server
app.listen('8080', () => {
    console.log('Server running at port 8080')
})