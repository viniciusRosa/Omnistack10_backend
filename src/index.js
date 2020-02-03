require('dotenv/config');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const { setupWevSocket } = require('./webSocket');

const app = express();
const server = http.Server();

setupWevSocket(server);

mongoose.connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
server.use(routes);
// paraametros

//query params: usado no GET -> req.query(filtros, ordenação, paginação)
//route params: usado no PUT, e DELETE -> req.params( identificar um reqcurso para alteração e remoção)
//body: usado pelo POST -> req.body(são dados para criação e alteração de um registro).


app.listen(process.env.PORT, () => {
    console.log('ok');
});