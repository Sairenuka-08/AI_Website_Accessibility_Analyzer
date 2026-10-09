from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "AI Interview Coach Backend is running!"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Backend is working"
    })


if __name__ == "__main__":
    app.run(debug=True)