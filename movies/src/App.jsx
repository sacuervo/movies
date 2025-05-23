import './App.css';
import { Favorite } from './pages/Favorites';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorites" element={<Favorite />}></Route>
      </Routes>
    </main>
  );
}

export default App;
