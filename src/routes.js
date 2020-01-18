const { Router } = require('express');
const Devcontroller = require('./controllers/DevController');


const routes = Router();

routes.get('/devs', Devcontroller.index)
routes.post('/devs', Devcontroller.store)
// routes.

module.exports = routes;