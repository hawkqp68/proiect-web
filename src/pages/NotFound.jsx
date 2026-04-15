import { Link } from 'react-router';

function NotFound() {
 return (
 <div style={{textAlign: 'center', padding: '40px'}}>
 <h1 style={{fontSize: '3rem', color: '#FF7733'}}>404</h1>
 <h2>Pagina nu există</h2>
 <p>URL-ul pe care l-ai accesat nu a fost găsit.</p>
 <Link to="/" style={{
 display: 'inline-block',
 marginTop: '20px',
 padding: '10px 20px',
 backgroundColor: '#38bdf8',
 color: 'white',
 textDecoration: 'none',
 borderRadius: '6px'
 }}>
 Întoarce-te la Home
 </Link>
 </div>
 );
}

export default NotFound;
