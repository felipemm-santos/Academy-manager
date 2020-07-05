const express = require('express');

const nunjucks = require('nunjucks');

const server = express();
const recipes = require('./data');

server.set('view engine', 'njk');

server.use(express.static('public'));

nunjucks.configure('views', {
  express: server,

  // Permite html dentro de variáveis
  autoescape: false,
  noCache: true,
});

server.get('/', (req, res) => {
  return res.render('home', {
    recipes: recipes.slice(0, 6),
  });
});

server.get('/about', (req, res) => {
  return res.render('about-page');
});

server.get('/recipes', (req, res) => {
  return res.render('recipes-page', { recipes });
});

server.get('/recipes/:index', (req, res) => {
  const recipeIndex = req.params.index;

  const recipe = recipes[recipeIndex];

  if (!recipe) {
    return res.status(404).render('not-found');
  }
  return res.render('recipe', { recipe });
});

server.use((req, res) => res.status(404).render('not-found'));

server.listen(5000, () => {
  console.log('server is running');
});
