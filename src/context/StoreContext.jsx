import { createContext, useContext, useEffect, useState } from 'react';

const StoreContext = createContext(null);

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('silent-musics:cart'));
  const [wishlist, setWishlist] = useState(() => readStorage('silent-musics:wishlist'));

  useEffect(() => {
    localStorage.setItem('silent-musics:cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('silent-musics:wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  function addToCart(produto) {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, qtd: item.qtd + 1 } : item
        );
      }
      return [...prev, { ...produto, qtd: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQtd(id, qtd) {
    if (qtd < 1) return removeFromCart(id);
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qtd } : item)));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleWishlist(produto) {
    setWishlist((prev) => {
      const existe = prev.some((item) => item.id === produto.id);
      if (existe) return prev.filter((item) => item.id !== produto.id);
      return [...prev, produto];
    });
  }

  function isWishlisted(id) {
    return wishlist.some((item) => item.id === id);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQtd,
    clearCart,
    wishlist,
    toggleWishlist,
    isWishlisted,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore precisa estar dentro de <StoreProvider>');
  return ctx;
}
