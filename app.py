from flask import Flask, request, jsonify, send_from_directory, render_template, url_for
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, 
    static_folder='static',
    static_url_path='/static'
)
CORS(app)

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    logger.error("No API key found. Please set GEMINI_API_KEY in .env file")
    raise ValueError("Missing API key")

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')
    logger.info("Gemini API configured successfully")
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {e}")
    model = None

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/interprebot')
def interprebot():
    # Use render_template for interprebot since it uses Jinja templating
    return render_template('interprebot.html')

@app.route('/interprecoach')
def interprecoach():
    # Change to render_template for consistency
    return render_template('interprecoach.html')

@app.route('/resources')
def resources():
    return send_from_directory('templates', 'resources.html')

@app.route('/about')
def about():
    return send_from_directory('templates', 'about.html')

@app.route('/contact')
def contact():
    return send_from_directory('templates', 'contact.html')

@app.route('/signup')
def signup():
    return send_from_directory('templates', 'signup.html')

@app.route('/api/ask-gemini', methods=['POST'])
def ask_gemini():
    if not model:
        return jsonify({"error": "Gemini model not initialized"}), 500

    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "No prompt provided"}), 400

        prompt = data['prompt']
        logger.info(f"Received prompt: {prompt[:50]}...")

        response = model.generate_content(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/chat', methods=['POST'])
def chat():
    if not model:
        return jsonify({"error": "Gemini model not initialized"}), 500

    try:
        data = request.get_json()
        if not data or 'message' not in data:
            return jsonify({"error": "No message provided"}), 400

        response = model.generate_content(data['message'])
        return jsonify({
            "status": "success",
            "response": response.text
        })
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return jsonify({
            "status": "error",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    if os.getenv('FLASK_ENV') == 'development':
        app.run(host='0.0.0.0', port=port, debug=True)
    else:
        from waitress import serve
        serve(app, host='0.0.0.0', port=port)
