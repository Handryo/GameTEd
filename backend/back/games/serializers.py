from rest_framework import serializers
from .models import Game, CurriculumBase
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
    video_url = serializers.URLField(required=False, validators=[validate_video_url])
    photo_url = serializers.URLField(required=False)  # Campo para uma única URL de foto

    class Meta:
        model = Game
        fields = [
            'id', 'title', 'project_url', 'game_type', 'age_range',
            'content_classification', 'game_genre', 'platform',
            'curriculum_base', 'informative_text', 'video_url', 'photo_url'
        ]

    def create(self, validated_data):
        print("Dados recebidos no backend (antes da extração):", validated_data)

        # Extrai dados do currículo
        curriculum_data = validated_data.pop('curriculum_base', {})

        # Cria o currículo associado e o jogo
        curriculum = CurriculumBase.objects.create(**curriculum_data)
        game = Game.objects.create(curriculum_base=curriculum, **validated_data)

        print("Jogo criado com sucesso com a URL de foto:", game.photo_url)
        return game

    def update(self, instance, validated_data):
        curriculum_data = validated_data.pop('curriculum_base', None)
        if curriculum_data:
            CurriculumBase.objects.filter(id=instance.curriculum_base.id).update(**curriculum_data)

        # Atualiza outros campos, incluindo photo_url
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        print("Jogo atualizado com a nova URL de foto:", instance.photo_url)
        return instance
