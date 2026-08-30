import { useStore } from '../context/StoreContext';
import './ProductCard.css';

export function ProductCard({ produto }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const favoritado = isWishlisted(produto.id);

  const preco = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <article className="product-card">
      <div className="product-card__sleeve">
        <img
          src={produto.capa}
          alt={`Capa do álbum ${produto.album}, de ${produto.artista}`}
          loading="lazy"
          width="300"
          height="300"
        />
        <div className="product-card__static" aria-hidden="true" />
        <button
          className={`product-card__fav${favoritado ? ' is-active' : ''}`}
          onClick={() => toggleWishlist(produto)}
          aria-pressed={favoritado}
          aria-label={favoritado ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {favoritado ? '♥' : '♡'}
        </button>
      </div>

      <div className="product-card__info">
        <div className="product-card__tags">
          <span className="tag tag--genero">{produto.genero}</span>
          <span className="tag tag--formato">{produto.formato}</span>
        </div>
        <h3 className="product-card__album">{produto.album}</h3>
        <p className="product-card__artista">{produto.artista} · {produto.ano}</p>
        <div className="product-card__rodape">
          <p className="product-card__preco">{preco}</p>
          <button
            className="product-card__add"
            onClick={() => addToCart(produto)}
          >
            + carrinho
          </button>
        </div>
      </div>
    </article>
  );
}
