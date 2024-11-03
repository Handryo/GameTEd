from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        # Extrai a URL de vídeo e a URL da foto da requisição JSON
        video_url = request.data.get('video_url')
        photo_url = request.data.get('photo_url')  # Agora, temos uma única URL de foto

        # Copia os dados da requisição e adiciona `video_url` e `photo_url`
        data = request.data.copy()
        data['video_url'] = video_url
        data['photo_url'] = photo_url  # Adiciona a URL da foto ao Game
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Salva o Game com a URL da foto
        game = serializer.save()

        # Recarrega os dados para enviar a resposta completa ao cliente
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Extrai e processa a URL da foto para atualização
        photo_url = request.data.get('photo_url')  # Agora, temos uma única URL de foto

        # Copia os dados da requisição e adiciona `photo_url`
        data = request.data.copy()
        data['photo_url'] = photo_url  # Atualiza a URL da foto do Game
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Salva o Game com a nova URL da foto
        game = serializer.save()

        # Recarrega os dados para enviar a resposta completa ao cliente
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        # Exclui o objeto Game
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
