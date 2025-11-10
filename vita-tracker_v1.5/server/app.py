from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite peticiones desde el frontend

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'message': '¡Servidor Flask funcionando correctamente!'
    })

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        'data': ['Item 1', 'Item 2', 'Item 3'],
        'count': 3
    })

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json()
    return jsonify({
        'message': 'Datos recibidos',
        'received': data
    }), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)