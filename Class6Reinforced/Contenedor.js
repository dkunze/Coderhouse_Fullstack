const fs = require("fs")

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

            return search
        } catch (err) {
            throw err
        }
    }

    // Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            return JSON.parse(readFile)
        } catch (err) {
            throw err
        }
    }
}


module.exports = {
    Container
}