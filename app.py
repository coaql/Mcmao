from flask import Flask, render_template, request

app = Flask(__name__)

REGISTER = []

@app.route("/")
def register():
    return render_template("register.html")

@app.route("/success")
def sucess():
    name = request.args.get("username")
    if name in REGISTER :
        return f"Username already registered!!"
    REGISTER.append(name)
    return f"sucessfully registered."

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/home")
def home():
    #check if user is in register list
    name = request.args.get("username")
    if name not in REGISTER :
        return render_template("unsuccess.html")

    return render_template("home.html",name = name)


