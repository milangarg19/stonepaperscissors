from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

@app.route('/play', methods=['POST'])
def play():
    data = request.json
    player1 = data.get("player1")
    player2 = data.get("player2")

    result = determine_winner(player1, player2)
    return jsonify({"result": result})

def determine_winner(player1, player2):
    if player1 == player2:
        return "It's a tie!"
    elif (player1 == "rock" and player2 == "scissors") or \
         (player1 == "paper" and player2 == "rock") or \
         (player1 == "scissors" and player2 == "paper"):
        return "Player 1 wins!"
    else:
        return "Player 2 wins!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

