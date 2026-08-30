import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Drawer } from './Drawer';
import { CartPanel } from './CartPanel';
import { WishlistPanel } from './WishlistPanel';
import './Header.css';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist } = useStore();
  const [painelAberto, setPainelAberto] = useState(null); // 'carrinho' | 'favoritos' | null

  const itensNoCarrinho = cart.reduce((soma, item) => soma + item.qtd, 0);

  function irParaCheckout() {
    setPainelAberto(null);
    navigate('/checkout');
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand">
            <span className="site-header__brand-static" aria-hidden="true">≈≈≈</span>
            Silent Musics
          </Link>

          <nav className="site-header__nav">
            <Link
              to="/"
              className={location.pathname === '/' ? 'is-active' : ''}
            >
              Vitrine
            </Link>
            <Link
              to="/como-fiz"
              className={location.pathname === '/como-fiz' ? 'is-active' : ''}
            >
              Como fiz
            </Link>
          </nav>

          <div className="site-header__acoes">
            <button
              className="icon-btn"
              onClick={() => setPainelAberto('favoritos')}
              aria-label={`Favoritos (${wishlist.length})`}
            >
              ♡
              {wishlist.length > 0 && <span className="icon-btn__badge">{wishlist.length}</span>}
            </button>
            <button
              className="icon-btn"
              onClick={() => setPainelAberto('carrinho')}
              aria-label={`Carrinho (${itensNoCarrinho})`}
            >
              🛒
              {itensNoCarrinho > 0 && <span className="icon-btn__badge">{itensNoCarrinho}</span>}
            </button>
          </div>
        </div>
      </header>

      <Drawer
        open={painelAberto === 'carrinho'}
        onClose={() => setPainelAberto(null)}
        title="Seu carrinho"
      >
        <CartPanel onFinalizarCompra={irParaCheckout} />
      </Drawer>

      <Drawer
        open={painelAberto === 'favoritos'}
        onClose={() => setPainelAberto(null)}
        title="Favoritos"
      >
        <WishlistPanel />
      </Drawer>
    </>
  );
}
