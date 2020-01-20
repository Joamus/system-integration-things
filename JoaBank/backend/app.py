from flask import Flask, Response, render_template, request
from flask_cors import CORS
import dicttoxml
import sqlite3
import jwt
import json

app = Flask(__name__)
CORS(app)

@app.route('/balance')
def get_balance():
	if request.headers.get('Authorization'):

		with open('./secret.key', 'r') as fh:
			secret = fh.read()

		token = jwt.decode(request.headers['Authorization'][6:], secret, algorithms=['HS256'])
		db = sqlite3.connect('database/database.db')
		cursor = db.cursor()
		cursor.execute('SELECT * FROM user WHERE email=?', (token["email"],))
		result = cursor.fetchall()
		cursor.close()
		if result == None:
			return Response(status=404, response='')
		else:
			user = {"email": result[0][0], "balance": result[0][1]}
			return Response(status=200, response=dicttoxml.dicttoxml(user), content_type="application/xml")
	else:
		return Response(status=401, response=dicttoxml.dicttoxml({"error":"No token provided"}))

if __name__ == "__main__":
	app.run(port=5000)