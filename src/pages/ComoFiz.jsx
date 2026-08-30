import './ComoFiz.css';

const VIDEO_ID = 'SEU_VIDEO_ID_AQUI';

export function ComoFiz() {
  return (
    <main className="como-fiz">
      <section className="como-fiz__intro">
        <p className="hero__eyebrow">registro</p>
        <h1>Como eu fiz a Silent Musics</h1>
      </section>

      <div className="como-fiz__video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
          title="Como eu fiz a Silent Musics"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>

      <section className="como-fiz__notas">
        <h2>Decisões técnicas, em resumo</h2>
        <ul>
          <li>
            <strong>Catálogo separado do front:</strong> os discos vivem em
            <code> /products.json</code>, carregado via <code>fetch</code> num
            hook isolado (<code>useProducts</code>). Nenhum produto está
            hardcoded no HTML/JSX.
          </li>
          <li>
            <strong>Busca, filtro e ordenação:</strong> por artista/álbum
            (texto livre), gênero musical, formato (Vinil/CD) e ordenação
            por preço, ano ou nome.
          </li>
          <li>
            <strong>Carrinho e favoritos:</strong> gerenciados num contexto
            global (<code>StoreContext</code>), persistidos em{' '}
            <code>localStorage</code>.
          </li>
          <li>
            <strong>Checkout fictício:</strong> ao finalizar a compra, o
            usuário é levado pra uma página de endereço antes da confirmação
            — nenhum pagamento real é processado.
          </li>
          <li>
            <strong>Hospedagem:</strong> site estático, buildado com Vite,
            publicado de graça — a URL do repositório fica pública como
            portfólio.
          </li>
        </ul>
      </section>
    </main>
  );
}
