from django.db import models

# Test model from Django + Angular 12 tutorial located here: https://www.bezkoder.com/django-angular-12-crud-rest-framework/#Define_the_Django_Model
class ElepioApp(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    published = models.BooleanField(default=False)

# The board class, used for keeping track of the board's dimensions
class Board(models.Model):
    active = models.BooleanField(default=True)
    bg_color = models.CharField(max_length=7, blank=False, default='#FFFFFF')
    height = models.IntegerField(blank=False, default=1000)
    player_count = models.IntegerField(blank=False, default=100)
    player_max = models.IntegerField(blank=False, default=100)
    width = models.IntegerField(blank=False, default=1000)

# The player class, used for keeping track of player location and board player is associated with
class Player(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE, default='')
    color = models.CharField(max_length=7, blank=False, default='#FFFFFF')
    name = models.CharField(max_length=10, blank=True, default='')
    pos_x = models.IntegerField(blank=False, null=True)
    pos_y = models.IntegerField(blank=False, null=True)
    radius = models.IntegerField(blank=False, default=5)
    type = models.CharField(max_length=50, blank=False, default='circle')