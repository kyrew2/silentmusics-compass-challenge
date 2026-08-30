import './SearchBar.css';

export function SearchBar({
  termo,
  onTermoChange,
  genero,
  onGeneroChange,
  formato,
  onFormatoChange,
  generos,
  formatos,
  ordenacao,
  onOrdenacaoChange,
}) {
  return (
    <div className="search-bar" role="search">
      <input
        type="search"
        className="search-bar__input"
        placeholder="Buscar por artista ou álbum..."
        value={termo}
        onChange={(e) => onTermoChange(e.target.value)}
        aria-label="Buscar por artista ou álbum"
      />

      <select
        className="search-bar__select"
        value={genero}
        onChange={(e) => onGeneroChange(e.target.value)}
        aria-label="Filtrar por gênero"
      >
        <option value="">Todos os gêneros</option>
        {generos.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        className="search-bar__select"
        value={formato}
        onChange={(e) => onFormatoChange(e.target.value)}
        aria-label="Filtrar por formato"
      >
        <option value="">Todos os formatos</option>
        {formatos.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <select
        className="search-bar__select"
        value={ordenacao}
        onChange={(e) => onOrdenacaoChange(e.target.value)}
        aria-label="Ordenar por"
      >
        <option value="">Ordenar por...</option>
        <option value="preco-asc">Preço: menor primeiro</option>
        <option value="preco-desc">Preço: maior primeiro</option>
        <option value="ano-asc">Ano: mais antigo</option>
        <option value="ano-desc">Ano: mais recente</option>
        <option value="nome-asc">Nome: A-Z</option>
      </select>
    </div>
  );
}
