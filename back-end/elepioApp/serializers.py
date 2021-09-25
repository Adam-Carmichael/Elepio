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
                  'bg_color',
                  'height',
                  'player_count',
                  'player_max',
                  'width')

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ('id',
                  'board',
                  'color',
                  'name',
                  'pos_x',
                  'pos_y',
                  'radius',
                  'type')
