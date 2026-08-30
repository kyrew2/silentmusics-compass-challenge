import { useStore } from '../context/StoreContext';
import './CartPanel.css';

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function CartPanel({ onFinalizarCompra }) {
  const { cart, removeFromCart, updateQtd } = useStore();

  const total = cart.reduce((soma, item) => soma + item.preco * item.qtd, 0);

  if (cart.length === 0) {
    return <p className="cart-panel__vazio">Seu carrinho está vazio, adicione um produto.</p>;
  }

  return (
    <div className="cart-panel">
      <ul className="cart-panel__lista">
        {cart.map((item) => (
          <li key={item.id} className="cart-panel__item">
            <img src={item.capa} alt="" width="52" height="52" />
            <div className="cart-panel__item-info">
              <p className="cart-panel__item-titulo">{item.album}</p>
              <p className="cart-panel__item-artista">{item.artista}</p>
              <div className="cart-panel__qtd">
                <button onClick={() => updateQtd(item.id, item.qtd - 1)} aria-label="Diminuir quantidade">−</button>
                <span>{item.qtd}</span>
                <button onClick={() => updateQtd(item.id, item.qtd + 1)} aria-label="Aumentar quantidade">+</button>
              </div>
            </div>
            <div className="cart-panel__item-preco">
              {formatarPreco(item.preco * item.qtd)}
              <button
                className="cart-panel__remover"
                onClick={() => removeFromCart(item.id)}
              >
                remover
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-panel__total">
        <span>Total</span>
        <strong>{formatarPreco(total)}</strong>
      </div>

      <button className="btn btn--primary" onClick={onFinalizarCompra}>
        Finalizar compra
      </button>
    </div>
  );
}
