const express= require('express');
const app= express();  
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
 console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
 console.error('Eroare conectare MongoDB:', err);
 });

const PORT=3000;
const Project = require('./models/Project');

app.use(express.json());
// Prima ruta: raspunde la GET /
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

//app.get('/api/projects/:id', function(req, res) {
  //  const project = projects.find(p => p.id === parseInt(req.params.id));
    //if(!project) { return res.status(404).json({ error: 'Proiectul nu a fost gasit' }); }
    //res.json(project);
//});


//app.get('/api/stats', function(req, res) {
  //res.json({
    //total: projects.length,
    //done: projects.filter(p => p.done).length,
    //inProgress: projects.filter(p => !p.done).length,
  //});
//});

app.post('/api/projects', function(req, res)
{

    const newProject = {
 id: projects.length + 1,
 title: req.body.title,
 tech: req.body.tech,
 done: req.body.done || false,
 };
 projects.push(newProject);
 res.status(201).json(newProject);

});

app.delete('/api/projects/:id', function(req, res) { 

    const projectid=parseInt(req.params.id);
    const index=projects.findIndex(p=>p.id===projectid);
    if(index===-1) { return res.status(404).json({ error: 'Proiectul nu a fost gasit' }); }
    projects.splice(index,1);
    res.json({ message: 'Proiectul a fost sters' });

})

// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});
