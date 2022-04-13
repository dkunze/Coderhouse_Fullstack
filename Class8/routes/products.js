const express = require("express")

let arrProducts = require("../products.js")
const { Router } = express

let defRouter = new Router()

// GET /api/productos -> devuelve todos los productos.
defRouter.get("/", (req, res) => {
    res.json(arrProducts)
})

// GET /api/productos/:id -> devuelve un producto según su id.
defRouter.get("/:id", (req, res) => {
    let parseArr = arrProducts.filter((i) => {
        return i.id == req.params.id
    })
    if (parseArr.length === 0) {
        res.json({ error: 'producto no encontrado' })
    } else {
        res.json(parseArr)
    }

})

// POST /api/productos -> recibe y agrega un producto, y lo devuelve con su id asignado.
defRouter.post("/", (req, res) => {
    let { title, price, thumbnail } = req.body

    let id = arrProducts[arrProducts.length - 1].id + 1
    let newProduct = { id, title, price, thumbnail }
    arrProducts.push(newProduct)
    res.send({ message: 'New object created', result: newProduct })
})

// PUT /api/productos/:id -> recibe y actualiza un producto según su id.
defRouter.put("/:id", (req, res) => {
    let { title, price, thumbnail } = req.body
    let getProduct = arrProducts.find((i) => {
        return i.id == req.params.id
    })
    if (getProduct === undefined) {
        res.json({ error: 'producto no encontrado' })
    } else {
        getProduct.title = title
        getProduct.price = price
        getProduct.thumbnail = thumbnail
        res.send({ message: `Product ID ${req.params.id} Updated`, result: getProduct })
    }

})

// DELETE /api/productos/:id -> elimina un producto según su id.
defRouter.delete("/:id", (req, res) => {
    let newProducts = arrProducts.filter((i) => {
        return i.id != req.params.id
    })
    arrProducts = newProducts
    res.send({ message: `The product ID ${req.params.id} has been removed`, result: arrProducts })
})


module.exports = defRouter