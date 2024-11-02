from .models import Game, CurriculumBase, Photo

def handle_photo_urls(photo_urls):
    photos = []
    for url in photo_urls:
        photo, _ = Photo.objects.get_or_create(image=url)
        photos.append(photo)
    return photos

def create_game(data):
    curriculum_data = data.pop('curriculum_base', {})
    photo_urls = data.pop('photo_urls', [])

    # Cria o currículo e o jogo
    curriculum = CurriculumBase.objects.create(**curriculum_data)
    game = Game.objects.create(curriculum_base=curriculum, **data)

    # Associa as fotos
    photos = handle_photo_urls(photo_urls)
    game.photo_files.set(photos)

    return game
