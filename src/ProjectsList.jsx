import { useState, useEffect } from 'react';
import Card from './Card';
import AddProject from './AddProject';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTech, setEditTech] = useState('');
  const [editTitle, setEditTitle] = useState('');

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

    
    

  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done: !currentDone })
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error('Server error: ' + response.status + ' - ' + text);
      }

      const updatedProject = await response.json();
      setProjects(projects.map(p => p._id === id ? updatedProject : p));
    } catch (err) {
      console.error('Eroare la toggling status:', err);
      alert('A intervenit o eroare la salvare: ' + err.message);
    }
  }

  
  async function handleSave(id) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, tech: editTech })
      });

      if (!response.ok) throw new Error('Eroare la salvare');

      const updatedProject = await response.json();
      setProjects(projects.map(p => p._id === id ? updatedProject : p));
      setEditingId(null);
    } catch (err) {
      console.error('Eroare:', err);
      alert('A intervenit o eroare la salvare: ' + err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Sigur doriti sa stergeti acest proiect?')) return;
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Eroare la ștergere');

      setProjects(projects.filter(function(p) { return p._id !== id; }));
    } catch (err) {
      console.error('Eroare:', err);
      alert('Nu s-a putut șterge proiectul: ' + err.message);
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

        // ← NOU: dacă acest proiect e în editare, afișăm formularul
        if (editingId === project._id) {
          return (
            <div key={project._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
              <input
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                placeholder="Titlu"
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                value={editTech}
                onChange={e => setEditTech(e.target.value)}
                placeholder="Tehnologie"
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button
                onClick={() => handleSave(project._id)}
                style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Salvează
              </button>
              <button
                onClick={() => setEditingId(null)}
                style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Anulează
              </button>
            </div>
          );
        }

        // cardul normal
        return (
          <div key={project._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Card title={project.title} description={project.tech} />
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: project.done ? 'green' : 'orange' }}>
                {project.done ? 'Finalizat' : 'În lucru'}
              </span>
              <button
                onClick={function() { handleToggle(project._id, project.done); }}
                style={{ backgroundColor: project.done ? '#f59e0b' : '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                {project.done ? 'Marchează în lucru' : 'Marchează finalizat'}
              </button>

              <button
                onClick={() => {
                  setEditingId(project._id);
                  setEditTitle(project.title);
                  setEditTech(project.tech);
                }}
                style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Editează
              </button>

              <button
                onClick={function() { handleDelete(project._id); }}
                style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Șterge
              </button>
            </div>
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
