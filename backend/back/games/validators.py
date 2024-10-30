from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Game, CurriculumBase, Photo
from urllib.parse import urlparse

# Funções de validação
def validate_video_url(value):
    parsed_url = urlparse(value)
    if not parsed_url.scheme or not parsed_url.netloc:
        raise ValidationError("A URL do vídeo é inválida.")
    max_length = 500
    if len(value) > max_length:
        raise ValidationError(f"A URL do vídeo deve ter no máximo {max_length} caracteres.")

def validate_photo_url_count(photo_urls):
    max_photos = 12
    if len(photo_urls) > max_photos:
        raise ValidationError(f"Você pode adicionar no máximo {max_photos} URLs de fotos.")

# Serializers
class CurriculumBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurriculumBase
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)  # Inclui o ID como campo de leitura
    curriculum_base = CurriculumBaseSerializer()
    photo_urls = serializers.ListField(
        child=serializers.URLField(), required=False  # Lista de URLs para fotos
    )
    video_url = serializers.URLField(required=False, validators=[validate_video_url])  # Campo de URL com validação

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'project_url', 'game_type', 'age_range', 'content_classification',
            'game_genre', 'platform', 'curriculum_base', 'informative_text',
            'video_url', 'photo_urls'
        ]

    def validate_photo_urls(self, value):
        # Validação para o número de URLs de fotos
        validate_photo_url_count(value)
        return value

    def create(self, validated_data):
        # Extrai os dados do currículo e das URLs das fotos
        curriculum_data = validated_data.pop('curriculum_base')
        photo_urls = validated_data.pop('photo_urls', [])

        # Cria o currículo associado
        curriculum = CurriculumBase.objects.create(**curriculum_data)
        game = Game.objects.create(curriculum_base=curriculum, **validated_data)

        # Cria instâncias de Photo e associa ao game
        for url in photo_urls:
            photo = Photo.objects.create(image=url)
            game.photo_files.add(photo)

        return game

    def update(self, instance, validated_data):
        # Atualiza o curriculum_base
        curriculum_data = validated_data.pop('curriculum_base', None)
        if curriculum_data:
            CurriculumBase.objects.filter(id=instance.curriculum_base.id).update(**curriculum_data)

        # Atualiza o campo Many-to-Many das fotos
        photo_urls = validated_data.pop('photo_urls', [])
        if photo_urls:
            instance.photo_files.clear()  # Limpa as fotos existentes
            for url in photo_urls:
                photo, created = Photo.objects.get_or_create(image=url)
                instance.photo_files.add(photo)

        # Atualiza outros campos do Game
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
