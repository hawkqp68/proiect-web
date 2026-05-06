const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dashboard')
  .then(function() {
    console.log('Conectat la MongoDB!');
  })
  .catch(function(err) {
    console.error('Eroare conectare MongoDB:', err);
  });

const PORT = 3000;
const Project = require('./models/Project');

app.use(express.json());

// GET / - test server
app.get('/', function(req, res) {
  res.json({ message: 'Serverul functioneaza!' });
});

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', async function(req, res) {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
  }
});

// GET /api/projects/:id - returneaza un proiect dupa id
app.get('/api/projects/:id', async function(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) { return res.status(404).json({ error: 'Proiectul nu a fost gasit' }); }
    res.json(project);
  } catch (err) {
    res.status(404).json({ error: 'ID invalid sau proiect negasit' });
  }
});

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', async function(req, res) {
  try {
    const newProject = new Project({
      title: req.body.title,
      tech: req.body.tech,
      done: req.body.done || false,
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id - sterge un proiect dupa id
app.delete('/api/projects/:id', async function(req, res) {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) { return res.status(404).json({ error: 'Proiectul nu a fost gasit' }); }
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: 'ID invalid' });
  }
});

// Porneste serverul
app.listen(PORT, function() {
  console.log('Server pornit pe http://localhost:' + PORT);
});