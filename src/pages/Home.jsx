import { useEffect, useState } from 'react';

function Home() {
	const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function() {
		fetch('http://localhost:3000/api/stats')
			.then(function(res) {
				if (!res.ok) throw new Error('Server error ' + res.status);
				return res.json();
			})
			.then(function(data) {
				setStats(data);
				setLoading(false);
			})
			.catch(function(err) {
				setError('Eroare la încărcarea statisticilor: ' + err.message);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<h2>Home</h2>
			<p>Bine ai venit pe pagina mea!</p>

			<div style={{ marginTop: 16 }}>
				<h3>Statistici</h3>
				{loading && <p>Se incarca statistici...</p>}
				{error && <p style={{ color: 'red' }}>{error}</p>}
				{!loading && !error && (
					<ul>
						<li><strong>Total proiecte:</strong> {stats.total}</li>
						<li><strong>Finalizate:</strong> {stats.done}</li>
						<li><strong>În lucru:</strong> {stats.inProgress}</li>
					</ul>
				)}
			</div>
		</div>
	);
}

export default Home;