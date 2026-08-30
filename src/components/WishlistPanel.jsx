import { useStore } from '../context/StoreContext';
import './CartPanel.css';

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function WishlistPanel() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return <p className="cart-panel__vazio">Nenhum favorito ainda, clique no coração de um produto.</p>;
  }

  return (
    <ul className="cart-panel__lista">
      {wishlist.map((item) => (
        <li key={item.id} className="cart-panel__item">
          <img src={item.capa} alt="" width="52" height="52" />
          <div className="cart-panel__item-info">
            <p className="cart-panel__item-titulo">{item.album}</p>
            <p className="cart-panel__item-artista">{item.artista} · {formatarPreco(item.preco)}</p>
            <button
              className="cart-panel__remover"
              style={{ color: 'var(--color-rust-bright)' }}
              onClick={() => addToCart(item)}
            >
              adicionar ao carrinho
            </button>
          </div>
          <button
            className="cart-panel__remover"
            onClick={() => toggleWishlist(item)}
          >
            remover
          </button>
        </li>
      ))}
    </ul>
  );
}
