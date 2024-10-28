from django.core.exceptions import ValidationError

def validate_video_size(value):
    max_size_mb = 69
    if value.size > max_size_mb * 1024 * 1024:
        raise ValidationError(f"O vídeo deve ter no máximo {max_size_mb} MB.")

def validate_photo_count(photo_files):
    max_photos = 12
    if len(photo_files) > max_photos:
        raise ValidationError(f"Você pode enviar no máximo {max_photos} fotos.")
