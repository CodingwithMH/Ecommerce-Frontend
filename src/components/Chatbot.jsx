import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋 Welcome to our store. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { id: Date.now(), text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: data.answer || "Something went wrong.", isBot: true }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "Failed to connect to assistant.", isBot: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fixed container anchoring everything to the bottom right of the screen
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      
      {/* Chat Window (Conditional Rendering based on isOpen) */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-100 mb-4 animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#ebeb56] px-5 py-4 flex justify-between items-center border-b border-[#d4d44b]">
            <div>
              <h2 className="m-0 text-sm font-bold text-zinc-900">Store Assistant</h2>
              <p className="text-[11px] text-zinc-700 m-0">Typically replies instantly</p>
            </div>
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-800 hover:bg-[#dede4e] p-1.5 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Main Box */}
          <div className="flex-1 p-4 overflow-y-auto bg-zinc-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.isBot ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] px-4 py-2 text-[0.9rem] leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? "bg-white text-zinc-800 rounded-2xl rounded-bl-sm border border-zinc-100" 
                    : "bg-[#ebeb56] text-zinc-900 rounded-2xl rounded-br-sm font-medium"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex w-full justify-start">
                <div className="px-4 py-2 bg-white rounded-2xl rounded-bl-sm border border-zinc-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Interface */}
          <form onSubmit={handleSendMessage} className="flex p-3 bg-white border-t border-zinc-100 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about orders, shipping, items..."
              className="flex-1 px-3 py-2 text-sm rounded-xl border border-zinc-200 outline-none focus:border-[#d4d44b] focus:ring-2 focus:ring-[#ebeb56]/30 transition-all"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-[#ebeb56] text-zinc-800 p-2 rounded-xl hover:bg-[#dede4e] active:scale-95 transition-all disabled:opacity-40"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#ebeb56] hover:bg-[#dede4e] text-zinc-900 rounded-full flex items-center justify-center shadow-xl transform active:scale-90 hover:scale-105 transition-all duration-200 border border-[#d4d44b]"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          /* Minimize Icon */
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          /* Chat Bubble Icon */
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379a11.648 11.648 0 0 0 4.283-.569l4.757 1.25a.75.75 0 0 0 .952-.952l-1.25-4.757a11.257 11.257 0 0 0 .473-4.283c-.043-1.15-.17-2.291-.336-3.423a3.229 3.229 0 0 0-3.227-2.71-33.84 33.84 0 0 0-11.444 0 3.229 3.229 0 0 0-3.227 2.71c-.135 1.13-.239 2.276-.29 3.423Z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;