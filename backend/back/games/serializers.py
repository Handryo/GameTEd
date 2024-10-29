from rest_framework import serializers
from .models import Game, CurriculumBase, Photo

class CurriculumBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurriculumBase
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    curriculum_base = CurriculumBaseSerializer()
    photo_urls = serializers.ListField(
        child=serializers.URLField(), required=False  # Lista de URLs para fotos
    )
    video_url = serializers.URLField(required=False)  # Campo para a URL do vídeo

    class Meta:
        model = Game
        fields = [
            'title', 'project_url', 'game_type', 'age_range', 'content_classification',
            'game_genre', 'platform', 'curriculum_base', 'informative_text',
            'video_url', 'photo_urls'
        ]

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
