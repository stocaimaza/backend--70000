console.log("Hola mamá, estoy en Typescript"); 

//Tipo de datos: 
let nombre: string = "Pepe"; 
let apellido: string = "Argento"; 
const nacimiento: number = 1960; 
let trabaja: boolean = true; 
const datoNull: null = null; 

//Objetos literales: 
const persona: {nombre: string, edad: number} = {
    nombre: "Juan", 
    edad: 30
}

//Ejemplin de un array: 
const personitas: string[] = ["Juan", "Pedro", "Samuel"]; 

//Funciones: 
function suma(numeroA: number, numeroB:number) : number {
    return numeroA + numeroB; 
}

console.log(suma(155,5));

//Clases: 

class Perro {
    raza: string;
    edad: number;
    constructor(raza: string, edad: number){
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