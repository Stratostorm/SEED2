from flask import Flask, render_template, flash, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime, date
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_ckeditor import CKEditor
from werkzeug.utils import secure_filename
import uuid as uuid
import os

# Create a Flask Instance
app = Flask(__name__)

# Add Database
# Old SQLite DB
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
# New MySQL DB
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/users'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/expenseclaimsdata'
# Secret Key for CSRF Token
app.config['SECRET_KEY'] = "password"

# Flask_Login Stuff
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return Employee.query.get(int(user_id))

# Initialise the Database
db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route('/')
def home():
    first = Currency.query.filter_by(CurrencyID = 'CNY').first()
    '''
    for i in first:
        print(i.CurrencyID)
        print(i.ExchangeRate)
    #return {"ID": first.CurrencyID, "ExchangeRate": first.ExchangeRate}
    '''
    return f"CurrencyID: {first.CurrencyID}, ExhcangeRate: {first.ExchangeRate}"

'''
# Inital Password hashing for Employee Database
@app.route('/employee')
def add_password():
    employee = Employee.query.all()


    for emp in employee:
        id = emp.EmployeeID
        employee_to_update = Employee.query.get_or_404(id)
        print(emp.Password)
        hashed_pw = generate_password_hash(emp.Password, "sha256")
        print(hashed_pw)

        employee_to_update.Password = hashed_pw
        db.session.commit()
        print("Password Updated for Employee ID:" + str(id))
    print("Completed all password hashing")

    return "<h1>Employee</h1>"
'''
# Test Password Hash
@app.route("/checkpass")
def check_pass():
    emp = Employee.query.filter_by(EmployeeID = 10001).first()
    result = check_password_hash(emp.Password, "Singa@123")
    result2 = check_password_hash(emp.Password, "Singa@122")
    print(result)

    return {"Result": result, "Result2": result2}


class Currency(db.Model):
    CurrencyID = db.Column(db.String(3), primary_key=True)
    ExchangeRate = db.Column(db.Numeric(precision=10, scale=10))

class Employee(db.Model):
    EmployeeID = db.Column(db.Integer, primary_key=True)
    BankAccountNumber = db.Column(db.String(50))
    DepartmentCode = db.Column(db.String(3))
    FirstName = db.Column(db.String(50))
    LastName = db.Column(db.String(50))
    Password = db.Column(db.String(255))
    SupervisorID = db.Column(db.Integer)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute!')
    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug = True)