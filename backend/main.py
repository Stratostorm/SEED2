from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_restful import Api, Resource
from flask_cors import CORS
import random
import datetime

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
        EmployeeID = '10011'
        EmployeeProjectData = db['EmployeeProjects'].find()
        EmployeeProjectData = EmployeeProjectData[0]['tables'][0]['columns']

        res = []
        for project in EmployeeProjectData:
            # print(project["EmployeeID"])
            if str(project["EmployeeID"]) == EmployeeID:
                res.append(project)

        return res

@app.route('/ProjectExpenseClaimsData', methods=['POST', 'GET', 'PUT', 'DELETE'])
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
        # add claim id
        # eompoyee ID
        # ChargeToDefaultDept
        # AlternativeDeptCode
        # Status
        # LastEditedClaimDate = datetime.now
        data['EmployeeID'] = "10001"

        ClaimID_int = str(random.randint(0,100000))
        print(ClaimID_int)

        data['ClaimID'] = ClaimID_int
        data['ChargeToDefaultDept'] = '1'
        data['AlternativeDeptCode'] = '104'
        data['Status'] = 'Pending'
        t = datetime.datetime.now()
        data['LastEditedClaimDate'] = t.isoformat()

        # Insert data into MongoDB
        # ProjectID
        # CurrencyID
        # ExpenseDate
        # Amount
        # Purpose
        ProjectExpenseClaimsData.update_one({ 'tables.name': 'projectexpenseclaims'},{'$push': {'tables.$[].columns': data}})
        # need to add prev claim ID
        # project ID needs to be existing project

        return 'Data added to Claims'

    if request.method == 'PUT':
        #  Declare DB
        ProjectExpenseClaimsData = db['ProjectExpenseClaims']
        #  Claim data from request
        data = request.json
        ProjectExpenseClaimsData.update_one(
            {'tables.columns.ClaimID': data['ClaimID']},
            {'$set': {
                'tables.$[].columns.$[x].Amount': data['Amount'],
                'tables.$[].columns.$[x].Purpose': data['Purpose'],
                'tables.$[].columns.$[x].LastEditedClaim': data['LastEditedClaimDate']
            }
            },
            array_filters=[{'x.ClaimID': data['ClaimID']}])

        return "Data updated successfully!!"

    if request.method == 'DELETE':
        P = db['ProjectExpenseClaims'].find()
        P = P[0]['tables'][0]['columns']
        data = request.json
        ClaimID = data["ClaimID"]

        # ProjectExpenseClaimsData = db['ProjectExpenseClaims'].find()
        # ProjectExpenseClaimsData = ProjectExpenseClaimsData[0]['tables'][0]['columns']
        # res = []

        for item in P:
            if item['ClaimID'] == ClaimID:
                if item['Status'] == 'Approved':
                    return "Only pending claims can be deleted."
                else:
                    #  Declare DB
                    ProjectExpenseClaimsData = db['ProjectExpenseClaims']
                    #  Claim data from request
                    data = request.json
                    ProjectExpenseClaimsData.update_one({'$pull': {'tables.$[].columns.$[x]': data['ClaimID']}})
                    return "Delete Successfully"

        #
        # for claim in ProjectExpenseClaimsData:
        #     if claim["ClaimID"] == ClaimID:
        #         res.append(claim)
        #
        # if Status == 'Pending':
        #     ProjectExpenseClaimsData.delete_one({'ClaimID': ClaimID})
        #     return "Data deleted successfully!!"
        # else:



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