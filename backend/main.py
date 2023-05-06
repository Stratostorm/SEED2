from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_restful import Api, Resource
from flask_cors import CORS

app =Flask(__name__)
client = MongoClient('mongodb://localhost:27017')
db = client['dbs']
CORS(app)

# @app.route('/')
# def login():
#     return render_template('login.js')

@app.route('/DepartmentData', methods=['POST', 'GET'])
def DepartmentData():
    if request.method == "GET":
        departmentData = db['Department'].find()
        departmentData = departmentData[0]['tables'][0]['data']
        return jsonify(departmentData)
    

if __name__ == "__main__":
    app.run(debug=True)