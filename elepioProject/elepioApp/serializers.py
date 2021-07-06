from rest_framework import serializers 
from elepioApp.models import ElepioApp
 
 
class ElepioAppSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = ElepioApp
        fields = ('id',
                  'title',
                  'description',
                  'published')