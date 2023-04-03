from flask import Flask, render_template, request, redirect, session
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL
import random
import string

#config app
app = Flask(__name__)


#connect to database
db = SQL("sqlite:///mcmao.db")


#Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

#generating random salt
def salt():
    return ''.join(random.choices('MyCredits&MyAssetsObservatory@20-12-2022',k=10))





# default route for home page 
@app.route("/")
def home():
    #check if the user have the session key
    if not session.get("username") :
        return redirect("/register")
    return render_template("home.html",username = session["username"])



# for post update db 
# for get render register page
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST" :
        #query user list of users
        user_dict = db.execute('SELECT username from user_auth')
        #
        #check for exiting usernames
        for user in user_dict :
            if user["username"] == request.form.get("username"):
                return render_template("register.html", status_register = None, status_login = 1)
        session["username"] = request.form.get("username")
        session["password"] = request.form.get("password")
        db.execute("INSERT INTO user_auth VALUES (?,?,?)",
                   session["username"], session["password"], salt())
        return redirect("/")
    return render_template("register.html",status_login = 1, status_register = 1)


#only post 
# fetch db and iterate over every dict to verify username and hash
@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        #query match for username and password
        status_login = db.execute('SELECT count(*) as count from user_auth where username = ? and hash = ?'
                                  , username, password ).pop(0).get("count")
        if not status_login :
            return render_template("login.html",status_login = status_login, status_register = 1)
        session['username'] = username
        return redirect("/")
    return render_template("login.html", status_login = 1, status_register = 1) 

@app.route("/logout")
def logout():
    session["username"] = None
    session["password"] = None
    return redirect("/")

@app.route("/test")
def test():
    return render_template("home.html") 


