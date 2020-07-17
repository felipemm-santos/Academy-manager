const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');

/* HTTP VERBS
  GET: Receber
  POST: Criar OU Salvar
  PUT: Atualizar
  DELETE: Deletar
*/

routes.get('/', (req, res) => {
  return res.redirect('/instructors');
});

routes.get('/instructors', instructors.index);

routes.get('/instructors/create', (req, res) => {
  return res.render('instructors/create');
});

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.post('/instructors', instructors.post);

routes.put('/instructors', instructors.put);

routes.delete('/instructors', instructors.delete);

routes.get('/members', (req, res) => {
  return res.render('members');
});

// routes.use((req, res) => res.status(404).render('not-found'));

module.exports = routes;
