import Card from './Card';

function App() {
  const projects = [
    { title: "Proiect 1", description: "Pagina personala" },
    { title: "Proiect 2", description: "Calculator buget" },
    { title: "Proiect 3", description: "Dashboard React" },
    { title: "Proiect 4", description: "Aplicatie de notite" },
    { title: "Proiect 5", description: "Joc de memorie" }
  ];
  
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
      {projects.map((project, index) => (
        <Card key={index} title={project.title} description={project.description} />
      ))  }
      

    </div>
  );
}

export default App;