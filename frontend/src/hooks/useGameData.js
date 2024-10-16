import { useState, useEffect } from 'react';

export function useGameData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Substitua pela sua lógica para buscar dados dos jogos
    fetch('/api/jogos') // URL de exemplo
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  return { data };
}