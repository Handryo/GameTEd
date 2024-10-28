// src/hooks/useGameDataMutate.js
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/games/';

const useGameDataMutate = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (gameData) => {
      const response = await axios.post(API_URL, gameData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('games');
      },
      onError: (error) => {
        console.error('Erro ao criar jogo:', error);
      }
    }
  );
};

export default useGameDataMutate;