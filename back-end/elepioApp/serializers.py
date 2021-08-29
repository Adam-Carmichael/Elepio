from rest_framework import serializers 
from elepioApp.models import ElepioApp
from elepioApp.models import Board
from elepioApp.models import Player
 
 
class ElepioAppSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = ElepioApp
        fields = ('id',
                  'title',
                  'description',
                  'published')

class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ('id',
                  'active',
                  'player_count',
                  'player_max',
                  'width',
                  'bg_color')

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ('id',
                  'name',
                  'color',
                  'pos_x',
                  'pos_y',
                  'type',
                  'radius')
