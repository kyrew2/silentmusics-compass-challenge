import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import './Checkout.css';

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const CAMPOS_INICIAIS = {
  nome: '',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
};

export function Checkout() {
  const { cart, clearCart } = useStore();
  const [dados, setDados] = useState(CAMPOS_INICIAIS);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(null);

  const total = cart.reduce((soma, item) => soma + item.preco * item.qtd, 0);

  function onCampoChange(campo) {
    return (e) => setDados((atual) => ({ ...atual, [campo]: e.target.value }));
  }

  function onConfirmar(e) {
    e.preventDefault();
    // Checkout fictício: nenhum dado é enviado a um servidor real.
    setNumeroPedido(Math.floor(100000 + Math.random() * 900000));
    setPedidoConfirmado(true);
    clearCart();
  }

  if (pedidoConfirmado) {
    return (
      <main className="checkout checkout--success">
        <p className="checkout__success-icon">✓</p>
        <h1>Pedido confirmado</h1>
        <p className="checkout__order-number">Pedido fictício nº {numeroPedido}</p>
        <p className="checkout__note">
          Este é um checkout de demonstração para o desafio.
        </p>
        <Link to="/" className="btn btn--outline checkout__back">
          Voltar à loja
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="checkout">
        <p className="checkout__empty">
          Seu carrinho está vazio.
        </p>
        <Link to="/" className="btn btn--outline checkout__back">
          Voltar à loja
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout">
      <h1>Finalizar compra</h1>
      <p className="checkout__aviso">
        Checkout fictício para fins do desafio.
      </p>

      <div className="checkout__content">
        <form className="checkout__form" onSubmit={onConfirmar}>
          <h2>Endereço de entrega</h2>

          <label>
            Nome completo
            <input
              type="text"
              required
              value={dados.nome}
              onChange={onCampoChange('nome')}
            />
          </label>

          <div className="checkout__row">
            <label>
              CEP
              <input
                type="text"
                required
                value={dados.cep}
                onChange={onCampoChange('cep')}
                placeholder="00000-000"
              />
            </label>
            <label>
              Número
              <input
                type="text"
                required
                value={dados.numero}
                onChange={onCampoChange('numero')}
              />
            </label>
          </div>

          <label>
            Endereço
            <input
              type="text"
              required
              value={dados.endereco}
              onChange={onCampoChange('endereco')}
              placeholder="Rua, avenida..."
            />
          </label>

          <label>
            Complemento (opcional)
            <input
              type="text"
              value={dados.complemento}
              onChange={onCampoChange('complemento')}
              placeholder="Apto, bloco..."
            />
          </label>

          <label>
            Bairro
            <input
              type="text"
              required
              value={dados.bairro}
              onChange={onCampoChange('bairro')}
            />
          </label>

          <div className="checkout__row">
            <label>
              Cidade
              <input
                type="text"
                required
                value={dados.cidade}
                onChange={onCampoChange('cidade')}
              />
            </label>
            <label>
              Estado
              <input
                type="text"
                required
                maxLength={2}
                value={dados.estado}
                onChange={(e) => onCampoChange('estado')({ target: { value: e.target.value.toUpperCase() } })}
                placeholder="UF"
              />
            </label>
          </div>

          <button type="submit" className="btn btn--primary checkout__confirm">
            Confirmar pedido — {formatarPreco(total)}
          </button>
        </form>

        <aside className="checkout__summary">
          <h2>Resumo do pedido</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.qtd}× {item.album}</span>
                <span>{formatarPreco(item.preco * item.qtd)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout__summary-total">
            <span>Total</span>
            <strong>{formatarPreco(total)}</strong>
          </div>
        </aside>
      </div>
    </main>
  );
}
