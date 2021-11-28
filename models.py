import mongoengine as me
from mongoengine.fields import StringField

# StringField
# IntField
# ListField
# DecimalField
# EmbeddedDocument (for nested fields, array equivalent?)


# The board class, used for keeping track of the board's dimensions
class Board(me.Model):
    active = me.BooleanField(default=True, required=False)
    bg_color = me.StringField(default='#FFFFFF', required=False, min_length=7, max_length=7)
    height = me.IntField(default=1000, required=False, min_value=1000, max_value=40000)
    player_count = me.IntField(default=0, required=False)
    player_max = me.IntField(default=100, required=False)
    width = me.IntField(default=1000, required=False, min_value=1000, max_value=20000)

# The player class, used for keeping track of player location and board player is associated with
class Player(me.Model):
    board = me.ReferenceField(Board, required=True, passthrough=False, reverse_delete_rule=me.CASCADE)
    color = me.StringField(default='#000000', required=False, max_length=7)
    name = me.StringField(max_length=10, blank=True, required=False)
    pos_x = me.IntField(blank=False, null=True)
    pos_y = me.IntField(blank=False, null=True)
    radius = me.IntField(blank=False, default=5)
    type = me.StringField(max_length=50, blank=False, default='circle')