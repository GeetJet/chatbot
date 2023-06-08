import slbot
from flask import Flask, render_template, request, send_from_directory, send_file
import os
import json

app = Flask(__name__)
app.static_folder = 'static'


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get")
def get_bot_response():
    userText = request.args.get('msg')
    # outputfile = slbot.qna_response(userText)
    # if (outputfile == 'output1.pdf'):
    #     tos()
    print(userText)
    get_bot_response.num = -1
    if "cover" in userText:
        get_bot_response.num = 0
        #print(num)
    elif "final" in userText:
        get_bot_response.num = 1
    elif "integrity critical" in userText:
        get_bot_response.num = 2
    elif "window" in userText:
        get_bot_response.num = 3

    return str(slbot.qna_response(userText))

@app.route('/home')
def tos():
    workingdir = os.path.abspath(os.getcwd())
    filepath = workingdir
    print(filepath)
    try:
        numb = get_bot_response.num
    except:
        numb = -1
    #return send_from_directory(filepath, 'output1.pdf')
    # return render_template("view.html",name=filepath)
    path = "static/pdf/"
    a = os.listdir(path)
    text = json.dumps(sorted(a))
    # return send_file("C:/Users/Gjeethwani/PycharmProjects/pythonProject/chatbot/Generated Speech.mp3")
    return render_template("pdfviewer.html", contents=text, data=numb)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
