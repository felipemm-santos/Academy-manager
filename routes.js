const express = require('express');
const routes = express.Router();
const instructors = require('./instructors')

routes.get('/', (req, res) => {
  return res.redirect('/instructors');
});

routes.get('/instructors', (req, res) => {
  return res.render('instructors/index');
});

routes.get('/instructors/create', (req, res) => {
  return res.render('instructors/create');
});

routes.post('/instructors', instructors.post);

routes.get('/members', (req, res) => {
  return res.render('members');
});

routes.use((req, res) => res.status(404).render('not-found'));

module.exports = routes;
