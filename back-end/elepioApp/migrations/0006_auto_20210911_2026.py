# Generated by Django 2.2.24 on 2021-09-12 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('elepioApp', '0005_auto_20210911_2020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='pos_x',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='player',
            name='pos_y',
            field=models.IntegerField(default=0),
        ),
    ]
