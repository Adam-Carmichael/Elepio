from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from elepioApp.models import ElepioApp
from elepioApp.serializers import ElepioAppSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def elepioApp_list(request):
    return
    # GET list, POST new, DELETE all


@api_view(['GET', 'PUT', 'DELETE'])
def elepioApp_detail(request, pk):
    # find by pk (id)
    try: 
        elepioApp = ElepioApp.objects.get(pk=pk) 
    except ElepioApp.DoesNotExist: 
        return JsonResponse({'message': 'Does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    # GET / PUT / DELETE


@api_view(['GET'])
def tutorial_list_published(request):
    return
    # GET all published