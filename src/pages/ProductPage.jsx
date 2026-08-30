import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useStore } from '../context/StoreContext';
import './ProductPage.css';

export function ProductPage() {
  const { id } = useParams();
  const { products, status } = useProducts();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  if (status === 'loading') {
    return <p className="product-page__status">Carregando...</p>;
  }

  const produto = products.find((p) => p.id === Number(id));

  if (!produto) {
    return (
      <main className="product-page">
        <p className="product-page__status">Disco não encontrado.</p>
        <Link to="/" className="btn btn--outline">Voltar à vitrine</Link>
      </main>
    );
  }

  const preco = produto.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const favoritado = isWishlisted(produto.id);

  return (
    <main className="product-page">
      <Link to="/" className="product-page__voltar">&larr; Voltar à vitrine</Link>

      <div className="product-page__conteudo">
        <img
          src={produto.capa}
          alt={`Capa do álbum ${produto.album}, de ${produto.artista}`}
          className="product-page__capa"
        />

        <div className="product-page__info">
            <div className="product-card__tags">
                <span className="tag tag--genero">{produto.genero}</span>
                <span className="tag tag--formato">{produto.formato}</span>
            </div>
            <h1>{produto.album}</h1>
            <p className="product-page__artista">{produto.artista}</p>
            <p className="product-page__preco">{preco}</p>

            <dl className="product-page__ficha">
                <div>
                <dt>Formato</dt>
                <dd>{produto.formato === 'Vinil' ? 'Disco de Vinil' : 'CD'}</dd>
                </div>
                <div>
                <dt>Gênero</dt>
                <dd>{produto.genero}</dd>
                </div>
                <div>
                <dt>Lançamento</dt>
                <dd>{produto.ano}</dd>
                </div>
            </dl>

            <p className="product-page__descricao">{produto.descricao}</p>

            <div className="product-page__acoes">
                <button className="btn btn--primary" onClick={() => addToCart(produto)}>
                Adicionar ao carrinho
                </button>
                <button className="btn btn--outline" onClick={() => toggleWishlist(produto)}>
                {favoritado ? '♥ Remover dos favoritos' : '♡ Adicionar aos favoritos'}
                </button>
            </div>
        </div>
      </div>
    </main>
  );
}