import { fakerPT_BR as faker } from '@faker-js/faker'
import * as cpf_faker from 'validation-br/dist/cpf'


export const createPerson = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthDate: faker.date.between({ from: new Date().getFullYear() - 65, to: new Date().getFullYear() - 18 }).toLocaleDateString('pt-BR'),
    cpf: cpf_faker.fake(false),
    email: faker.internet.email(),
    password: faker.internet.password(),
    address: {
      CEP: '21660080',
      country: 'Brasil',
      state: 'RJ',
      city: 'Rio de Janeiro',
      number: Math.floor(Math.random() * 9999) + 1,
      complement: faker.lorem.words(5),
    },
  }
}