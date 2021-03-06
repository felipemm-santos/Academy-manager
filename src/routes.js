const express = require('express');
const routes = express.Router();
const instructors = require('./app/controllers/instructors');
const members = require('./app/controllers/members');

/* HTTP VERBS
  GET: Receber
  POST: Criar OU Salvar
  PUT: Atualizar
  DELETE: Deletar
*/

routes.get('/not-found', (req, res) => res.render('not-found'));

routes.get('/', (req, res) => res.redirect('/instructors'));
routes.get('/instructors', instructors.index);
routes.get('/instructors/create', instructors.create);
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/edit', instructors.edit);
routes.post('/instructors', instructors.post);
routes.put('/instructors', instructors.put);
routes.delete('/instructors', instructors.delete);

// Members

routes.get('/members', members.index);
routes.get('/members/create', members.create);
routes.get('/members/:id', members.show);
routes.get('/members/:id/edit', members.edit);
routes.post('/members', members.post);
routes.put('/members', members.put);
routes.delete('/members', members.delete);

routes.use((req, res) => res.status(404).redirect('/not-found'));

module.exports = routes;
