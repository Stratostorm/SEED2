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
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:shinying@localhost/expenseclaimsdata'
# Secret Key for CSRF Token
app.config['SECRET_KEY'] = "password"

# Initialise the Database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Currency(db.Model):
    CurrencyID = db.Column(db.String(3), primary_key=True)
    ExchangeRate = db.Column(db.Float)

class Departments(db.Model):
    DeparmentCode = db.Column(db.String(3), primary_key=True)
    DeparmentName = db.Column(db.String(50))

class EmployeeProjects(db.Model):
    ProjectID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(db.Integer, db.ForeignKey('Employee.EmployeeID'))
    ProjectName = db.Column(db.String(100))
    ProjectStatus = db.Column(db.String(50))
    ProjectBudget = db.Column(db.Float)
    ProjectLeadID = db.Column(db.Integer)

class ExpenseClaim(db.Model):
    ClaimID = db.Column(db.Integer, primary_key=True)
    ProjectID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.ProjectID'))
    EmployeeID = db.Column(db.Integer, db.ForeignKey('Employee.EmployeeID'))
    currencyID = db.Column(db.String(3), db.ForeignKey('Currency.CurrencyID'))
    ExpenseDate = db.Column(db.DateTime)
    Amount = db.Column(db.Numeric(precision=10,scale=2))
    Purpose = db.Column(db.String(255))
    ChargeToDefaultDept = db.Column(db.Boolean)
    AlternativeDefaultDept = db.Column(db.String(50))
    Status = db.Column(db.String(20))
    LastEditedClaimDate = db.Column(db.DateTime)


@app.route('/')
def home():
    first = Currency.query.filter_by(CurrencyID = 'CNY').first()
    return {"ID": first.CurrencyID, "ExchangeRate": first.ExchangeRate}





if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug = True)