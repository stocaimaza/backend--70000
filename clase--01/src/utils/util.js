//npm install @faker-js/faker

import {faker} from "@faker-js/faker"; 

const generarProductos = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: parseInt(faker.string.numeric()), 
        description: faker.commerce.productDescription(), 
        image: faker.image.url()
    }
}

const generarUsuarios = () => {
    let productos = []; 
    let numeroDeProductos = parseInt(faker.string.numeric()); 

    for (let i = 0; i < numeroDeProductos; i++ ){
        productos.push(generarProductos()); 
    }

    return {
        id: faker.database.mongodbObjectId(), 
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(), 
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(), 
        phone: faker.phone.number(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        productos
    }
}

export default generarUsuarios;