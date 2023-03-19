from flask import Flask, render_template, request, redirect, session
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL

#config app
app = Flask(__name__)


#connect to database
db = SQL("sqlite:///mcmao.db")


#Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route("/")
def home():
    #check if user is in user_auth table
    
    if not session.get("username") :
        return redirect("/register")

    return render_template("test.html",session["username"])



#check for token and if not found display login page
@app.route("/register", methods["GET", "POST"])
def register():
    if request.method == "POST" :
        session["username"] = request.form.get("username")
        session["password"] = request.form.get("password")
        return redirect("/")
    return render_template("register.html")



#when the sign up is done redirect to homepage
@app.route("/login" )
def login():
    name = request.forms.get("username")
    if name in REGISTER :
        return f"Username already registered!!"
    REGISTER.append(name)
    return redirect("/register")


@app.route("/test")
def test():
    return render_template("home.html") 


