import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ComoFiz } from './pages/ComoFiz';
import { Checkout } from './pages/Checkout';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-fiz" element={<ComoFiz />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
      <footer className="site-footer">
        Silent Musics — projeto de estudo, Bootcamp AI/R, 2026.
      </footer>
    </>
  );
}
