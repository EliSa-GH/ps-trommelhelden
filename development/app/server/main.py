from flask import Flask, json, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
import datetime


SERVER = '141.56.2.45'
DATABASE = 'ii20s82050'
DRIVER = 'ODBC Driver 17 for SQL Server'
USERNAME = 's82050'
PASSWORD = 's82050'

class DTEncoder(json.JSONEncoder):
    def default(self, obj):
        # 👇️ if passed in object is datetime object
        # convert it to a string
        if isinstance(obj, datetime):
            return str(obj)
        # 👇️ otherwise use the default behavior
        return json.JSONEncoder.default(self, obj)

        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']=f'mssql://{USERNAME}:{PASSWORD}@{SERVER}/{DATABASE}?driver={DRIVER}'
db = SQLAlchemy(app)

kunde = db.Table('kunde',db.metadata, autoload=True, autoload_with=db.engine)
auftrag = db.Table('auftrag',db.metadata, autoload=True, autoload_with=db.engine)
name_model = db.Table('name_model',db.metadata, autoload=True, autoload_with=db.engine)


@app.route("/kunden")
def get():
    results = db.session.query(kunde).limit(5).all()

    return {"response" : [r._asdict() for r in results]}


if __name__ == "__main__" :
    app.run(debug=True)

