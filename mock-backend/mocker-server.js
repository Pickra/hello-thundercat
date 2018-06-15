const jsonServer = require("json-server");

module.exports = function startMockServer() {
    console.log("Starting JSON Server");

    const server = jsonServer.create();
    const db = require("./db.js");
    const router = jsonServer.router(db);

    server.use(jsonServer.defaults());
    server.use(jsonServer.rewriter(require("./routes.json")));
    server.use(router);
    server.listen(3000);
    return;
};