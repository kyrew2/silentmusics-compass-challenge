# Silent Musics

Loja de discos de vinil e CD - metal, rock, punk e emo. Projeto do Desafio
"Minha Loja no Ar", Bootcamp AI/R.

## Funcionalidades

- Vitrine com busca (artista/album) e filtro por genero e formato
- Ordenacao por preco, ano ou nome
- Favoritos (coracao no card), persistido em localStorage
- Carrinho com quantidade, remocao e total
- Checkout ficticio: ao finalizar a compra, o usuario e levado para
  a pagina /checkout, preenche um formulario de endereco, e recebe
  a confirmacao (nenhum pagamento real e processado)

## Estrutura

```
public/
  products.json         <- catalogo (separado do codigo, carregado via fetch)
src/
  hooks/useProducts.js   <- logica do fetch, isolada
  context/StoreContext.jsx <- estado de carrinho e favoritos (localStorage)
  components/            <- Header, SearchBar, ProductCard, CartPanel, WishlistPanel, Drawer
  pages/
    Home.jsx             <- vitrine + busca/filtro/ordenacao (rota "/")
    Checkout.jsx          <- endereco + confirmacao (rota "/checkout")
    ComoFiz.jsx           <- pagina do video (rota "/como-fiz")
```