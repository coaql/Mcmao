from flask import Flask, render_template, request, redirect, session, jsonify
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

#list of category
CATEGORY = ['Cosmetics','Clothing','Education','Entertainment','Food','Health Care','Rent','Subscription','Travel','Other']

#generating random salt
def salt():
    return ''.join(random.choices('MyCredits&MyAssetsObservatory@20-12-2022',k=10))



# default route for home page 
@app.route("/")
def home():
    #check if the user have the session key
    if not session.get("username") :
        return redirect("/register")
    return render_template("home.html", category = CATEGORY)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST" :
        user_dict = db.execute('SELECT username from user_auth')
        #check for exiting usernames
        for user in user_dict :
            if user["username"] == request.form.get("username"):
                return render_template("register.html", status_register = None, status_login = 1)
        session["username"] = request.form.get("username")
        extra = salt()
        session["password"] = generate_password_hash(request.form.get("password") + extra)
        db.execute("INSERT INTO user_auth VALUES (?,?,?)",
                   session["username"], session["password"], extra)
        return redirect("/")
    return render_template("register.html",status_login = 1, status_register = 1)

# fetch db and iterate over every dict to verify username and hash
@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        #query match for username and password
        check_pass = db.execute('SELECT hash, salt from user_auth where username = ? '
                                  , username)
        if not check_pass:
            return render_template("login.html",status_login = None, status_register = 1)
        status_login = check_password_hash(check_pass[0]['hash'], password+check_pass[0]['salt'])
        if(status_login):
            session['username'] = username
            return redirect("/")
        return render_template("login.html", status_login = status_login, status_register = 1) 
    return render_template("login.html", status_login = 1, status_register = 1) 

@app.route("/logout")
def logout():
    session["username"] = None
    return redirect("/")

@app.route("/statement")
def statement():
    if not session.get("username"):
        return redirect("/")
    return render_template("statement.html", category = CATEGORY)

@app.route("/ledge", methods=['GET','POST'])
def write():
    if session.get("username") :
        if request.method == 'POST':
            amount, date, description, category = request.form.get('amount'), request.form.get('date'), request.form.get('description'), request.form.get('category')
            if category not in CATEGORY :
                category = 'Other '
            db.execute("insert into statements(amount, date, description, category, username) values(?,?,?,?,?)",amount,date,description,category,session.get('username'))
            return 0
        else :
            if not request.args.get('recent') :
                statements = db.execute("Select amount, date, description, category from statements where username = ?", session.get("username"))
                return jsonify(statements)
            else :
                statements = db.execute("SELECT amount, date, description, category FROM statements WHERE username = ? ORDER BY id DESC LIMIT 5", session.get("username"))
                return jsonify(statements)
    else:
        return redirect("/")



@app.route("/notes")
def notes():
    return render_template("notes.html")

@app.route("/goals")
def goals():
    return render_template("goals.html")

@app.route("/profile")
def profile():
    return '<h1>'+session.get("username")+'</h1>'+'<form action="/logout"><input type="submit" value="logout"/></form>'

@app.route('/draw')
def draw():
    data = dict()
    juice = dict()
    cats = db.execute('select category from statements where username = ? group by category',session['username'])
    data['category'] = cats
    for cat in cats:
        juice[cat['category']] = db.execute('select sum(amount) as Total, date from statements where category = ? and username =? group by date',cat['category'],session['username'])
        data['juice'] = juice
    return jsonify(data)
