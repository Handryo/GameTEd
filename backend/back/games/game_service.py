from .models import Game, Photo, CurriculumBase
from .validators import validate_video_size, validate_photo_count

def handle_uploaded_photos(photo_files):
    validate_photo_count(photo_files)
    photos = []
    for photo_file in photo_files:
        photo = Photo(image=photo_file)
        photo.save()
        photos.append(photo)
    return photos

def create_game(data):
    # Valida o tamanho do vídeo
    video_file = data.get('video_file')
    if video_file:
        validate_video_size(video_file)

    # Cria o objeto Game e os relacionamentos
    curriculum_data = data.pop('curriculum_base')
    photos_data = data.pop('photo_files', [])

    # Cria a base curricular
    curriculum = CurriculumBase.objects.create(**curriculum_data)
    game = Game.objects.create(curriculum_base=curriculum, **data)

    # Associa as fotos
    photos = handle_uploaded_photos(photos_data)
    game.photo_files.set(photos)

    return game
