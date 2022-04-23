# app.py

from flask import Flask, Response, render_template
from flask import request
from flask import jsonify

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

@app.route('/api/boards', methods=['GET'])
@cross_origin()
def get_boards():
    boards = Board.objects()
    if not boards:
        return "There are no boards", 404

    response = format_response(boards)
    return response, 200

@app.route('/api/boards', methods=['POST', 'PATCH'])
@cross_origin()
def create_board():
    try:
        data = request.get_json()
        board = Board(**data)
        board.save()
    except ValidationError:
        response = format_response("Validation error thrown, please check your posted body for errors")
        return response, 400
    except FieldDoesNotExist:
        response = format_response("Field does not exist error thrown, please check your posted body for errors")
        return response, 400
    
    response = format_response(board)
    return response, 200

@app.route('/api/boards/<board_id>', methods=['GET', 'PATCH', 'DELETE'])
@cross_origin()
def get_patch_delete_board(board_id: str):
    if request.method == 'GET':
        board = Board.objects(pk=board_id)
        if not board:
            response = format_response("There is no board by that ID")
            return response, 404
        response = format_response(board)
        return response, 200

    if request.method == 'PATCH':
        try: 
            data = request.get_json()
            board = Board.objects(pk=board_id)
            board.update(**data)
            response = format_response("Board updated")
            return response, 204
        except ValidationError:
            response = format_response("Validation error thrown, please check your posted body for errors")
            return response, 400
        except FieldDoesNotExist:
            response = format_response("Field does not exist error thrown, please check your posted body for errors")
            return response, 400

    if request.method == 'DELETE':
        board = Board.objects(pk=board_id)
        if not board:
            response = format_response("There is no board by that ID")
            return response, 404
        board.delete()
        response = format_response("Board successfully deleted")
        return response, 200



######################################
###
###  The Player's CRUD operations  ###
###
######################################

@app.route('/api/players', methods=['GET'])
@cross_origin()
def get_players():
    players = Player.objects()
    if not players:
        response = format_response("There are no players")
        return response, 404

    response = format_response(players)
    return response, 200

@app.route('/api/players', methods=['POST'])
@cross_origin()
def create_player():
    try:
        data = request.get_json()
        player = Player(**data)
        player.save()
    except ValidationError:
        response = format_response("Validation error thrown, please check your posted body for errors")
        return response, 400
    except FieldDoesNotExist:
        response = format_response("Field does not exist error thrown, please check your posted body for errors")
        return response, 400
    
    response = format_response(player)
    return response, 200

@app.route('/api/players/<player_id>', methods=['GET', 'PATCH', 'DELETE'])
@cross_origin()
def get_patch_delete_player(player_id: str):
    if request.method == 'GET':
        player = Player.objects(pk=player_id)
        if not player:
            response = format_response("There is no player by that ID")
            return response, 404
        response = format_response(player)
        return response, 200

    if request.method == 'PATCH':
        try: 
            data = request.get_json()
            player = Player.objects(pk=player_id)
            player.update(**data)
            response = format_response("Player updated")
            return response, 204
        except ValidationError:
            response = format_response("Validation error thrown, please check your posted body for errors")
            return response, 400
        except FieldDoesNotExist:
            response = format_response("Field does not exist error thrown, please check your posted body for errors")
            return response, 400

    if request.method == 'DELETE':
        player = Player.objects(pk=player_id)
        if not player:
            response = format_response("There is no player by that ID")
            return response, 404
        player.delete()
        response = format_response("Player successfully deleted")
        return response, 200



#####################################
###
###  Unique operations (Non-CRUD) ###
###
#####################################

@app.route('/api/board', methods=['GET'])
@cross_origin()
def get_board():
    boards = Board.objects(active=True).first()
    if not boards:
        response = format_response("There are no boards")
        return response, 404

    response = format_response(boards)
    return response, 200

@app.route('/api/board/<board_id>/players', methods=['GET'])
@cross_origin()
#@socketio.event
def get_board_players(board_id: str):
    players = Player.objects(board_id=board_id)
    response = format_response(players)
    return response, 200

# Temporary route for testing web socket connection
@sock.route('/api/echo')
def echo(ws):
    while True:
        data = ws.receive()
        ws.send(data)



#######################
###
###  Helper Methods ###
###
#######################

def format_response(someObj):
    if (isinstance(someObj, str)):
        formattedObj = Response(someObj)
    else:
        formattedObj = jsonify(someObj)
    #formattedObj.headers.add('Access-Control-Allow-Origin', '*')
    return formattedObj