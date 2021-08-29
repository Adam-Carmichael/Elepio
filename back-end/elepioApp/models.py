from django.db import models

# Test model from Django + Angular 12 tutorial located here: https://www.bezkoder.com/django-angular-12-crud-rest-framework/#Define_the_Django_Model
class ElepioApp(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    published = models.BooleanField(default=False)

# The board class, used for keeping track of the board's dimensions
class Board(models.Model):
    active = models.BooleanField(default=True)
    player_count = models.IntegerField(blank=False, default=100)
    player_max = models.IntegerField(blank=False, default=100)
    width = models.IntegerField(blank=False, default='')
    height = models.IntegerField(blank=False, default='')
    bg_color = models.CharField(max_length=30, blank=False, default='#FFFFFF')

# The player class, used for keeping track of player location and board player is associated with
class Player(models.Model):
    name = models.CharField(max_length=10, blank=True, default='')
    color = models.IntegerField(blank=False, default='#FFFFFF')
    pos_x = models.CharField(max_length=100000, blank=False, null=True)
    pos_y = models.CharField(max_length=100000, blank=False, null=True)
    type = models.CharField(max_length=50, blank=False, default='square')
    radius = models.CharField(max_length=5, blank=False, default='10px')