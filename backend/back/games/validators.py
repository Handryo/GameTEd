from django.core.exceptions import ValidationError
from urllib.parse import urlparse

def validate_video_url(value):
    # Verifica se é uma URL válida
    parsed_url = urlparse(value)
    if not parsed_url.scheme or not parsed_url.netloc:
        raise ValidationError("A URL do vídeo é inválida.")
    # Validação de exemplo para tamanho fictício da URL do vídeo
    max_length = 500  # comprimento máximo da URL
    if len(value) > max_length:
        raise ValidationError(f"A URL do vídeo deve ter no máximo {max_length} caracteres.")

def validate_photo_url_count(photo_urls):
    max_photos = 12
    if len(photo_urls) > max_photos:
        raise ValidationError(f"Você pode adicionar no máximo {max_photos} URLs de fotos.")
