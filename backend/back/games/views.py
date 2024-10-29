from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Game, Photo
from .serializers import GameSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        # Obtendo URLs de vídeo e fotos da requisição de forma compatível com JSON
        video_url = request.data.get('video_url')
        photo_urls = request.data.get('photo_files', [])  # Lista de URLs de fotos diretamente

        # Criar ou obter instâncias de Photo para cada URL em photo_urls
        photo_instances = [Photo.objects.get_or_create(image=url)[0] for url in photo_urls]

        # Atualizando dados para incluir as URLs corretas antes de validar
        data = request.data.copy()
        data['video_url'] = video_url
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # Salvar o Game e associar fotos
        game = serializer.save()
        game.photo_files.set(photo_instances)  # Associa fotos ao game
        game.save()

        # Recarregar dados para enviar informações completas ao cliente
        serializer = self.get_serializer(game)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
