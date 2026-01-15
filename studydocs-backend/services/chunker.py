def smart_chunk(text, chunk_size=1000, overlap=200):
    """Découpe le texte en chunks avec overlap"""
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    
    return chunks
