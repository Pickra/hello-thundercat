const faker = require("faker");

module.exports = {
    users: [
        {
            login: "Lion'O",
            password: "thunsercatsFoEva",
            id: faker.random.uuid()
        }
    ]
};