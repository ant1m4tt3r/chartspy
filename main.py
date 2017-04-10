from flask import Flask, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    print('index')
    return render_template('index.html')


@app.route('/jsonData')
def dt():
    print('data')
    json_file = open("data.json", "r")
    arquivo = json_file.read()
    return jsonify(arquivo)


if __name__ == '__main__':
    app.run()
