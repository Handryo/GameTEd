from .models import Game, CurriculumBase, Photo

def handle_photo_urls(photo_urls):
    photos = []
    for url in photo_urls:
        photo = Photo(image=url)  # Assume que o campo `image` agora aceita URLs diretamente
        photo.save()
        photos.append(photo)
    return photos

def create_game(data):
    # Remove `video_file` do processo de validação de arquivos
    video_url = data.get('video_file')

    # Extraindo dados de base curricular e URLs de fotos
    curriculum_data = data.pop('curriculum_base')
    photo_urls = data.pop('photo_files', [])

    # Criação de `CurriculumBase`
    curriculum = CurriculumBase.objects.create(**curriculum_data)
    game = Game.objects.create(curriculum_base=curriculum, video_file=video_url, **data)

    # Associa URLs das fotos como instâncias de `Photo`
    photos = handle_photo_urls(photo_urls)
    game.photo_files.set(photos)

    return game
