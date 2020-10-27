require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// AWilix
const {createContainer} = require('awilix');
// Loaders
const initializeLoaders = require('./loaders');

const {
  PORT
} = process.env;

const container = createContainer();
initializeLoaders(container);

app.use((req, res, next) => {
  req.container = container;
  next();
});
app.use(express.json());
// CORS
app.use(cors({
  'allowedHeaders': '*',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
}));

app.get('/api/getAll', async (req, res) => {
  const { MatchService } = req.container.cradle;
  const matches = await MatchService.getAllMatches();
  res.status(200).send(matches);
});

app.post('/api/match', async (req, res) => {
  const { MatchService } = req.container.cradle;
  const { set } = req.body;
  const match = await MatchService.createMatch(set);
  if (match.success) {
    res.status(201).send(match);
  } else {
    res.status(500).send(match);
  }
});

app.patch('/api/match/:id', async (req, res) => {
  const { MatchService } = req.container.cradle;
  const { team } = req.body;
  const {id} = req.params;
  const match = await MatchService.updateScore(id, team);
  if (match.success) {
    res.status(201).send(match);
  } else {
    res.status(500).send(match);
  }
});

app.delete('/api/match/:id', async (req, res) => {
  const { MatchService } = req.container.cradle;
  const {id} = req.params;
  const deleteMatch = await MatchService.deleteMatch(id);
  if (deleteMatch.success) {
    res.status(201).send(deleteMatch);
  } else {
    res.status(500).send(deleteMatch);
  }
});

app.listen(PORT, () => console.log(`listening to port ${PORT}...`));