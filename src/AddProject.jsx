import { useState } from 'react';

function AddProject({ onAdd }) {
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!title.trim() || !tech.trim()) {
      setError('Completați toate câmpurile!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, tech: tech }),
      });

      if (!response.ok) {
        throw new Error('Eroare server: ' + response.status);
      }

      const newProject = await response.json();
      onAdd(newProject);   // trimite proiectul nou către ProjectList
      setTitle('');
      setTech('');
    } catch (err) {
      console.error('Eroare:', err);
      setError('Eroare la adăugarea proiectului');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px' }}>
      <h4>Adaugă proiect nou</h4>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <input
          type="text"
          placeholder="Titlu proiect..."
          value={title}
          onChange={function(e) { setTitle(e.target.value); }}
          style={{ display: 'block', marginBottom: '8px', padding: '6px', width: '100%' }}
        />
        <input
          type="text"
          placeholder="Tehnologii (ex: React, Node)..."
          value={tech}
          onChange={function(e) { setTech(e.target.value); }}
          style={{ display: 'block', marginBottom: '8px', padding: '6px', width: '100%' }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ padding: '8px 16px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Se adaugă...' : 'Adaugă proiect'}
        </button>
      </div>
    </div>
  );
}

export default AddProject;