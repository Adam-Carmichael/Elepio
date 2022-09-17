# app.py
import os, psycopg2

from flask import Flask, render_template, request, jsonify

#from app.models import Board
#from app.models import Player

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="flask_db",
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD'])
    
    return conn


