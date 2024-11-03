from django.db import models

class CurriculumBase(models.Model):
    component = models.CharField(max_length=255)
    thematic_unit = models.CharField(max_length=255)
    knowledge_objectives = models.TextField()
    skills = models.TextField()

    def __str__(self):
        return f"{self.component} - {self.thematic_unit}"

class Game(models.Model):
    title = models.CharField(max_length=255)
    project_url = models.URLField()
    game_type = models.CharField(max_length=100)
    age_range = models.CharField(max_length=50)
    content_classification = models.CharField(max_length=50)
    game_genre = models.CharField(max_length=100)
    platform = models.CharField(max_length=100)
    curriculum_base = models.OneToOneField(
        CurriculumBase,
        on_delete=models.CASCADE,
        related_name="game"
    )
    informative_text = models.TextField(max_length=500)
    video_url = models.URLField(null=True, blank=True)  # URL opcional para vídeo

    # Alterado para armazenar uma única URL da foto
    photo_url = models.URLField(null=True, blank=True)  # Campo para uma única URL de foto

    def __str__(self):
        return self.title
