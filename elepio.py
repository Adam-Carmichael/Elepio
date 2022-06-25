# app.py
import json

from flask import Flask, Response, render_template, request, jsonify

from flask_expects_json import expects_json
from flask_cors import CORS, cross_origin
from flask_mongoengine import MongoEngine
from flask_sock import Sock

from mongoengine.errors import FieldDoesNotExist, ValidationError

from app.models import Board
from app.models import Player

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://elepio_admin:GMpblUA898oclres@cluster0.02gp5.mongodb.net/Elepio?retryWrites=true&w=majority'
}

#app.config.from_pyfile('config.cfg')
db = MongoEngine(app)
sock = Sock(app)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

#@app.route('/') # the route decorator which specifies what URL triggers the following function(s)
#def elepio_doc():
#    return "<p>Welcome to the placeholder for the Elepio documentation</p>"


#####################################
###
###  The Board's CRUD operations  ###
###
#####################################

# Returns all boards
@app.route('/api/boards', methods=['GET'])
@cross_origin()
def get_boards():
    try: 
        boards = Board.objects()
        if not boards:
            response = format_response({"message": "There are no boards"})
            return response, 404

        response = format_response(boards)
        return response, 200
    except ValidationError:
        response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
        return response, 400

# Create/update a board
@app.route('/api/boards', methods=['POST', 'PATCH'])
@cross_origin()
def create_board():
    try:
        data = request.get_json()
        board = Board(**data)
        board.save()
    except ValidationError:
        response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
        return response, 400
    except FieldDoesNotExist:
        response = format_response({"message": "Field does not exist error thrown, please check your posted body for errors"})
        return response, 400
    
    response = format_response(board)
    return response, 200

# Return, update, or delete a specific board
@app.route('/api/boards/<board_id>', methods=['GET', 'PATCH', 'DELETE'])
@cross_origin()
def get_patch_delete_board(board_id: str):
    if request.method == 'GET':
        try:
            board = Board.objects(pk=board_id)
            if not board:
                response = format_response({"message": "There is no board by that ID"})
                return response, 404
            response = format_response(board)
            return response, 200
        except ValidationError:
            response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
            return response, 400

    if request.method == 'PATCH':
        try: 
            data = request.get_json()
            board = Board.objects(pk=board_id)
            board.update(**data)
            response = format_response({"message": "Board updated"})
            return response, 204
        except ValidationError:
            response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
            return response, 400
        except FieldDoesNotExist:
            response = format_response({"message": "Field does not exist error thrown, please check your posted body for errors"})
            return response, 400

    if request.method == 'DELETE':
        board = Board.objects(pk=board_id)
        if not board:
            response = format_response({"message": "There is no board by that ID"})
            return response, 404
        board.delete()
        response = format_response({"message": "Board successfully deleted"})
        return response, 200



######################################
###
###  The Player's CRUD operations  ###
###
######################################

# Returns all players
@app.route('/api/players', methods=['GET'])
@cross_origin()
def get_players():
    players = Player.objects()
    if not players:
        response = format_response({"message": "There are no players"})
        return response, 404

    response = format_response(players)
    return response, 200

# Create a player
@app.route('/api/players', methods=['POST'])
@cross_origin()
def create_player():
    try:
        data = request.get_json()
        player = Player(**data)
        player.save()
    except ValidationError:
        response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
        return response, 400
    except FieldDoesNotExist:
        response = format_response({"message": "Field does not exist error thrown, please check your posted body for errors"})
        return response, 400
    
    response = format_response(player)
    return response, 200

# Return, update, or delete a player
@app.route('/api/players/<player_id>', methods=['GET', 'PATCH', 'DELETE'])
@cross_origin()
def get_patch_delete_player(player_id: str):
    if request.method == 'GET':
        try:
            player = Player.objects(pk=player_id)
            if not player:
                response = format_response({"message": "There is no player by that ID"})
                return response, 404
            response = format_response(player)
            return response, 200
        except ValidationError:
            response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
            return response, 400

    if request.method == 'PATCH':
        try: 
            data = request.get_json()
            player = Player.objects(pk=player_id)
            player.update(**data)
            response = format_response({"message": "Player updated"})
            return response, 204
        except ValidationError:
            response = format_response({"message": "Validation error thrown, please check your posted body for errors"})
            return response, 400
        except FieldDoesNotExist:
            response = format_response({"message": "Field does not exist error thrown, please check your posted body for errors"})
            return response, 400

    if request.method == 'DELETE':
        player = Player.objects(pk=player_id)
        if not player:
            response = format_response({"message": "There is no player by that ID"})
            return response, 404
        player.delete()
        response = format_response({"message": "Player successfully deleted"})
        return response, 200



#####################################
###
###  Unique operations (Non-CRUD) ###
###
#####################################

# Return first active board
@app.route('/api/board', methods=['GET'])
@cross_origin()
def get_board():
    boards = Board.objects(active=True).first()
    if not boards:
        response = format_response({"message": "There are no boards"})
        return response, 404

    response = format_response(boards)
    return response, 200

# Return all players associated with a given board
@app.route('/api/board/<board_id>/players', methods=['GET'])
@cross_origin()
def get_board_players(board_id: str):
    players = Player.objects(board_id=board_id)
    response = format_response(players)
    return response, 200

# Websocket protocol: return all players associated with a given board
@sock.route('/ws/board/players')
def ws_get_board_players(ws):
    while True:
        data = ws.receive()
        data = validate_json_ws(data, ws)
        try:
            players = Player.objects(board_id=data['body']['id'])
            response = players.to_json()
            ws.send(response)
        except ValidationError:
            response = format_response({"message": "Validation error thrown, please check the sent data for errors"})
            ws.close(1006, response)

# Websocket protocol: update a player given their player ID
@sock.route('/ws/player')
def ws_update_player(ws):
    while True:
        data = ws.receive()
        data = validate_json_ws(data, ws)
        try:
            player = Player.objects(pk=data['body']['id'])
            response = player.update(**data['body'])
            ws.send(response)
        except ValidationError:
            response = format_response({"message": "Validation error thrown, please check the sent data for errors"})
            ws.close(1006, response)

# Websocket protocol: return response, used for testing
@sock.route('/ws/echo')
def echo(ws):
    while True:
        data = ws.receive()
        data = validate_json_ws(data, ws)
        ws.send(data)



#######################
###
###  Helper Methods ###
###
#######################

# For HTTP routes: format data or string
def format_response(someObj):
    if (isinstance(someObj, str)):
        formattedObj = Response(someObj)
        print(formattedObj)
    else:
        formattedObj = jsonify(someObj)
        print(formattedObj)
    #formattedObj.headers.add('Access-Control-Allow-Origin', '*')
    return formattedObj

def validate_json_ws(data, ws):
    try:
        data = json.loads(data)
        if data is not None:
            return data
        ws.close(1003, "JSON is invalid")
    except:
        ws.close(1003, "Data is not JSON")