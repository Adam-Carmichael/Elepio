# app.py

from flask import Flask
from flask_mongoengine import MongoEngine
from flask import request
from flask import jsonify

from app.models import Board
from app.models import Player

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
db = MongoEngine(app)

# Example of saving values to a document
"""
bttf = Movie(title="Back To The Future", year=1985)
bttf.actors = [
    "Michael J. Fox",
    "Christopher Lloyd"
]
bttf.imdb = Imdb(imdb_id="tt0088763", rating=8.5)
bttf.save()
"""

# Example of querying a document
"""
bttf = Movies.objects(title="Back To The Future").get_or_404()
"""

# Example of concatenated query whose response you can iterate over
"""
some_theron_movie = Movie.objects(actors__in=["Charlize Theron"]).first()

for recents in Movie.objects(year__gte=2017):
    print(recents.title)
"""

@app.route('/') # the route decorator which specifies what URL triggers the following function(s)
def hello_world():
    return "<p>Hello World!</p>"

"""@app.route('/api/getFirstActiveBoard', methods=['GET', 'POST']) # if GET, you have HEAD and OPTIONS supported by Flask
def getFirstActiveBoard():
    if request.method == 'POST':
        return "<p>POST - Utahraptors are OP</p>"
    else:
        return "<p>GET - Rexes are OP</p>"
"""