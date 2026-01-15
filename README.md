# StudyDocs AI 

StudyDocs AI is a **Retrieval-Augmented Generation (RAG)** application designed to bridge the gap between static study materials and active learning. It treats your local documents as a knowledge base, allowing you to ask questions and get context-aware answers instantly.

Built with a **local-first** philosophy, using **Ollama** to ensure your data stays private and secure.

##  Features

*   ** Intelligent Document Processing**: Extracts and cleans text from PDFs automatically.
*   ** Local RAG Engine**: Uses local LLMs (via Ollama) to answer questions without sending data to the cloud.
*   ** Context-Aware**: Retrieves the most relevant sections of your documents to provide accurate answers.
*   ** Modern UI**: Fast, responsive interface built with React and Vite.

##  Tech Stack

**Backend**
*   **Python & Flask**: API and orchestration.
*   **Ollama (Llama 3.2)**: Local LLM inference.
*   **Custom PDF Processor**: Native Python-based text extraction.

**Frontend**
*   **React 19**: UI component library.
*   **Vite**: Build tool.
*   **React Markdown**: Rich text rendering for AI responses.

## 🚀 Getting Started

### Prerequisites
*   Python 3.10+
*   Node.js & npm
*   [Ollama](https://ollama.com/) installed and running.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/studydocs-ai.git
    cd studydocs-ai
    ```

2.  **Backend Setup**
    ```bash
    cd studydocs-backend
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Install dependencies
    pip install -r requirements.txt
    python app.py
    ```

3.  **Frontend Setup**
    ```bash
    cd ../studydocs-ai
    npm install
    npm run dev
    ```

## 🛡️ License

This project is open source and available under the [MIT License](LICENSE).
