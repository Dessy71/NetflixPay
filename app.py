# app.py

from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

profiles = [
    {"name": "Dess 1", "passcode": "2356"},
    {"name": "Dess 2", "passcode": "3456"},
    {"name": "Dess 3", "passcode": "4567"},
    {"name": "Dess 4", "passcode": "9876"},
    {"name": "Dess 5", "passcode": "2345"},
]

def get_random_profile():
    return random.choice(profiles)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/initiate-payment', methods=['POST'])
def initiate_payment():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')

    profile = get_random_profile()
    transaction_id = random.randint(1000, 9999)

    # You can store this data in a database or another storage solution
    transaction_data = {
        transaction_id: {"profile": profile, "name": name},
    }

    return jsonify({"transaction_id": transaction_id})

@app.route('/api/success')
def success():
    transaction_id = request.args.get('transaction_id')
    transaction_info = transaction_data.get(int(transaction_id))

    if transaction_info:
        name = transaction_info["name"]
        profile = transaction_info["profile"]
        return jsonify({"name": name, "profile": profile})

    return jsonify({"error": "Invalid transaction ID"})

if __name__ == '__main__':
    app.run(debug=True)
