from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

SERVER = '141.56.2.45'
DATABASE = 'ii20s82050'
DRIVER = 'ODBC Driver 17 for SQL Server'
USERNAME = 's82050'
PASSWORD = 's82050'

app = Flask(__name__)
api = Api(app)

app.config['SQLALCHEMY_DATABASE_URI']=f'mssql://{USERNAME}:{PASSWORD}@{SERVER}/{DATABASE}?driver={DRIVER}'
db = SQLAlchemy(app)

class NameModel(db.Model):
    name = db.Column(db.String(100), primary_key=True)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return f"Video( age = {age}, gender = {gender})"


video_put_args = reqparse.RequestParser()
video_put_args.add_argument("age", type=int, help="Enter your age pleasa", required=True)
video_put_args.add_argument("gender", type=str, help="Enter your gender please", required=True) 

resource_fields = {
    'name' : fields.String,
    'age' : fields.Integer,
    'gender' : fields.String
}

class HelloWorld(Resource):
    @marshal_with(resource_fields)
    def get(self, name):
        result = NameModel.query.filter_by(name=name).first()
        return result

    @marshal_with(resource_fields)
    def put(self, name):
        args = video_put_args.parse_args()
        name = NameModel(name=name, age=args['age'], gender=args['gender'])
        db.session.add(name)
        db.session.commit()
        return name, 201


api.add_resource(HelloWorld, "/<string:name>")

if __name__ == "__main__" :
    app.run(debug=True)

