import bcrypt
from flask import Flask
from flask import Flask, render_template, url_for, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField
from wtforms.validators import InputRequired, Length, ValidationError
from flask_bcrypt import Bcrypt

import json
import requests

app = Flask(__name__)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'thisisasecretkey'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model , UserMixin):
    id = db.Column(db.Integer , primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(30), nullable=False)

class LoginForm(FlaskForm):
    username = StringField(validators=[InputRequired(), Length(min=4 , max=20)], render_kw={"placeholder": "Username"})
    password = PasswordField(validators=[InputRequired(), Length(min=4 , max=20)], render_kw={"placeholder": "Password"})
    submit = SubmitField("Login")

@app.route('/')
def home():
    url = 'http://api.weatherapi.com/v1/forecast.json'
    params = dict(key="32185c047a7245c7b22211711222603", q = "New York")
    res = requests.get(url, params=params)
    data = json.loads(res.text)
    print(type(data))
    return render_template("home.html", current = data["current"], location = data["location"], forecast = data["forecast"])

@app.route('/login', methods=['GET', 'POST'])
def login():
    FORM = LoginForm()
    if FORM.validate_on_submit():
        user = User.query.filter_by(username = FORM.username.data).first()
        if user:
            if bcrypt.check_password_hash(user.password, FORM.password.data):
                login_user(user)
                return redirect(url_for('home'))
    return render_template('login.html', form = FORM)

@app.route('/mood', methods = ['GET', 'POST'])
def mood():
    url = 'http://api.weatherapi.com/v1/forecast.json'
    params = dict(key="32185c047a7245c7b22211711222603", q = "New York")
    res = requests.get(url, params=params)
    data = json.loads(res.text)
    return render_template("mood.html", current = data["current"], location = data["location"], forecast = data["forecast"])

if __name__ == '__main__':
    app.run(debug = True)