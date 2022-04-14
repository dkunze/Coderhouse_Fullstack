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
            if (search.length === 0) {
                return { error: 'producto no encontrado' }
            } else {
                return search
            }
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


    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    async save(obj) {
        let idGenerated
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let getData
            if (readFile !== '') {
                getData = JSON.parse(readFile)
                let count = getData.length
                obj.id = getData[count - 1].id + 1
                getData.push(obj)
            } else {
                obj.id = 1
                getData = [obj]
            }

            try {
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(getData, null, 2), 'utf-8')
                idGenerated = obj.id
                return { result: 'Success', id: idGenerated }
            } catch (err) {
                return { result: 'Error', details: err }
            }

        } catch (err) {
            obj.id = 1
            try {
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify([obj], null, 2), 'utf-8')
                return { result: 'Success', id: obj.id }
            } catch (err) {
                return { result: 'Error', details: err }
            }

        }
    }


    // Actualiza el objeto con el id buscado.
    async update(id, obj) {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let getData = JSON.parse(readFile)

            let newObj = getData.filter(d => {
                return d.id != id
            })
            obj.id = parseInt(id)
            newObj.push(obj)

            try {
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newObj, null, 2), 'utf-8')
                return { result: 'Success', id: obj.id }
            } catch (err) {
                return { result: 'Error', details: err }
            }

        } catch (err) {
            return { result: 'Error', details: err }
        }
    }


    // Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let getData = JSON.parse(readFile)

            // buscamos si existe el item
            if (getData.filter((i) => i.id == id).length === 0) {
                return { result: 'Error', details: 'The specified item does not exists.' }
            } else {
                let newObj = getData.filter(d => {
                    return d.id != id
                })

                try {
                    await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newObj, null, 2), 'utf-8')
                    return { result: 'Success' }
                } catch (err) {
                    return { result: 'Error', details: err }
                }
            }
        } catch (err) {
            return { result: 'Error', details: err }
        }
    }

}


module.exports = {
    Container
}