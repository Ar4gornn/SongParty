# Generated by Django 5.2 on 2025-05-02 19:08

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name='room',
            name='host',
            field=models.CharField(max_length=50),
        ),
    ]
