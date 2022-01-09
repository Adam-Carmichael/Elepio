# app.py

from flask import Flask
from flask_mongoengine import MongoEngine
from flask import request
from flask import jsonify

from app.models import Board
from app.models import Player

app = Flask(__name__)
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb+srv://elepio_admin:GMpblUA898oclres@cluster0.02gp5.mongodb.net/Elepio?retryWrites=true&w=majority'
}
#app.config.from_pyfile('config.cfg')
db = MongoEngine(app)

@app.route('/') # the route decorator which specifies what URL triggers the following function(s)
def elepio_doc():
    return "<p>Welcome to the placeholder for the Elepio documentation</p>"



#####################################
###
###  The Board's CRUD operations  ###
###
#####################################

@app.route('/api/getBoard/<board_id>', methods=['GET'])
def get_board(board_id: int):
    board = Board.objects(board_id=board_id)
    if not board:
        return "There is no board by that ID", 404

    return jsonify(board), 200

@app.route('/api/getBoards', methods=['GET'])
def get_boards():
    boards = Board.objects()
    if not boards:
        return "There are no boards", 404

    return jsonify(boards), 200



######################################
###
###  The Player's CRUD operations  ###
###
######################################

@app.route('/api/getPlayer/<player_id>', methods=['GET'])
def get_player(player_id: int):
    player = Player.objects(player_id=player_id)
    if not player:
        return "There is no player by that ID", 404

    return jsonify(player), 200

@app.route('/api/getPlayers', methods=['GET'])
def get_players():
    players = Player.objects()
    if not players:
        return "There are no players", 404

    return jsonify(players), 200

"""@app.route('/api/getFirstActiveBoard', methods=['GET', 'POST']) # if GET, you have HEAD and OPTIONS supported by Flask
def getFirstActiveBoard():
    if request.method == 'POST':
        return "<p>POST - Utahraptors are OP</p>"
    else:
        return "<p>GET - Rexes are OP</p>"
"""