const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://vinicius:vinicius@cluster0-37erj.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(routes);
// paraametros

//query params: usado no GET -> req.query(filtros, ordenação, paginação)
//route params: usado no PUT, e DELETE -> req.params( identificar um reqcurso para alteração e remoção)
//body: usado pelo POST -> req.body(são dados para criação e alteração de um registro).





app.listen(3333, () => {
    console.log('ok');
})