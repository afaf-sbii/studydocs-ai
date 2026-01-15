import chromadb

# Initialiser ChromaDB
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("documents")

def add_document(doc_name, chunks):
    """Ajoute chunks d'un document à ChromaDB"""
    for i, chunk in enumerate(chunks):
        collection.add(
            documents=[chunk],
            ids=[f"{doc_name}_chunk_{i}"],
            metadatas=[{"source": doc_name, "chunk_id": i}]
        )

def search_documents(query, n_results=3):
    """Cherche chunks pertinents"""
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    return results

def get_all_sources():
    """Récupère tous les noms de documents uniques"""
    try:
        all_data = collection.get()
        if not all_data or not all_data['metadatas']:
            return []
        sources = list(set([m['source'] for m in all_data['metadatas']]))
        return sources
    except Exception as e:
        print(f"❌ Erreur get_all_sources : {str(e)}")
        return []

def delete_by_source(source_name):
    """Supprime tous les chunks d'une source"""
    try:
        all_data = collection.get()
        if not all_data: return False
        ids_to_delete = [all_data['ids'][i] for i, m in enumerate(all_data['metadatas']) if m['source'] == source_name]
        if ids_to_delete:
            collection.delete(ids=ids_to_delete)
            return True
        return False
    except Exception as e:
        print(f"❌ Erreur delete_by_source : {str(e)}")
        return False