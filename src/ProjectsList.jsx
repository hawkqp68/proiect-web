import { useState, useEffect } from 'react';
import Card from './Card';
import AddProject from './AddProject';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
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

      <div className="controls">
        <input
          type="text"
          placeholder="Cauta dupa titlu..."
          value={search}
          onChange={function(e) { setSearch(e.target.value); }}
        />

        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">Toate</option>
          <option value="done">Finalizate</option>
          <option value="pending">În lucru</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="date-desc">Sortare: Dată (nou → vechi)</option>
          <option value="date-asc">Sortare: Dată (vechi → nou)</option>
          <option value="title-asc">Sortare: Titlu (A → Z)</option>
          <option value="title-desc">Sortare: Titlu (Z → A)</option>
        </select>
      </div>

      {(() => {
        // compute visible list outside JSX in a clear way
        function idTimestamp(id) {
          try { return parseInt(id.substring(0,8),16) * 1000; } catch (e) { return 0; }
        }

        const filtered = projects.filter(function(p) {
          const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
          const matchesStatus = statusFilter === 'all' ? true : (statusFilter === 'done' ? p.done : !p.done);
          return matchesSearch && matchesStatus;
        });

        filtered.sort(function(a,b) {
          if (sortBy.startsWith('date')) {
            const ta = idTimestamp(a._id), tb = idTimestamp(b._id);
            return sortBy === 'date-desc' ? tb - ta : ta - tb;
          }
          const ta = (a.title||'').toLowerCase(), tb = (b.title||'').toLowerCase();
          if (ta < tb) return sortBy === 'title-asc' ? -1 : 1;
          if (ta > tb) return sortBy === 'title-asc' ? 1 : -1;
          return 0;
        });

        return filtered.map(function(project) {
          if (editingId === project._id) {
            return (
              <div key={project._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0' }}>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Titlu" style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <input value={editTech} onChange={e => setEditTech(e.target.value)} placeholder="Tehnologie" style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                <button onClick={() => handleSave(project._id)} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Salvează</button>
                <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Anulează</button>
              </div>
            );
          }

          return (
            <div key={project._id} className={"project-card " + (project.done ? 'project-done' : 'project-pending')}>
              <Card title={project.title} description={project.tech} />
              <div className="action-buttons">
                <span className="project-status">{project.done ? 'Finalizat' : 'În lucru'}</span>
                <button className={"btn-toggle"} onClick={function() { handleToggle(project._id, project.done); }}>{project.done ? 'Marchează în lucru' : 'Marchează finalizat'}</button>
                <button className="btn-edit" onClick={() => { setEditingId(project._id); setEditTitle(project.title); setEditTech(project.tech); }}>Editează</button>
                <button className="btn-delete" onClick={function() { handleDelete(project._id); }}>Șterge</button>
              </div>
            </div>
          );
        });
      })()} 

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px' }}>
        <p><strong>Total proiecte:</strong> {projects.length}</p>
        <p><strong>Finalizate:</strong> {projects.filter(function(p) { return p.done; }).length}</p>
        <p><strong>In lucru:</strong> {projects.filter(function(p) { return !p.done; }).length}</p>
      </div>
    </div>
  );
}


export default ProjectList;
