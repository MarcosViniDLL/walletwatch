from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/gerar_relatorio', methods=['POST'])
def gerar_relatorio():
    return render_template('gerar_relatorio.html')

if __name__ == '__main__':
    app.run(debug=True)