import { useState, useEffect } from 'react';

function Users() {
 // State 1: stochează lista de utilizatori
 const [users, setUsers] = useState([]);
 
 // State 2: stochează dacă e în curs de copacire
 const [loading, setLoading] = useState(true);
 
 // State 3: stochează mesajul de eroare (dacă e ceva rău)
 const [error, setError] = useState(null);
 
 // State 4: termenul de căutare
 const [search, setSearch] = useState('');

 useEffect(function() {
 // Fetch din API real - URL complet
 fetch('https://jsonplaceholder.typicode.com/users')
 .then(function(response) {
 if (!response.ok) {
 throw new Error('Fișier nu găsit sau server error');
 }
 return response.json();
 })
 .then(function(data) {
 console.log('Utilizatori încărcați:', data);
 setUsers(data);
 setLoading(false);
 })
 .catch(function(error) {
 console.error('Eroare:', error);
 setError('Eroare la încărcarea utilizatorilor');
 setLoading(false);
 });
 }, []);

 if (loading) {
 return <p>Se incarca utilizatorii...</p>;
 }

 if (error) {
 return <p style={{color: 'red'}}>Eroare: {error}</p>;
 }

 return (
 <div>
 <h3>Utilizatori</h3>
 <input 
 type="text" 
 placeholder="Cauta dupa nume..." 
 value={search}
 onChange={function(e) { setSearch(e.target.value); }}
 />
 <div>
 {users.filter(function(user) {
 return user.name.toLowerCase().includes(search.toLowerCase());
 }).map(function(user) {
 return (
 <div key={user.id} style={{padding: '10px', marginTop: '10px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '8px'}}>
 <p><strong>{user.name}</strong></p>
 <p>Email: {user.email}</p>
 <p>Username: {user.username}</p>
 </div>
 );
 })}
 </div>
 <div style={{marginTop: '20px', padding: '10px', backgroundColor: 'rgba(15, 23, 42, 0.8)', borderRadius: '5px'}}>
 <p><strong>Total utilizatori:</strong> {users.length}</p>
 <p><strong>Afisati dupa cautare:</strong> {users.filter(function(u) { return u.name.toLowerCase().includes(search.toLowerCase()); }).length}</p>
 </div>
 </div>
 );
}

export default Users;
