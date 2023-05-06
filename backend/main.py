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
    
@app.route('/CurrencyData', methods=['POST', 'GET'])
def CurrencyData():
    if request.method == "GET":
        CurrencyData = db['Currency'].find()
        CurrencyData = CurrencyData[0]['tables'][0]['data']
        return jsonify(CurrencyData)
    
@app.route('/EmployeeData', methods=['POST', 'GET'])
def EmployeeData():
    if request.method == "GET":
        EmployeeData = db['Employee'].find()
        EmployeeData = EmployeeData[0]['tables'][0]['columns']
        return jsonify(EmployeeData)
    
@app.route('/EmployeeProjectData', methods=['POST', 'GET'])
def EmployeeProjectData():
    if request.method == "GET":
        EmployeeProjectData = db['EmployeeProjects'].find()
        EmployeeProjectData = EmployeeProjectData[0]['tables'][0]['columns']
        return jsonify(EmployeeProjectData)

@app.route('/ProjectExpenseClaimsData', methods=['POST', 'GET'])
def GetProjectExpenseClaimsData():
    if request.method == "GET":
        EmployeeID = '10011'
        ProjectExpenseClaimsData = db['ProjectExpenseClaims'].find()
        ProjectExpenseClaimsData = ProjectExpenseClaimsData[0]['tables'][0]['columns']
        res = []
        for claim in ProjectExpenseClaimsData:
            # print(claim["EmployeeID"])
            if claim["EmployeeID"] == EmployeeID:
                res.append(claim)

        return res

    if request.method == "POST":
        #  Declare DB
        ProjectExpenseClaimsData = db['ProjectExpenseClaims']
        #  Claim data from request
        data = request.json
        # Insert data into MongoDB
        ProjectExpenseClaimsData.update_one({ 'tables.name': 'projectexpenseclaims'},{'$push': {'tables.$[].columns': data}})
        # need to add prev claim ID
        # project ID needs to be existing project

        return 'Data added to ProjectExpenseClaims'

@app.route('/EmployeeDataName', methods=['GET'])
def GetEmployeeName():
    if request.method == "GET":
        EmployeeID = '10001'

        EmployeeData = db['Employee'].find()
        EmployeeData = EmployeeData[0]['tables'][0]['columns']

        res = {}
        for employee in EmployeeData:
            if employee['EmployeeID'] == EmployeeID:
                res =  {"FirstName": employee['FirstName'], "LastName": employee["LastName"]}

        return jsonify(res)

if __name__ == "__main__":
    app.run(debug=True)