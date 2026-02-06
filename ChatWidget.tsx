import { useEffect, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\$(\d{1,3}(,\d{3})+)/g, (match, p1) => {
      return '$' + p1.replace(/,/g, '.');
    })
    .replace(/\n/g, '<br/>');
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user'|'agent', text: string}>>([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('chatSessionId');
      if (!id) {
        id = `session-${Date.now()}`;
        localStorage.setItem('chatSessionId', id);
      }
      return id;
    }
    return `session-${Date.now()}`;
  });
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHAU2jdXvzn0vBSh+zPDajzsKElyx6OyrWBUIQ5zd8sFuJAUuhM/z24k2CBhku+zooVARC0yl4fG5ZRwFNo3V7859LwUofsz');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chatMessages');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (!isOpen) {
        setMessages([{
          role: 'agent',
          text: '¡Hola! 👋 Soy Sofía, asesora inmobiliaria de Angel & Völkers.'
        }]);
        setUnreadCount(1);
        playNotificationSound();
      }
    }, 5000);

    const timer2 = setTimeout(() => {
      if (!isOpen) {
        setMessages(prev => [...prev, {
          role: 'agent',
          text: '¿Te puedo ayudar a encontrar tu propiedad ideal?'
        }]);
        setUnreadCount(2);
        playNotificationSound();
      }
    }, 15000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    try {
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
      }, 2000);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId })
      });
      const data = await res.json();
      
      clearTimeout(typingTimer);
      setIsTyping(false);
      
      if (data.response) {
        setMessages(prev => [...prev, { role: 'agent', text: data.response }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
      {!isOpen && (
        <button 
          onClick={() => { setIsOpen(true); setUnreadCount(0); }} 
          style={{
            position:'fixed',
            bottom:'24px',
            right:'24px',
            width:'64px',
            height:'64px',
            background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius:'50%',
            boxShadow:'0 8px 24px rgba(102, 126, 234, 0.4)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:50,
            border:'none',
            cursor:'pointer',
            transition:'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={28} color="white" />
          {unreadCount > 0 && (
            <span style={{
              position:'absolute',
              top:'-4px',
              right:'-4px',
              background:'#ef4444',
              color:'white',
              borderRadius:'50%',
              width:'24px',
              height:'24px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              fontSize:'12px',
              fontWeight:'bold',
              border:'2px solid white'
            }}>
              {unreadCount}
            </span>
          )}
        </button>
      )}
      {isOpen && (
        <div style={{
          position:'fixed',
          bottom:'24px',
          right:'24px',
          width:'400px',
          height:'650px',
          background:'white',
          borderRadius:'16px',
          boxShadow:'0 20px 60px rgba(0,0,0,0.15)',
          display:'flex',
          flexDirection:'column',
          zIndex:50,
          overflow:'hidden'
        }}>
          <div style={{
            background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color:'white',
            padding:'20px',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <img 
                src="https://laruta11-images.s3.amazonaws.com/menu/agente.png" 
                alt="Sofía" 
                style={{
                  width:'48px',
                  height:'48px',
                  borderRadius:'50%',
                  objectFit:'cover',
                  border:'2px solid rgba(255,255,255,0.3)'
                }}
              />
              <div>
                <div style={{fontWeight:600,fontSize:'16px'}}>Sofía</div>
                <div style={{fontSize:'13px',opacity:0.9,display:'flex',alignItems:'center',gap:'6px'}}>
                  <span style={{width:'8px',height:'8px',backgroundColor:'#10b981',borderRadius:'50%',display:'inline-block'}}></span>
                  Asesora Inmobiliaria • En línea
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{
                color:'white',
                background:'rgba(255,255,255,0.2)',
                border:'none',
                cursor:'pointer',
                width:'36px',
                height:'36px',
                borderRadius:'8px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                transition:'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{
            flex:1,
            overflowY:'auto',
            padding:'20px',
            background:'#f8f9fa',
            display:'flex',
            flexDirection:'column',
            gap:'12px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{display:'flex',justifyContent:msg.role==='user'?'flex-end':'flex-start'}}>
                <div style={{
                  maxWidth:'85%',
                  padding:'12px 16px',
                  borderRadius:'16px',
                  backgroundColor:msg.role==='user'?'#667eea':'white',
                  color:msg.role==='user'?'white':'#2d3748',
                  boxShadow:msg.role==='user'?'0 4px 12px rgba(102,126,234,0.3)':'0 2px 8px rgba(0,0,0,0.08)',
                  fontSize:'14px',
                  lineHeight:'1.5'
                }} dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.text) }}>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{display:'flex',justifyContent:'flex-start'}}>
                <div style={{
                  maxWidth:'85%',
                  padding:'12px 16px',
                  borderRadius:'16px',
                  backgroundColor:'white',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
                  display:'flex',
                  gap:'4px',
                  alignItems:'center'
                }}>
                  <span style={{width:'8px',height:'8px',backgroundColor:'#667eea',borderRadius:'50%',animation:'bounce 1.4s infinite ease-in-out both',animationDelay:'-0.32s'}}></span>
                  <span style={{width:'8px',height:'8px',backgroundColor:'#667eea',borderRadius:'50%',animation:'bounce 1.4s infinite ease-in-out both',animationDelay:'-0.16s'}}></span>
                  <span style={{width:'8px',height:'8px',backgroundColor:'#667eea',borderRadius:'50%',animation:'bounce 1.4s infinite ease-in-out both'}}></span>
                </div>
              </div>
            )}
          </div>
          <div style={{
            padding:'20px',
            borderTop:'1px solid #e2e8f0',
            background:'white'
          }}>
            <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
                placeholder="Escribe tu mensaje..." 
                style={{
                  flex:1,
                  padding:'12px 16px',
                  border:'2px solid #e2e8f0',
                  borderRadius:'12px',
                  outline:'none',
                  fontSize:'14px',
                  transition:'border 0.2s'
                }} 
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
              <button 
                onClick={sendMessage} 
                style={{
                  padding:'12px',
                  background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color:'white',
                  borderRadius:'12px',
                  border:'none',
                  cursor:'pointer',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  minWidth:'48px',
                  transition:'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Send size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
