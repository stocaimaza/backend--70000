"use strict";
console.log("Hola mamá, estoy en Typescript");
//Tipo de datos: 
let nombre = "Pepe";
let apellido = "Argento";
const nacimiento = 1960;
let trabaja = true;
const datoNull = null;
//Objetos literales: 
const persona = {
    nombre: "Juan",
    edad: 30
};
//Ejemplin de un array: 
const personitas = ["Juan", "Pedro", "Samuel"];
//Funciones: 
function suma(numeroA, numeroB) {
    return numeroA + numeroB;
}
console.log(suma(155, 5));
//Clases: 
class Perro {
    constructor(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
    ladrar() {
        console.log("guauu guauu");
    }
}
//Instancia de clase: 
const firulais = new Perro("ladrador", 5);
firulais.ladrar();
