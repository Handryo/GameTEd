# Generated by Django 5.1.2 on 2024-11-02 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='game',
            name='photo_files',
        ),
        migrations.AddField(
            model_name='game',
            name='photo_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='Photo',
        ),
    ]