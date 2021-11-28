import mongoengine as me
from mongoengine.fields import StringField

# StringField
# IntField
# ListField
# DecimalField
# EmbeddedDocument (for nested fields, array equivalent?)


# The board class, used for keeping track of the board's dimensions
class Board(me.Model):
    active = me.BooleanField(required=True)
    bg_color = me.StringField(max_length=7, blank=False, default='#FFFFFF')
    height = me.IntField(blank=False, default=1000)
    player_count = me.IntField(blank=False, default=100)
    player_max = me.IntField(blank=False, default=100)
    width = me.IntField(blank=False, default=1000)

# The player class, used for keeping track of player location and board player is associated with
class Player(me.Model):
    board = me.ReferenceField(Board, on_delete=me.CASCADE, required=True)
    color = me.StringField(max_length=7, blank=False, default='#FFFFFF')
    name = me.StringField(max_length=10, blank=True, required=False)
    pos_x = me.IntField(blank=False, null=True)
    pos_y = me.IntField(blank=False, null=True)
    radius = me.IntField(blank=False, default=5)
    type = me.StringField(max_length=50, blank=False, default='circle')