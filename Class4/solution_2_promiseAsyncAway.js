const fs = require("fs")

class Container {
    constructor(name) {
        this.name = name
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
                console.log('File successfully updated! ID: ' + idGenerated)
            } catch (err) {
                throw err
            }

        } catch (err) {
            obj.id = 1
            try {
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify([obj], null, 2), 'utf-8')
                console.log('File successfully created! ID: ' + obj.id)
            } catch (err) {
                throw err
            }

        }
    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está
    async getById(id) {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let getData = JSON.parse(readFile)

            let search = getData.filter(d => {
                return d.id === id
            })
            console.log(search)
        } catch (err) {
            throw err
        }
    }

    // Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            console.log(JSON.parse(readFile))
        } catch (err) {
            throw err
        }
    }

    // Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        try {
            let readFile = await fs.promises.readFile(`./${this.name}`, 'utf-8')
            let getData = JSON.parse(readFile)

            let newObj = getData.filter(d => {
                return d.id !== id
            })

            try {
                await fs.promises.writeFile(`./${this.name}`, JSON.stringify(newObj, null, 2), 'utf-8')
                console.log(`Item ${id} has been removed!`)
            } catch (err) {
                throw err
            }

        } catch (err) {
            throw err
        }
    }

    // Elimina todos los objetos presentes en el archivo
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.name}`, '')
            console.log(`All items has been removed`)
        } catch (err) {
            throw err
        }
    }

}

let files = new Container("productos.json")

// files.save({ title: 'Title 1', price: 200.00, thumbnail: 'https://www.google.com.ar/imgres?imgurl=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fdevcodepro%2Fmedia%2Ftutorials%2Finstalacion-de-nodejs-en-ubuntu-t1.jpg&imgrefurl=https%3A%2F%2Fdevcode.la%2Ftutoriales%2Finstalacion-de-nodejs-en-ubuntu%2F&tbnid=7gDHBX8gVZACtM&vet=12ahUKEwjO2a2MxeL2AhXwSbgEHTE6DQMQMygBegUIARC4AQ..i&docid=3j8jXa6tJLx2cM&w=1200&h=627&q=node%20js&ved=2ahUKEwjO2a2MxeL2AhXwSbgEHTE6DQMQMygBegUIARC4AQ' })
// files.getById(4)
// files.getAll()
// files.deleteById(5)
// files.deleteAll()
