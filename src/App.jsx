import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './assets/Navbar';
import './App.css';
function App() {
 return (
 <BrowserRouter>
 <Navbar />
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/projects" element={<Projects />} />
 <Route path="/contact" element={<Contact />} />
 </Routes>
 </BrowserRouter>
 );
}
export default App;