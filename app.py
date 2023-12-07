from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

try:
    open('Text.csv', 'x')
    with open("Text.csv", "w") as arquivo:
         arquivo.write("ID,TITULO,TEXTO\n") 
except:
    pass

@app.route("/", methods=['GET'])
def listarNotas():    
    pags = pd.read_csv('Text.csv')
    pags = pags.to_dict('records')    
    return jsonify(pags)

@app.route("/add", methods=['POST'])
def addNotas():
    item = request.json  
    print(item)
    pags = pd.read_csv('Text.csv')
    pags = pags.to_dict('records') 
    id = len(pags) + 1
    with open("Text.csv", "a") as arquivo:
        arquivo.write(f"{id},{item['TITULO']},{item['TEXTO']}\n")    
    
    pags = pd.read_csv('Text.csv')
    pags = pags.to_dict('records')
    return jsonify(pags)

@app.route("/update", methods=['PUT'])
def update_user():
    item = request.json
    pags = pd.read_csv('Text.csv')

    for index, row in pags.iterrows():
        if row['TITULO'] == item['TITULOANTIGO']:
            pags.at[index, 'TITULO'] = item['TITULONOVO']
            pags.at[index, 'TEXTO'] = item['TEXTONOVO']
            pags.to_csv('Text.csv', index=False)
            return "Tarefa alterada com sucesso"
    return "Tarefa não encontrada"



@app.route("/delete", methods=['DELETE'])
def delete_user():
    item = request.json
    print(item)
    idInt = int(item['ID'])
    postagem = pd.read_csv('Text.csv')
    
    if idInt in postagem['ID'].values:
        postagem = postagem[postagem['ID'] != idInt]
        postagem['ID'] = range(1, len(postagem) + 1)
        postagem.to_csv('Text.csv', index=False)
        return "Tarefa excluída com sucesso"
    return "ID não encontrado"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")