//Instalan: npm i @faker-js/faker
import {faker} from "@faker-js/faker"; 
import { createHash } from "../utils/index.js";

class MockingService {
    async generateMockingUsers(num){

    }

    static async generateMockingPets(num){
        const pets = []; 

        for (let i = 0; i < num; i++) {
            pets.push({
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false
            })
        }
        console.log(pets);
        return pets; 
    }
}

export default MockingService; 