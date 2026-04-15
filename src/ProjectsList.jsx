import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError]= useState(null);
    
 useEffect(function() {
 fetch('/data/projects.json')
 .then(function(response) {
 if (!response.ok) {
 throw new Error('Fișier nu găsit sau server error');
 }
 return response.json();
 })
 .then(function(data) {
 console.log('Loaded projects:', data);
 setProjects(data.projects);
 setLoading(false);
 })
 .catch(function(error) {
 console.error('Error loading projects:', error);
 setError('Eroare la incarcarea datelor');
 setLoading(false);
 });
 }, []);
 if (loading) {
 return <p>Se incarca...</p>;
 }
 if (error) {
 return <p style={{color: 'red'}}>{error}</p>;
 }
 return (
 <div>
 <h3>Proiecte</h3>
 {projects.map(function(project) {
 return <Card key={project.id} title={project.title} description={project.tech} />;
 })}
 </div>
 );
}
export default ProjectList;