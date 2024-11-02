from rest_framework import serializers
from .models import Game, CurriculumBase, Photo
from django.core.exceptions import ValidationError
from urllib.parse import urlparse

# Função de validação para URL de vídeo
def validate_video_url(value):
    parsed_url = urlparse(value)
    if not parsed_url.scheme or not parsed_url.netloc:
        raise ValidationError("A URL do vídeo é inválida.")

class CurriculumBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurriculumBase
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    curriculum_base = CurriculumBaseSerializer()
    photo_urls = serializers.SerializerMethodField()  # Usado para exibir as URLs de fotos no método get_photo_urls
    video_url = serializers.URLField(required=False, validators=[validate_video_url])

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'project_url', 'game_type', 'age_range', 'content_classification',
            'game_genre', 'platform', 'curriculum_base', 'informative_text',
            'video_url', 'photo_urls'
        ]

    def get_photo_urls(self, obj):
        # Retorna uma lista de URLs das fotos associadas ao Game
        return [photo.image for photo in obj.photo_files.all()]

    def create(self, validated_data):
        print("Dados recebidos no backend (antes da extração):", validated_data)
        
        # Extrai dados do currículo e a string de URLs das fotos
        curriculum_data = validated_data.pop('curriculum_base', {})
        photo_urls_string = validated_data.pop('photo_urls', '')

        print("Dados do currículo:", curriculum_data)
        print("String das URLs das fotos recebidas:", photo_urls_string)  # Log para verificação

        # Cria o currículo associado e o jogo
        curriculum = CurriculumBase.objects.create(**curriculum_data)
        game = Game.objects.create(curriculum_base=curriculum, **validated_data)

        # Divide a string de URLs e associa cada foto ao jogo
        photo_urls = photo_urls_string.split(',')
        for url in photo_urls:
            if url.strip():  # Ignora URLs vazias
                photo, _ = Photo.objects.get_or_create(image=url.strip())
                game.photo_files.add(photo)
                print(f"Foto associada ao jogo: {url.strip()}")  # Confirmação de que a foto foi adicionada

        game.save()
        print("Jogo criado com sucesso e fotos associadas:", game.photo_files.all())
        return game

    def update(self, instance, validated_data):
        curriculum_data = validated_data.pop('curriculum_base', None)
        if curriculum_data:
            CurriculumBase.objects.filter(id=instance.curriculum_base.id).update(**curriculum_data)

        # Atualiza fotos com a string de URLs
        photo_urls_string = validated_data.pop('photo_urls', '')
        if photo_urls_string:
            instance.photo_files.clear()
            photo_urls = photo_urls_string.split(',')
            for url in photo_urls:
                if url.strip():
                    photo, _ = Photo.objects.get_or_create(image=url.strip())
                    instance.photo_files.add(photo)

        # Atualiza outros campos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
