# app.py

from flask import Flask
from flask_mongoengine import MongoEngine
from flask import request

from models import Board
from models import Player

app = Flask(__name__) # app variable is an instance of the Flask class
app.config.from_pyfile('config.cfg')
db = MongoEngine(app)

@app.route('/') # the route decorator which specifies what URL triggers the following function(s)
def hello_world():
    return "<p>Hello World!</p>"

@app.route('/api/getFirstActiveBoard', methods=['GET', 'POST']) # if GET, you have HEAD and OPTIONS supported by Flask
def getFirstActiveBoard():
    if request.method == 'POST':
        return "<p>POST - Utahraptors are OP</p>"
    else:
        return "<p>GET - Rexes are OP</p>"
