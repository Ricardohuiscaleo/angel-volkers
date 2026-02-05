import { useEffect, useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user'|'agent', text: string}>>([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `session-${Date.now()}`);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setMessages([{
          role: 'agent',
          text: '¡Hola! 👋 Soy Sofía, asesora inmobiliaria de Angel & Völkers. ¿Te puedo ayudar a encontrar tu propiedad ideal?'
        }]);
        setIsOpen(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId })
      });
      const data = await res.json();
      if (data.response) {
        setMessages(prev => [...prev, { role: 'agent', text: data.response }]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center z-50">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold">S</div>
              <div>
                <div className="font-semibold">Sofía - Asesora Inmobiliaria</div>
                <div className="text-xs opacity-90">En línea</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Escribe tu mensaje..." className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Enviar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
