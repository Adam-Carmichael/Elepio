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
    """ Example Payload
    {
    "active": "true",
    "bg_color": "#FFFFFF",
    "height": 1100,
    "player_count": 80,
    "player_max": 100,
    "width":1000
    }
    """
    #data = request.get_json()
    #sqlQuery = "INSERT INTO board VALUES (" +  + ")"
    sqlQuery = """ INSERT INTO board VALUES (530, 'true', '#FFFFFF', 1000, 0, 100, 1000)"""

    conn = get_db_connection()
    cur = conn.cursor()
    #cursor.execute("INSERT INTO a_table (c1, c2, c3) VALUES(%s, %s, %s)", (v1, v2, v3))
    cur.execute(sqlQuery)
    conn.commit()

    cur.execute('SELECT * FROM board;')
    boards = cur.fetchall()
    print("Result: ", boards)
    cur.close()
    conn.close()

    return boards, 200
    

    
