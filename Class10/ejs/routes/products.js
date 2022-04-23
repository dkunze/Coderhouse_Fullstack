const express = require("express")
const { Router } = express
const ProductosApi = require("../api/methods.js").Container
let productosApi = new ProductosApi("public/products.json")
let defRouter = new Router()

// GET /api/productos -> devuelve todos los productos.
defRouter.get("/", async (req, res) => {
    await productosApi.getAll().then((r) => {
        res.render("products", { data: r })
    })
})

// GET /api/productos/:id -> devuelve un producto según su id.
defRouter.get("/:id", async (req, res) => {
    await productosApi.getById(req.params.id).then((r) => {
        res.json(r)
    })
})

// POST /api/productos -> recibe y agrega un producto, y lo devuelve con su id asignado.
defRouter.post("/", async (req, res) => {
    let { title, price, thumbnail } = req.body
    let newProduct = { title, price, thumbnail }

    await productosApi.save(newProduct).then((r) => {
        if (r.result === 'Success') {
            //res.send({ message: 'New product created', result: newProduct })
            res.render("index")
        } else {
            res.send({ message: 'Error', details: r.details })
        }
    })
})

// PUT /api/productos/:id -> recibe y actualiza un producto según su id.
defRouter.put("/:id", async (req, res) => {
    let { title, price, thumbnail } = req.body
    let updProduct = { title, price, thumbnail }

    await productosApi.update(req.params.id, updProduct).then((r) => {
        if (r.result === 'Success') {
            res.send({ message: 'Product updated', result: updProduct })
        } else {
            res.send({ message: 'Error', details: r.details })
        }
    })

})

// DELETE /api/productos/:id -> elimina un producto según su id.
defRouter.delete("/:id", async (req, res) => {
    await productosApi.deleteById(req.params.id).then((r) => {
        if (r.result === 'Success') {
            res.send({ message: `The product ID ${req.params.id} has been removed` })
        } else {
            res.send({ message: 'Error', details: r.details })
        }
    })

})

module.exports = defRouter