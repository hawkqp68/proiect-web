import Card from './Card';

function App() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Radu Bogdan-Ionut</p>

      <h2>Sectiuni</h2>
      <ul>
        <li>Profil</li>
        <li>Setari</li>
        <li>Notificari</li>
      </ul>
<Card title="Proiect 1" description="Pagina personala cu HTML si CSS" />
<Card title="Proiect 2" description="Pagina interactiva cu JavaScript" />
<Card title="Proiect 3" description="Dashboard cu React" />
      

    </div>
  );
}

export default App;