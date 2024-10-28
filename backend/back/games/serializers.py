from rest_framework import serializers
from .models import Game, CurriculumBase, Photo

class CurriculumBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CurriculumBase
        fields = '__all__'

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['image']

class GameSerializer(serializers.ModelSerializer):
    curriculum_base = CurriculumBaseSerializer()
    photo_files = PhotoSerializer(many=True, required=False)
    video_file = serializers.FileField(required=False)

    class Meta:
        model = Game
        fields = [
            'title', 'project_url', 'game_type', 'age_range', 'content_classification',
            'game_genre', 'platform', 'curriculum_base', 'informative_text',
            'video_file', 'photo_files'
        ]

    def create(self, validated_data):
        curriculum_data = validated_data.pop('curriculum_base')
        photos_data = validated_data.pop('photo_files', [])
        curriculum = CurriculumBase.objects.create(**curriculum_data)
        game = Game.objects.create(curriculum_base=curriculum, **validated_data)
        for photo_data in photos_data:
            photo = Photo.objects.create(**photo_data)
            game.photo_files.add(photo)
        return game
