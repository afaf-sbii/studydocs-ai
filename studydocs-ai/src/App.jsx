import { useState, useRef, useEffect } from 'react'

// SVG Icons as components or simple constants
const Icons = {
  Book: () => (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
      <circle cx="8" cy="12" r="4" fill="#7C3AED"></circle>
      <circle cx="20" cy="12" r="4" fill="#A78BFA"></circle>
      <circle cx="32" cy="12" r="4" fill="#C4B5FD"></circle>
    </svg>
  ),
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  Library: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 6l4 14M12 6v14M8 8v12M4 4v16"></path></svg>
  ),
  File: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
  ),
  Upload: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
  ),
  Crown: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path></svg>
  ),
  Robot: () => (
    <svg width="24" height="18" viewBox="0 0 40 24" fill="none">
      <circle cx="8" cy="12" r="6" fill="#7C3AED"></circle>
      <circle cx="20" cy="12" r="6" fill="#A78BFA"></circle>
      <circle cx="32" cy="12" r="6" fill="#C4B5FD"></circle>
    </svg>
  ),
  User: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  ),
  Sparkles: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"></path></svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
  ),
  Paperclip: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2.001 2.001 0 1 1-2.83-2.83l8.49-8.48"></path></svg>
  ),
  Mic: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="18.36" x2="5.64" y2="16.92"></line><line x1="18.36" y1="4.22" x2="19.78" y2="5.64"></line></svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
  )
}

const translations = {
  en: {
    newChat: 'New Chat',
    search: 'Search Chats',
    library: 'Library',
    myDocs: 'My Documents',
    upload: 'Upload',
    upgrade: 'Upgrade to Pro',
    unlimited: 'Unlimited access',
    welcome: 'Welcome back!',
    howCanHelp: 'How can I help you ',
    today: 'today?',
    placeholder: 'Ask anything about your documents...',
    warning: 'StudyDocs AI can make mistakes. Verify important information.',
    suggestions: [
      'Explain this concept from my notes',
      'Summarize a chapter',
      'Create a study guide',
      'Find information about...'
    ],
    botResponse: 'Based on your uploaded documents, here is what I found...',
    page: 'page',
    noDocs: 'No documents yet',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    english: 'English',
    french: 'French'
  },
  fr: {
    newChat: 'Nouvelle discussion',
    search: 'Rechercher',
    library: 'Bibliothèque',
    myDocs: 'Mes Documents',
    upload: 'Télécharger',
    upgrade: 'Passer à Pro',
    unlimited: 'Accès illimité',
    welcome: 'Bon retour !',
    howCanHelp: 'Comment puis-je vous aider ',
    today: 'aujourd\'hui ?',
    placeholder: 'Posez une question sur vos documents...',
    warning: 'StudyDocs AI peut faire des erreurs. Vérifiez les informations importantes.',
    suggestions: [
      'Expliquez ce concept à partir de mes notes',
      'Résumer un chapitre',
      'Créer un guide d\'étude',
      'Trouver des informations sur...'
    ],
    botResponse: 'D\'après vos documents téléchargés, voici ce que j\'ai trouvé...',
    page: 'page',
    noDocs: 'Aucun document',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    english: 'Anglais',
    french: 'Français'
  }
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [documents, setDocuments] = useState([])
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const t = translations[language]

  const theme = {
    bg: isDarkMode ? '#0F172A' : '#ffffff',
    sidebar: isDarkMode ? '#1E293B' : '#F9FAFB',
    border: isDarkMode ? '#334155' : '#E5E7EB',
    text: isDarkMode ? '#F1F5F9' : '#1F2937',
    textMuted: isDarkMode ? '#94A3B8' : '#6B7280',
    itemHover: isDarkMode ? '#334155' : '#F3F4F6',
    inputBg: isDarkMode ? '#1E293B' : '#F9FAFB',
    msgBot: isDarkMode ? '#334155' : '#F3F4F6',
  }

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch initial documents from backend
  useEffect(() => {
    fetch('http://localhost:5000/documents')
      .then(res => res.json())
      .then(data => {
        if (data.documents) {
          const docs = data.documents.map(doc => ({
            id: doc.name,
            name: doc.name,
            status: 'ready',
            size: doc.size
          }))
          setDocuments(docs)
        }
      })
      .catch(err => console.error("Error fetching docs:", err))
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputMessage })
      })

      const data = await response.json()

      const botMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer || t.botResponse,
        timestamp: new Date(),
        sources: data.sources || []
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "Erreur de connexion au serveur StudyDocs. Vérifiez que le backend est lancé.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)

    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          const newDoc = {
            id: data.filename,
            name: data.filename,
            status: 'ready',
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
          }
          setDocuments(prev => [...prev, newDoc])
        }
      } catch (error) {
        console.error("Upload error:", error)
      }
    }
  }

  const handleDeleteDoc = async (docName) => {
    try {
      await fetch(`http://localhost:5000/documents/${docName}`, {
        method: 'DELETE'
      })
      setDocuments(prev => prev.filter(doc => doc.name !== docName))
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const handleClearChat = () => {
    setMessages([])
  }

  const suggestions = t.suggestions

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>

      {/* CONTAINER PRINCIPAL */}
      <div style={{
        flex: 1,
        height: '100%',
        background: theme.bg,
        borderRadius: '24px',
        boxShadow: isDarkMode ? '0 40px 100px rgba(0, 0, 0, 0.4)' : '0 40px 100px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        overflow: 'hidden',
        maxWidth: '1400px',
        margin: '0 auto',
        transition: 'all 0.3s ease'
      }}>

        {/* SIDEBAR GAUCHE */}
        <aside style={{
          width: '280px',
          background: theme.sidebar,
          borderRight: `1px solid ${theme.border}`,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 16px',
          transition: 'all 0.3s ease'
        }}>

          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
            paddingLeft: '8px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              padding: '4px'
            }}>
              <Icons.Book />
            </div>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: theme.text,
              letterSpacing: '-0.5px'
            }}>
              StudyDocs
            </span>
          </div>

          {/* New Chat Button */}
          <button style={{
            width: '100%',
            padding: '12px 18px',
            background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
            transition: 'transform 0.2s'
          }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={handleClearChat}
          >
            <Icons.Edit />
            {t.newChat}
          </button>

          {/* Menu Items */}
          <div style={{ marginBottom: '16px' }}>
            <button style={{
              width: '100%',
              padding: '10px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: theme.textMuted,
              fontWeight: '500',
              marginBottom: '4px',
              transition: 'background 0.2s'
            }}
              onMouseOver={(e) => e.target.style.background = theme.itemHover}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              <Icons.Search />
              {t.search}
            </button>

            <button style={{
              width: '100%',
              padding: '10px 12px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: theme.textMuted,
              fontWeight: '500',
              marginBottom: '4px',
              transition: 'background 0.2s'
            }}
              onMouseOver={(e) => e.target.style.background = theme.itemHover}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              <Icons.Library />
              {t.library}
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.textMuted,
                fontWeight: '500',
                marginBottom: '4px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = theme.itemHover}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
              {isDarkMode ? t.lightMode : t.darkMode}
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: theme.textMuted,
                fontWeight: '500',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = theme.itemHover}
              onMouseOut={(e) => e.target.style.background = 'transparent'}
            >
              <Icons.Globe />
              {language === 'en' ? 'Français' : 'English'}
            </button>
          </div>

          {/* Documents Section */}
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontSize: '12px',
              fontWeight: '600',
              color: theme.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '12px',
              paddingLeft: '12px'
            }}>
              {t.myDocs}
            </h3>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingRight: '4px',
              paddingLeft: '4px'
            }}>
              {documents.length === 0 ? (
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  color: theme.textMuted,
                  fontSize: '13px',
                  fontStyle: 'italic',
                  opacity: 0.7
                }}>
                  {t.noDocs}
                </div>
              ) : (
                documents.map(doc => (
                  <div key={doc.id} style={{
                    padding: '10px 12px',
                    background: isDarkMode ? '#334155' : 'white',
                    borderRadius: '10px',
                    marginBottom: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: `1px solid ${theme.border}`
                  }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = isDarkMode ? '#475569' : '#F9FAFB'
                      e.currentTarget.style.borderColor = '#7C3AED'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = isDarkMode ? '#334155' : 'white'
                      e.currentTarget.style.borderColor = theme.border
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                      <div style={{ color: '#7C3AED' }}><Icons.File /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontSize: '13px',
                          fontWeight: '500',
                          color: theme.text,
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {doc.name}
                        </p>
                        <p style={{
                          fontSize: '11px',
                          color: theme.textMuted,
                          margin: '1px 0 0 0'
                        }}>
                          {doc.size}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.name); }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: theme.textMuted,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icons.X />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div style={{ marginTop: '16px' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '12px',
                background: isDarkMode ? '#1E293B' : 'white',
                color: '#7C3AED',
                border: '2px solid #7C3AED',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = isDarkMode ? '#334155' : '#F5F3FF'
              }}
              onMouseOut={(e) => {
                e.target.style.background = isDarkMode ? '#1E293B' : 'white'
              }}
            >
              <Icons.Upload />
              {t.upload}
            </button>
          </div>

          {/* Upgrade Card */}
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
            borderRadius: '12px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-15px',
              right: '-15px',
              width: '60px',
              height: '60px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%'
            }} />
            <div style={{ color: 'white', marginBottom: '4px' }}><Icons.Crown /></div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 4px 0' }}>{t.upgrade}</h4>
            <p style={{ fontSize: '11px', margin: 0, opacity: 0.9, lineHeight: '1.4' }}>
              {t.unlimited}
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: theme.bg,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>

          {/* Empty State / Welcome */}
          {messages.length === 0 ? (
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              overflowY: 'auto'
            }}>

              {/* Logo Central */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                position: 'relative'
              }}>
                <Icons.Book />
              </div>

              {/* Welcome Text */}
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: theme.text,
                margin: '0 0 12px 0',
                textAlign: 'center',
                letterSpacing: '-1px'
              }}>
                {t.welcome}
              </h1>
              <p style={{
                fontSize: '16px',
                color: theme.textMuted,
                margin: 0,
                textAlign: 'center'
              }}>
                {t.howCanHelp} <span style={{ color: '#7C3AED', fontWeight: '600' }}>{t.today}</span>
              </p>

              {/* Suggestions */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginTop: '32px',
                maxWidth: '600px',
                width: '100%'
              }}>
                {suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMessage(suggestion)}
                    style={{
                      padding: '14px 16px',
                      background: theme.inputBg,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '12px',
                      fontSize: '13px',
                      color: theme.text,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#7C3AED'
                      e.currentTarget.style.background = isDarkMode ? '#475569' : '#F5F3FF'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = theme.border
                      e.currentTarget.style.background = theme.inputBg
                    }}
                  >
                    <div style={{ color: '#7C3AED' }}><Icons.Sparkles /></div>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // CHAT MESSAGES
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 32px'
            }}>
              {messages.map(message => (
                <div key={message.id} style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '20px',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  {message.role === 'assistant' && (
                    <div style={{
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icons.Robot />
                    </div>
                  )}

                  <div style={{
                    maxWidth: '70%',
                    background: message.role === 'user' ? 'linear-gradient(135deg, #7C3AED, #A78BFA)' : theme.msgBot,
                    color: message.role === 'user' ? 'white' : theme.text,
                    padding: '14px 18px',
                    borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    boxShadow: message.role === 'user' ? '0 4px 12px rgba(124, 58, 237, 0.15)' : 'none'
                  }}>
                    {message.content}
                    {message.sources && (
                      <div style={{
                        marginTop: '10px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        fontSize: '12px',
                        opacity: 0.8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Icons.File />
                        {message.sources.join(', ')}
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: '#E5E7EB',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6B7280',
                      flexShrink: 0
                    }}>
                      <Icons.User />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icons.Robot />
                  </div>
                  <div style={{
                    background: theme.msgBot,
                    padding: '14px 18px',
                    borderRadius: '18px 18px 18px 4px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}>
                    <div className="typing-dot" />
                    <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
                    <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* INPUT AREA */}
          <div style={{
            padding: '16px 32px 24px',
            background: theme.bg,
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: theme.inputBg,
                borderRadius: '12px',
                padding: '6px 6px 6px 16px',
                border: `1px solid ${theme.border}`,
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#7C3AED'}
                onBlur={(e) => e.currentTarget.style.borderColor = theme.border}
              >
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: theme.textMuted,
                  display: 'flex'
                }}>
                  <Icons.Paperclip />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t.placeholder}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '10px',
                    fontSize: '14px',
                    color: theme.text,
                    outline: 'none'
                  }}
                />

                <button style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: theme.textMuted,
                  display: 'flex'
                }}>
                  <Icons.Mic />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  style={{
                    background: inputMessage.trim() ? '#7C3AED' : (isDarkMode ? '#334155' : '#E5E7EB'),
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px',
                    marginLeft: '8px',
                    cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icons.Send />
                </button>
              </div>
              <p style={{
                textAlign: 'center',
                fontSize: '11px',
                color: theme.textMuted,
                marginTop: '10px'
              }}>
                {t.warning}
              </p>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: #7C3AED;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        /* Custom scrollbar for sidebar and chat */
        * {
          scrollbar-width: thin;
          scrollbar-color: ${isDarkMode ? '#475569 transparent' : '#D1D5DB transparent'};
        }
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? '#475569' : '#D1D5DB'};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? '#64748B' : '#9CA3AF'};
        }
      `}</style>
    </div>
  )
}

export default App