import { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import './Home.css';

export function Home() {
  const { products, status } = useProducts();
  const [termo, setTermo] = useState('');
  const [genero, setGenero] = useState('');
  const [formato, setFormato] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const generos = useMemo(
    () => [...new Set(products.map((p) => p.genero))].sort(),
    [products]
  );
  const formatos = useMemo(
    () => [...new Set(products.map((p) => p.formato))].sort(),
    [products]
  );

  const filtrados = useMemo(() => {
    const termoBusca = termo.trim().toLowerCase();
    return products.filter((p) => {
      const combinaTermo =
        !termoBusca ||
        p.artista.toLowerCase().includes(termoBusca) ||
        p.album.toLowerCase().includes(termoBusca);
      const combinaGenero = !genero || p.genero === genero;
      const combinaFormato = !formato || p.formato === formato;
      return combinaTermo && combinaGenero && combinaFormato;
    });
  }, [products, termo, genero, formato]);

  const ordenados = useMemo(() => {
    const lista = [...filtrados];
    switch (ordenacao) {
      case 'preco-asc':
        return lista.sort((a, b) => a.preco - b.preco);
      case 'preco-desc':
        return lista.sort((a, b) => b.preco - a.preco);
      case 'ano-asc':
        return lista.sort((a, b) => a.ano - b.ano);
      case 'ano-desc':
        return lista.sort((a, b) => b.ano - a.ano);
      case 'nome-asc':
        return lista.sort((a, b) => a.album.localeCompare(b.album));
      default:
        return lista;
    }
  }, [filtrados, ordenacao]);

  return (
    <main className="home">
      <section className="hero">
        <p className="hero__eyebrow">sintonizando...</p>
        <h1 className="hero__title">
          Discos que ficam como ruído<br />na sua cabeça.
        </h1>
        <p className="hero__subtitle">
          Vinil e CD de músicas, atualmente focado em Rock, Metal, Punk, Emo...
        </p>
      </section>

      <SearchBar
        termo={termo}
        onTermoChange={setTermo}
        genero={genero}
        onGeneroChange={setGenero}
        formato={formato}
        onFormatoChange={setFormato}
        generos={generos}
        formatos={formatos}
        ordenacao={ordenacao}
        onOrdenacaoChange={setOrdenacao}
      />

      {status === 'loading' && (
        <p className="home__status">Carregando catálogo...</p>
      )}

      {status === 'error' && (
        <p className="home__status home__status--error">
          Não deu pra carregar o catálogo agora. Recarregue a página.
        </p>
      )}

      {status === 'ready' && ordenados.length === 0 && (
        <p className="home__status">
          Nenhum disco encontrado com esses filtros.
        </p>
      )}

      {status === 'ready' && ordenados.length > 0 && (
        <div className="home__grid">
          {ordenados.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </main>
  );
}
