from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import json
from datetime import datetime, date, timedelta, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_restful import Api, Resource
from flask_cors import CORS
import random
import datetime
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app =Flask(__name__)
client = MongoClient('mongodb://localhost:27017')
db = client['dbs']
CORS(app)

# JWT Key
app.config["JWT_SECRET_KEY"] = "password"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


# Flask_Login Stuff
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    EmployeeData = EmployeeData = db['Employee'].find()
    EmployeeData = EmployeeData[0]['tables'][0]['columns']

    res = {}
    for emp in EmployeeData:
        # print(claim["EmployeeID"])
        if emp["EmployeeID"] == user_id:
            res = emp
    #return Employee.query.get(int(user_id))
    return res["EmployeeID"]

# @app.route('/')
# def login():
#     return render_template('login.js')

@app.route('/hashpassword')
def hashpassword():
    EmployeeData = db['Employee'].find()
    EmployeeData = EmployeeData[0]['tables'][0]['columns']
    #ProjectExpenseClaimsData = ProjectExpenseClaimsData[0]['tables'][0]['columns']
    print("The employee:")
    print(list(EmployeeData))

    for emp in EmployeeData:
        id = emp["EmployeeID"]
        password = emp["Password"]
        hashed_pw = generate_password_hash(password, "sha256")

        db['Employee'].update_one(
            {'tables.columns.EmployeeID': id},
            {'$set': {
                'tables.$[].columns.$[x].Password': hashed_pw
            }
            },
            array_filters=[{'x.EmployeeID': id}])
    return "<h1>Hashed</h1>"


@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == "POST":
            data = request.json
            employeeID = data.get("employeeId")
            password = data.get("password")

            #employee_data = Employee.query.filter_by(EmployeeID = int(employeeID)).first()
            EmployeeData =  db['Employee'].find()
            EmployeeData = EmployeeData[0]['tables'][0]['columns']

            res = {}
            for emp in EmployeeData:
                # print(claim["EmployeeID"])
                if emp["EmployeeID"] == employeeID:
                    res = emp


            result = check_password_hash(res["Password"], str(password))

            if result:
                access_token = create_access_token(identity=res["EmployeeID"])
                #login_user(res)
                print(access_token)
                return {"token": access_token}
            else:
                return {"message": "Failed to login!"}, 400


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