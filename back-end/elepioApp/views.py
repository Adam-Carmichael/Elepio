from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from elepioApp.models import ElepioApp
from elepioApp.serializers import ElepioAppSerializer

from elepioApp.models import Board
from elepioApp.serializers import BoardSerializer

from elepioApp.models import Player
from elepioApp.serializers import PlayerSerializer

from rest_framework.decorators import api_view

@api_view(['GET'])
def getBoard(request):
    board = Board.objects.filter(active=True).filter(player_count__lte=99)[:1]

    if request.method == "GET":
        board_serializer = BoardSerializer(board, many=True)
        return JsonResponse(board_serializer.data, safe=False)
    
@api_view(['POST'])
def createBoard(request):
    board_data = JSONParser().parse(request)
    board_serializer = BoardSerializer(data=board_data) # one parm = create new instance

    if board_serializer.is_valid(): # method of serializer to compare passed data to required model structure
        board_serializer.save()
        return JsonResponse(board_serializer.data, status=status.HTTP_201_CREATED) 
        
    return JsonResponse(board_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getPlayer(pk):
    try:
        player = Player.objects.get(pk=pk)
    except Player.DoesNotExist:  
        return JsonResponse({'message': 'Does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    player_serializer = PlayerSerializer(player)
    return JsonResponse(player_serializer.data, safe=False)

@api_view(['GET'])
def getPlayers():
    player = Player.objects.all()

    player_serializer = PlayerSerializer(player, many=True)
    return JsonResponse(player_serializer.data, safe=False)

@api_view(['PATCH'])
def updatePlayer(request, pk):
    player = Player
    
    try:
        player = Player.objects.get(pk=pk)
    except Player.DoesNotExist:
        return JsonResponse({'message': 'Does not exist'}, status=status.HTTP_404_NOT_FOUND)

    player_update = JSONParser().parse(request)
    player_serializer = PlayerSerializer(player, data=player_update, partial=True)

    if (player_serializer.is_valid()):
        player_serializer.save()
        return JsonResponse(player_serializer.data)
    return JsonResponse(player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def createPlayer(request):
    player_data = JSONParser().parse(request)
    player_serializer = PlayerSerializer(data=player_data)

    if (player_serializer.is_valid()):
        player_serializer.save()
        return JsonResponse(player_serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse(player_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def elepioApp_list(request):
    if request.method == "GET":
        # Save all the ElepioApp (in models.py) model's objects to a variable
        elepioApp = ElepioApp.objects.all()

        # Parm: (key, default). Returns given key or last key value, throws django.utils.datastructures.MultiValueDictKeyError if neither
        title = request.GET.get('title', None)
        if title is not None:
            elepioApp = elepioApp.filter(title__icontains=title) # icontains = case-insensitive search

        elepioApp_serializer = ElepioAppSerializer(elepioApp, many=True) # many=true if dealing with multiple passed-in objects instead of one
        return JsonResponse(elepioApp_serializer.data, safe=False) # safe=False for objects serialization


    elif request.method == 'POST':
        elepioApp_data = JSONParser().parse(request)
        elepioApp_serializer = ElepioAppSerializer(data=elepioApp_data) # one parm = create new instance
        if elepioApp_serializer.is_valid(): # method of serializer to compare passed data to required model structure
            elepioApp_serializer.save()
            return JsonResponse(elepioApp_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(elepioApp_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = ElepioApp.objects.all().delete()
        return JsonResponse({'message': '{} ElepioApps were successfully deleted.'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def elepioApp_detail(request, pk):
    try: 
        elepioApp = ElepioApp.objects.get(pk=pk) 
    except ElepioApp.DoesNotExist:  
        return JsonResponse({'message': 'Does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        elepioApp_serializer = ElepioAppSerializer(elepioApp)
        return JsonResponse(elepioApp_serializer.data)

    elif request.method == 'PUT':
        elepioApp_data = JSONParser().parse(request)
        elepioApp_serializer = ElepioAppSerializer(elepioApp, data=elepioApp_data) # two parm = replace parm1 model with parm2 data
        if elepioApp_serializer.is_valid():
            elepioApp_serializer.save()
            return JsonResponse(elepioApp_serializer.data)
        return JsonResponse(elepioApp_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        elepioApp.delete()
        return JsonResponse({'message': 'ElepioApp was successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def elepioApp_list_published(request):

    # if request.method == "GET":
    #     # Save all the ElepioApp (in models.py) model's objects to a variable
    #     elepioApp = ElepioApp.objects.all()

    #     # Parm: (key, default). Returns given key or last key value, throws django.utils.datastructures.MultiValueDictKeyError if neither
    #     title = request.GET.get('title', None)
    #     if title is not None:
    #         elepioApp = elepioApp.filter(title__icontains=title) # icontains = case-insensitive search

    #     elepioApp_serializer = ElepioAppSerializer(elepioApp, many=True) # many=true if dealing with multiple passed-in objects instead of one
    #     return JsonResponse(elepioApp_serializer.data, safe=False) # safe=False for objects serialization

    elepioApps = ElepioApp.objects.filter(published=True)
    
    if request.method == 'GET':
        elepioApps_serializer = ElepioAppSerializer(elepioApps, many=True)
        return JsonResponse(elepioApps_serializer.data, safe=False)

