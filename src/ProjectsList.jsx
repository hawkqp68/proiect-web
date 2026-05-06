import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function() {
    // Pas 1: URL schimbat către API Express
    fetch('http://localhost:3000/api/projects')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Server error: ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        console.log('Loaded projects from API:', data);
        // Pas 2: API-ul returnează direct un array, nu data.projects
        setProjects(data);
        setLoading(false);
      })
      .catch(function(error) {
        console.error('Error loading projects:', error);
        setError('Eroare la incarcarea datelor de la API');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Se incarca...</p>;
  }
  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>
      <input
        type="text"
        placeholder="Cauta dupa titlu..."
        value={search}
        onChange={function(e) { setSearch(e.target.value); }}
      />
      {projects.filter(function(p) {
        return p.title.toLowerCase().includes(search.toLowerCase());
      }).map(function(project) {
        return <Card key={project._id} title={project.title} description={project.tech} />;
      })}
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px' }}>
        <p><strong>Total proiecte:</strong> {projects.length}</p>
        <p><strong>Finalizate:</strong> {projects.filter(function(p) { return p.done; }).length}</p>
        <p><strong>In lucru:</strong> {projects.filter(function(p) { return !p.done; }).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;