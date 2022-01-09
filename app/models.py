import mongoengine as ME

# The board class, used for keeping track of the board's dimensions
class Board(ME.Document):
    active = ME.BooleanField(default=True)
    bg_color = ME.StringField(default='#FFFFFF', min_length=7, max_length=7)
    height = ME.IntField(default=1000, min_value=1000, max_value=40000)
    player_count = ME.IntField(default=0)
    player_max = ME.IntField(default=100)
    width = ME.IntField(default=1000, min_value=1000, max_value=20000)
    meta = {'collection': 'elepioApp_board'}

# The player class, used for keeping track of player location and board player is associated with
class Player(ME.Document):
    board = ME.ReferenceField(Board, required=True, passthrough=False, reverse_delete_rule=ME.CASCADE)
    color = ME.StringField(default='#000000', max_length=7)
    name = ME.StringField(default='', max_length=10)
    pos_x = ME.IntField(default=0)
    pos_y = ME.IntField(default=0)
    radius = ME.IntField(default=5)
    type = ME.StringField(default='circle', max_length=50)
    meta = {'collection': 'elepioApp_player'}