/** CLASE 1 - TEST Y MOCKS **/

//TDD: significa "Test Driven Developtment" o "Desarrollo orientado a pruebas".

//Lo podemos definir como una metodologia de desarrollo de software que consiste en pensar y escribir las pruebas que determinada función debe pasar, incluso antes de escribir la función. 

//EN TDD dividimos el trabajo en 3 etapas: 
//1) Escribir una prueba fallida
//2) Hacer que la prueba pase
//3) Refactorizando

//1) 

// const suma = (a, b) => {
//     //Test 1
//     //1. La función debe retornar 0 si no se pasa ningún parámetro. 
//     if(!a || !b) {
//         return 0; 
//     }

//     //Test 2
//     //2. La función debe retornar null si uno de los dos parámetros no es numerico. 
//     if(typeof a !== "number" || typeof b !== "number") {
//         return null; 
//     }

//     //Test 3
//     //3. La función debe poder realizar la suma correctamente. 
//     let resultado = a + b; 
//     return resultado;
// }

//PARA RESOLVER EL TEST 4 VAMOS A TENER QUE MODIFICAR TODA LA FUNCION PARA RECIBIR N PARAMETROS. 

// const suma = (...numeros) => {
//     //TEST 1: retornar 0 si no me mandan nada
//     if (numeros.length === 0) {
//         return 0;
//     }

//     //Test 2: retornar null si uno no es number
//     let banderita = true;
//     for (let i = 0; i < numeros.length && banderita; i++) {
//         if (typeof numeros[i] !== "number") {
//             banderita = false;
//         }
//     }
//     if (banderita !== true) {
//         return null; 
//     }

//     //TEST 3 Y 4: sumar 2 o mas elementos
//     let resultado = 0; 
//     for( let i = 0; i < numeros.length; i++ ) {
//         resultado += numeros[i];
//     }
//     return resultado;
// }

//PASO 3: Refactorizar

const suma = (...numeros) => {
    if (numeros.length === 0) return 0; 
    if (!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0)
}


//Ahora tenemos que pensar los multiples escenarios para poner a prueba nuestra función. 

//1. La función debe retornar 0 si no se pasa ningún parámetro. 
//2. La función debe retornar null si uno de los dos parámetros no es numerico. 
//3. La función debe poder realizar la suma correctamente. 
//4. La función debe poder realizar la suma con cualquier cantidad de numeros. 

//2) Hacer que la pruebas pasen: 

let testPasados = 0;
let testTotales = 4;

//TEST 1: 
console.log("1. La función debe retornar 0 si no se pasa ningún parámetro.");
let resultado1 = suma();
if (resultado1 === 0) {
    testPasados++;
    console.log("Test 1 pasado!");
} else {
    console.log("El test 1 no pasó, se esperaba 0 pero se recibio: " + resultado1);
}
//TEST 2: 
console.log("2. La función debe retornar null si uno de los dos parámetros no es numerico. ");
let resultado2 = suma("2", 3);
if (resultado2 === null) {
    testPasados++;
    console.log("Test 2 pasado!");
} else {
    console.log("El test 2 no se pasó, se esperaba null pero se recibio: " + resultado2);
}
//TEST 3
console.log("3. La función debe poder realizar la suma correctamente. ");
let resultado3 = suma(2, 3);
if (resultado3 === 5) {
    testPasados++;
    console.log("Test 3 pasado!");
} else {
    console.log("El test 3 no se pasó, se esperaba 5 pero se recibio: " + resultado2);
}

//TEST 4: 
console.log("4. La función debe poder realizar la suma con cualquier cantidad de numeros. ");
let resultado4 = suma(1, 2, 3, 4, 5);
if (resultado4 === 15) {
    testPasados++;
    console.log("Test 4 pasado!");
} else {
    console.log("El test 4 no se pasó, se esperaba 15 pero se recibio: " + resultado2);
}



if (testPasados === testTotales) {
    console.log("Felicitaciones, todos los test pasaron!!, tu vida es un ejemplo de luz, segui asi");
} else {
    console.log(" Se pasaron " + testPasados + " de un total de : " + testTotales + " existiendo tantas carreras te decidiste por la que no tenes ningun talento");
}