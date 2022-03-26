const fs = require("fs")

class Container {
    constructor(name) {
        this.name = name
    }

    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    save(obj) {
        let idGenerated
        fs.readFile(`./${this.name}`, 'utf-8', (err, data) => {
            if (err) {
                obj.id = 1

                fs.writeFile(`./${this.name}`, JSON.stringify([obj], null, 2), 'utf-8', (err) => {
                    if (err) {
                        throw err
                    } else {
                        idGenerated = 1
                        console.log('File successfully created! ID: ' + idGenerated)
                    }
                })
            } else {
                let getData
                if (data !== '') {
                    getData = JSON.parse(data)
                    let count = getData.length
                    obj.id = getData[count - 1].id + 1
                    getData.push(obj)
                } else {
                    obj.id = 1
                    getData = [obj]
                }

                fs.writeFile(`./${this.name}`, JSON.stringify(getData, null, 2), 'utf-8', (err) => {
                    if (err) {
                        throw err
                    } else {
                        idGenerated = obj.id
                        console.log('File successfully updated! ID: ' + idGenerated)
                    }
                })

            }
        })

    }

    // Recibe un id y devuelve el objeto con ese id, o null si no está
    getById(id) {
        fs.readFile(`./${this.name}`, 'utf-8', (err, data) => {
            if (err) {
                throw err
            } else {
                let getData = JSON.parse(data)

                let search = getData.filter(d => {
                    return d.id === id
                })
                console.log(search)
            }
        })
    }

    // Devuelve un array con los objetos presentes en el archivo
    getAll() {
        fs.readFile(`./${this.name}`, 'utf-8', (err, data) => {
            if (err) {
                throw err
            } else {
                //console.log(typeof data)
                console.log(JSON.parse(data))
            }
        })
    }

    // Elimina del archivo el objeto con el id buscado.
    deleteById(id) {
        fs.readFile(`./${this.name}`, 'utf-8', (err, data) => {
            if (err) {
                throw err
            } else {
                let getData = JSON.parse(data)

                let newObj = getData.filter(d => {
                    return d.id !== id
                })

                fs.writeFile(`./${this.name}`, JSON.stringify(newObj, null, 2), 'utf-8', (err) => {
                    if (err) {
                        throw err
                    } else {
                        console.log(`Item ${id} has been removed!`)
                    }
                })
            }
        })
    }

    // Elimina todos los objetos presentes en el archivo
    deleteAll() {
        fs.writeFile(`./${this.name}`, '', 'utf-8', (err) => {
            if (err) {
                throw err
            } else {
                console.log(`All items has been removed`)
            }
        })
    }

}

let files = new Container("productos.json")

files.save({ title: 'Title 1', price: 200.00, thumbnail: 'https://www.google.com.ar/imgres?imgurl=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fdevcodepro%2Fmedia%2Ftutorials%2Finstalacion-de-nodejs-en-ubuntu-t1.jpg&imgrefurl=https%3A%2F%2Fdevcode.la%2Ftutoriales%2Finstalacion-de-nodejs-en-ubuntu%2F&tbnid=7gDHBX8gVZACtM&vet=12ahUKEwjO2a2MxeL2AhXwSbgEHTE6DQMQMygBegUIARC4AQ..i&docid=3j8jXa6tJLx2cM&w=1200&h=627&q=node%20js&ved=2ahUKEwjO2a2MxeL2AhXwSbgEHTE6DQMQMygBegUIARC4AQ' })
// files.getById(4)
// files.getAll()
// files.deleteById(4)
// files.deleteAll()
