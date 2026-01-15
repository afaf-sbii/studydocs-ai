import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"

def query_llama(prompt, model="llama3.2:1b"):
    """
    Envoie une requête à Ollama avec streaming et limites
    
    Args:
        prompt (str): Le prompt complet
        model (str): Le modèle à utiliser
        
    Returns:
        str: La réponse de l'IA
    """
    print(f"🤖 Appel à Ollama ({model})...")
    
    # LIMITER le prompt à 4000 caractères pour éviter les timeouts
    if len(prompt) > 4000:
        print(f"⚠️ Prompt trop long ({len(prompt)}), tronqué à 4000.")
        prompt = prompt[:4000]
    
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": True,  # ACTIVER le streaming
        "options": {
            "num_ctx": 2048  # LIMITER la fenêtre de contexte
        }
    }
    
    try:
        # Timeout réduit car on attend juste le début du stream
        response = requests.post(OLLAMA_URL, json=payload, stream=True, timeout=60)
        response.raise_for_status()
        
        result = ""
        # Collecter la réponse en streaming
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line.decode('utf-8'))
                if 'response' in chunk:
                    result += chunk['response']
                    
        print("✓ Réponse reçue")
        return result
        
    except Exception as e:
        print(f"❌ Erreur Ollama : {str(e)}")
        return f"Erreur de connexion à Ollama : {str(e)}. Vérifiez qu'Ollama est bien lancé localement."

def format_prompt(query, context_chunks):
    """
    Formate le prompt final avec le contexte extrait des documents
    """
    # Limiter aussi le contexte s'il est trop grand
    max_context_length = 3000
    context_text = ""
    
    for c in context_chunks:
        chunk_text = f"--- Source: {c['metadata']['source']} ---\n{c['text']}\n\n"
        if len(context_text) + len(chunk_text) < max_context_length:
            context_text += chunk_text
        else:
            break
            
    prompt = f"""Tu es StudyDocs AI, un assistant d'étude intelligent.
Utilise les extraits de documents fournis ci-dessous pour répondre à la question de l'étudiant.
Si la réponse n'est pas dans le contexte, dis-le poliment mais essaie d'aider quand même.

CONTEXTE :
{context_text}

QUESTION DE L'ÉTUDIANT :
{query}

RÉPONSE (Sois clair, pédagogique et structure ta réponse avec du Markdown si nécessaire) :
"""
    return prompt
