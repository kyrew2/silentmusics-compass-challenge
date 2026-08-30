import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    fetch('/products.json')
      .then((res) => {
        if (!res.ok) throw new Error(`Falha ao carregar catálogo: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setStatus('ready');
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, status };
}
