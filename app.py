# app.py
import os, psycopg2

from flask import Flask, render_template, request, jsonify

#from app.models import Board
#from app.models import Player

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="elepio",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])
    
    return conn

#####################################
###
###  The Board's CRUD operations  ###
###
#####################################

# Returns all boards
@app.route('/api/boards', methods=['GET'])
def get_boards():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM board;')
    boards = cur.fetchall()
    cur.close()
    conn.close()

    if len(boards) == 0:
        return boards, 404

    return boards, 200

# Create/update a board
@app.route('/api/boards', methods=['POST', 'PATCH'])
def create_board():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO board VALUES ()')

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
