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

# Initialise the Database
db = SQLAlchemy(app)
migrate = Migrate(app, db)


@app.route('/')
def home():
    first = Currency.query.filter_by(CurrencyID = 'CNY').all()
    for i in first:
        print(i.CurrencyID)
        print(i.ExchangeRate)
    #return {"ID": first.CurrencyID, "ExchangeRate": first.ExchangeRate}

    return "<h1>TEst</h1>"



class Currency(db.Model):
    CurrencyID = db.Column(db.String(3), primary_key=True)
    ExchangeRate = db.Column(db.Numeric(precision=10, scale=10))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug = True)