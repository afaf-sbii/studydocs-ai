from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import requests
import json

# Importer nos services (pour extraction texte)
from services.pdf_processor import extract_text_from_pdf

# Créer l'application Flask
app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "running"})

@app.route('/upload', methods=['POST'])
def upload_pdf():
    """Sauvegarde simple du fichier - Pas de ChromaDB lourd"""
    if 'file' not in request.files:
        return jsonify({"error": "No file"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    try:
        filename = secure_filename(file.filename)
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        print(f"✅ Fichier sauvegardé: {filename}")
        
        return jsonify({
            "status": "success",
            "filename": filename
        })
    except Exception as e:
        print(f"❌ Erreur upload: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/ask', methods=['POST'])
def ask_question():
    """Pose une question à l'IA en lisant les fichiers directement (Plus robuste)"""
    data = request.json
    query = data.get("query", "")
    
    if not query:
        return jsonify({"error": "No query"}), 400

    print(f"🤖 Question reçue: {query}")
    print("📂 Lecture des documents...")
    
    # Lire les PDFs directement du disque
    context = ""
    documents_read = 0
    
    if os.path.exists(UPLOAD_FOLDER):
        for filename in os.listdir(UPLOAD_FOLDER):
            if filename.endswith('.pdf'):
                try:
                    filepath = os.path.join(UPLOAD_FOLDER, filename)
                    # Lire le texte
                    pdf_text = extract_text_from_pdf(filepath)
                    
                    # LIMITER: 800 caractères par document pour éviter de surcharger
                    context += f"--- Document: {filename} ---\n{pdf_text[:800]}\n\n"
                    documents_read += 1
                except Exception as e:
                    print(f"⚠️ Erreur lecture {filename}: {e}")
    
    print(f"📚 {documents_read} documents lus pour le contexte.")

    # Prompt optimisé
    prompt = f"""Tu es un assistant intelligent. Utilise les documents suivants pour répondre.

CONTEXTE:
{context[:2000]}

QUESTION: {query}

RÉPONSE (en français, concise):"""
    
    print(f"📝 Envoi à Ollama (Prompt: {len(prompt)} chars)...")
    
    try:
        # Appel Streaming à Ollama
        response = requests.post(
            'http://localhost:11434/api/generate',
            json={
                "model": "llama3.2:1b",
                "prompt": prompt,
                "stream": True,
                "options": {
                    "num_ctx": 2048,
                    "temperature": 0.7,
                    "num_predict": 300
                }
            },
            stream=True,
            timeout=45
        )
        
        full_response = ""
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line.decode('utf-8'))
                if 'response' in chunk:
                    full_response += chunk['response']
        
        print("✅ Réponse reçue d'Ollama")
        
        return jsonify({
            'answer': full_response,
            'sources': [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith('.pdf')]
        })
        
    except requests.exceptions.Timeout:
        print("❌ Timeout Ollama")
        return jsonify({
            'answer': "Le modèle prend trop de temps. Essayez une question plus simple.",
            'sources': []
        }), 200
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return jsonify({
            'answer': f"Erreur: {str(e)}",
            'sources': []
        }), 200

@app.route('/documents', methods=['GET'])
def list_documents():
    """Liste les fichiers directement du dossier"""
    try:
        if not os.path.exists(UPLOAD_FOLDER):
            return jsonify({"documents": []})
            
        sources = [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith('.pdf')]
        documents = []
        for source in sources:
            file_path = os.path.join(UPLOAD_FOLDER, source)
            size_mb = "Unknown"
            if os.path.exists(file_path):
                size_mb = f"{os.path.getsize(file_path) / (1024 * 1024):.2f} MB"
            documents.append({"name": source, "size": size_mb})
            
        return jsonify({"documents": documents})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/documents/<doc_name>', methods=['DELETE'])
def delete_doc(doc_name):
    """Supprime un document du disque"""
    try:
        filepath = os.path.join(UPLOAD_FOLDER, doc_name)
        if os.path.exists(filepath):
            os.remove(filepath)
            print(f"🗑️ Supprimé: {doc_name}")
            return jsonify({"status": "success"})
        return jsonify({"status": "not_found"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n🚀 StudyDocs AI Backend (Mode Simple & Robuste)")
    app.run(debug=False, use_reloader=False, port=5000, host='0.0.0.0')