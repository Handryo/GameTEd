from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Game, Photo
from .serializers import GameSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        # Extrai URLs de vídeo e foto da requisição JSON
        video_url = request.data.get('video_url')
        photo_urls = request.data.get('photo_files', [])

        # Cria ou obtém instâncias de Photo para cada URL em photo_urls
        photo_instances = [Photo.objects.get_or_create(image=url)[0] for url in photo_urls]

        # Copia os dados da requisição e atualiza `video_url`
        data = request.data.copy()
        data['video_url'] = video_url
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Salva o Game e associa as fotos
        game = serializer.save()
        game.photo_files.set(photo_instances)  # Associa fotos ao game
        game.save()

        # Recarrega dados para enviar a resposta completa ao cliente
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        # Extrai e processa URLs de fotos para atualização
        photo_urls = request.data.get('photo_files', [])
        photo_instances = [Photo.objects.get_or_create(image=url)[0] for url in photo_urls]

        # Copia os dados da requisição
        data = request.data.copy()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Salva o Game e atualiza fotos associadas
        game = serializer.save()
        game.photo_files.set(photo_instances)  # Atualiza associações de fotos

        # Recarrega dados para enviar resposta completa ao cliente
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        # Lida com a exclusão do objeto Game e suas fotos associadas
        instance = self.get_object()
        instance.photo_files.clear()  # Limpa as associações de fotos antes de excluir o Game
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
