const faker = require("faker");

module.exports = {
    users: [
        {
            login: "Lion'O",
            password: "thunsercatsFoEva",
            character: "Lion'O",
            id: faker.random.uuid()
        }
    ]
};