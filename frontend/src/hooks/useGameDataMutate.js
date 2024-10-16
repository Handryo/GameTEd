import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:8080/games'; // Altere para o URL da sua API

const useGameDataMutate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (gameData) => {
      const response = await axios.post(API_URL, gameData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('games'); // Ajuste o nome da query conforme necessário
      },
      onError: (error) => {
        console.error('Erro ao criar jogo:', error);
      }
    }
  );
};

export default useGameDataMutate;



