import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Engines from './pages/Engines';
import Disponibility from './pages/Disponibility';
import Affectation from './pages/Affectation';

function App() {
  return (
    <BrowserRouter>
      <div className="App flex">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<div className="text-2xl font-bold">Dashboard</div>} />
              <Route path="/engines" element={<Engines />} />
              <Route path="/disponibility" element={<Disponibility />} />
              <Route path="/affectation" element={<Affectation />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
