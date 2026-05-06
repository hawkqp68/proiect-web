import { useState, useEffect } from 'react';
import Card from './Card';
import AddProject from './AddProject';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(function() {
    fetch('http://localhost:3000/api/projects')
      .then(function(response) {
        if (!response.ok) throw new Error('Server error');
        return response.json();
      })
      .then(function(data) {
        setProjects(data);
        setLoading(false);
      })
      .catch(function(error) {
        setError('Eroare la incarcarea datelor de la API');
        setLoading(false);
      });
  }, []);

  function handleAddProject(newProject) {
    setProjects([...projects, newProject]);
  }

  // ← Funcție nouă pentru ștergere
  async function handleDelete(id) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Eroare la ștergere');
      }

      // Elimină proiectul din state fără refresh
      setProjects(projects.filter(function(p) { return p._id !== id; }));
    } catch (err) {
      console.error('Eroare:', err);
    }
  }

  if (loading) return <p>Se incarca...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h3>Proiecte</h3>

      <AddProject onAdd={handleAddProject} />

      <input
        type="text"
        placeholder="Cauta dupa titlu..."
        value={search}
        onChange={function(e) { setSearch(e.target.value); }}
      />

      {projects.filter(function(p) {
        return p.title.toLowerCase().includes(search.toLowerCase());
      }).map(function(project) {
        return (
          <div key={project._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Card title={project.title} description={project.tech} />
            {/* ← Buton nou de ștergere */}
            <button
              onClick={function() { handleDelete(project._id); }}
              style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Șterge
            </button>
          </div>
        );
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