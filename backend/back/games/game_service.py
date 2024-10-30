from .models import Game, CurriculumBase, Photo


def handle_photo_urls(photo_urls):
    photos = []
    for url in photo_urls:
        # Cria ou obtém uma instância de Photo com a URL fornecida
        photo, created = Photo.objects.get_or_create(image=url)
        photos.append(photo)
    return photos


def create_game(data):
    # Extração segura da URL do vídeo, ajustando o nome para `video_url`
    video_url = data.pop('video_url', None)

    # Extração de dados do currículo e URLs das fotos
    curriculum_data = data.pop('curriculum_base', {})
    photo_urls = data.pop('photo_files', [])

    # Cria o objeto `CurriculumBase`
    curriculum = CurriculumBase.objects.create(**curriculum_data)

    # Cria o objeto `Game`, associando `CurriculumBase` e `video_url`
    game = Game.objects.create(curriculum_base=curriculum, video_url=video_url, **data)

    # Associa URLs das fotos como instâncias de `Photo`
    photos = handle_photo_urls(photo_urls)
    game.photo_files.set(photos)  # Associa as fotos ao game

    return game
