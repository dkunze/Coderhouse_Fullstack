/*
>> Consigna: 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:
getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
*/

// Declarar una clase Usuario
class Usuario {
    // Usuario cuente con los siguientes atributos:
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    //  Retorna el completo del usuario. Utilizar template strings.
    getFullName = function () {
        return `Tu nombre completo es ${this.nombre} ${this.apellido}`
    }

    // Recibe un nombre de mascota y lo agrega al array de mascotas.
    addMascota = function (mascota) {
        this.mascotas.push(mascota)
    }

    //Retorna la cantidad de mascotas que tiene el usuario.
    countMascotas = function () {
        return this.mascotas.length
    }

    // Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    addBook = function (nombre, autor) {
        this.libros.push({ 'nombre': nombre, 'autor': autor })
    }

    // Retorna un array con sólo los nombres del array de libros del usuario.
    getBookNames = function () {
        return this.libros.map((m) => m.nombre)
    }
}

const usuario = new Usuario('Diego', 'Kunzevich', [{ 'nombre': 'Curso FullStack', 'autor': 'Coderhouse' }], ['Perro', 'Leon'])
console.log(usuario)
console.log(usuario.getFullName())

usuario.addMascota("Gato")
console.log(usuario.countMascotas())

usuario.addBook("Curso FrontEnd", "Coder House")
usuario.addBook("FrontEnd Engineer", "Google")

console.log(usuario.libros)
console.log(usuario.getBookNames())