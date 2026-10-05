import { useState, useEffect, useRef } from 'react'
import { IconCupcake } from './Icons'

// ===== Chatbot Brain — Response Rules =====
const getBotResponse = (message) => {
  const msg = message.toLowerCase().trim()

  if (msg.match(/\b(hi|hello|hey|salam|assalam|hola)\b/)) {
    return "Hello! 👋 Welcome to Bakerz Bite. How can I help you today?\n\nYou can ask me about:\n• Products (cakes, pastries, cookies)\n• Prices\n• Store hours\n• Delivery\n• Offers"
  }

  if (msg.match(/\b(cake|cakes)\b/)) {
    return "🎂 We have amazing cakes:\n• Chocolate Truffle Cake — Rs 850\n• Red Velvet Cake — Rs 950\n• Vanilla Bean Cake — Rs 750\n• Cheesecake — Rs 1650\n\nCheck the Menu for all options!"
  }
  if (msg.match(/\b(pastr|eclair|croissant|danish)/)) {
    return "🥐 Our pastries are freshly baked daily:\n• Butter Croissant — Rs 120\n• Chocolate Éclair — Rs 150\n• Danish Pastry — Rs 180\n• Pain au Chocolat — Rs 160"
  }
  if (msg.match(/\b(cookie|cookies)\b/)) {
    return "🍪 Delicious cookies:\n• Choco Chip Cookie — Rs 80\n• Oatmeal Raisin Cookie — Rs 70\n• Macaron — Rs 90\n• Brownie — Rs 130"
  }
  if (msg.match(/\b(pie|pies|tart)\b/)) {
    return "🥧 Fresh pies:\n• Apple Pie — Rs 450\n• Lemon Meringue Pie — Rs 480\n• Fruit Tart — Rs 520\n• Apple Turnover — Rs 180"
  }
  if (msg.match(/\b(bread|bakery|baguette|bagel|muffin)\b/)) {
    return "🍞 Bakery items:\n• Fresh Bread Loaf — Rs 180\n• Baguette — Rs 150\n• Bagel — Rs 120\n• Blueberry Muffin — Rs 140"
  }
  if (msg.match(/\b(merch|mug|bag|tshirt|t-shirt|cap)\b/)) {
    return "🛍️ Bakerz Bite Merchandise:\n• T-Shirt — Rs 899\n• Apron — Rs 1199\n• Mug — Rs 499\n• Tote Bag — Rs 599\n\nVisit Merchandise page for more!"
  }

  if (msg.match(/\b(offer|discount|deal|sale|promo)s?\b/)) {
  return "🎉 Current offers:\n• Buy 1 Get 1 Free on Pastries (Code: PASTRY2X)\n• 20% Off on Cakes above Rs 1000 (Code: CAKE20)\n• Free Cookie with Coffee 4-6 PM (Code: COOKIEFREE)\n\nVisit the Offers page for more!"
}

  if (msg.match(/\b(offer|discount|deal|sale|promo)\b/)) {
    return "🎉 Current offers:\n• Buy 1 Get 1 Free on Pastries (Code: PASTRY2X)\n• 20% Off on Cakes above Rs 1000 (Code: CAKE20)\n• Free Cookie with Coffee 4-6 PM (Code: COOKIEFREE)\n\nVisit the Offers page for more!"
  }

  if (msg.match(/\b(hour|open|close|time|timing)/)) {
    return "🕒 We're open:\n• Monday - Sunday: 9:00 AM - 10:00 PM\n\nCome visit us anytime! 😊"
  }

  if (msg.match(/\b(location|address|where|map)\b/)) {
    return "📍 Our address:\n123 Bakery Lane, Mumbai, India\n\n📞 +91 98765 43210\n📧 hello@bakerzbite.com"
  }

  if (msg.match(/\b(deliver|delivery|shipping|ship)\b/)) {
    return "🚚 Yes, we offer home delivery!\n• Free delivery within 10 km\n• Delivery time: 45-60 minutes\n• Order via our website or call +91 98765 43210"
  }

  if (msg.match(/\b(contact|phone|call|email)\b/)) {
    return "📞 Contact us:\n• Phone: +91 98765 43210\n• Email: hello@bakerzbite.com\n• Address: 123 Bakery Lane, Mumbai\n\nVisit the Contact page for a form!"
  }

  if (msg.match(/\b(order|buy|purchase|cart)\b/)) {
    return "🛒 To place an order:\n1. Browse the Menu\n2. Click 'Add to Cart' on items\n3. Go to Cart & checkout\n\nNeed help? Call +91 98765 43210"
  }

  if (msg.match(/\b(feedback|review|rating|complain)\b/)) {
    return "💬 We'd love your feedback!\n\nVisit the Feedback page to share your experience and rate us. Your opinion matters! ⭐"
  }

  if (msg.match(/\b(custom|personaliz|personaliz)\b/)) {
    return "🎨 Yes! We make custom cakes for:\n• Birthdays 🎂\n• Weddings 💍\n• Anniversaries 💕\n• Corporate events 🏢\n\nCall us 24 hours in advance: +91 98765 43210"
  }

  if (msg.match(/\b(thanks|thank you|shukriya|dhanyavad)\b/)) {
    return "You're welcome! 😊 Happy to help. Have a sweet day! 🧁"
  }

  if (msg.match(/\b(bye|goodbye|khuda hafiz)\b/)) {
    return "Goodbye! 👋 Come back soon for more delicious treats! 🧁"
  }

  if (msg.match(/\b(about|who are you|who you)\b/)) {
    return "🧁 Bakerz Bite is a premium bakery & café!\n\n• 300+ baked goods\n• Real butter, cream & unbleached flour\n• Freshly baked daily\n\nMotto: \"Where smiles are served daily.\""
  }

  if (msg.match(/\b(help|what can you|options)\b/)) {
    return "I can help with:\n• 🎂 Products & prices\n• 🕒 Store hours\n• 📍 Location & contact\n• 🚚 Delivery info\n• 🎉 Offers & discounts\n• 🛒 Ordering help\n\nJust ask!"
  }

  return "🤔 Sorry, I didn't understand that.\n\nTry asking about:\n• \"Show me cakes\"\n• \"What are the prices?\"\n• \"Store hours\"\n• \"Delivery\"\n• \"Offers\"\n\nOr call us at +91 98765 43210"
}

// ===== Typing Indicator =====
const TypingIndicator = () => (
  <div className="chat-typing">
    <span></span>
    <span></span>
    <span></span>
  </div>
)

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi! 👋 Welcome to Bakerz Bite.\n\nHow can I help you today?",
      time: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unread, setUnread] = useState(0)

  const messagesEndRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnread((prev) => prev + 1)
    }
    if (isOpen) setUnread(0)
  }, [messages, isOpen])

  const handleSend = (e) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      time: new Date()
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    timeoutRef.current = setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: getBotResponse(trimmed),
        time: new Date()
      }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800)
  }

  const quickReplies = [
    'Show me cakes',
    'What are prices?',
    'Store hours',
    'Delivery info',
    'Offers'
  ]

  const handleQuickReply = (text) => {
    setInput(text)
    timeoutRef.current = setTimeout(() => {
      const userMsg = {
        id: Date.now(),
        sender: 'user',
        text,
        time: new Date()
      }
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)
      timeoutRef.current = setTimeout(() => {
        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          text: getBotResponse(text),
          time: new Date()
        }
        setMessages((prev) => [...prev, botMsg])
        setIsTyping(false)
      }, 800)
    }, 100)
  }

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })

  return (
    <>
      <button
        className={`chatbot-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
        {!isOpen && unread > 0 && (
          <span className="chatbot-badge">{unread}</span>
        )}
      </button>

      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar">
              <IconCupcake width={22} height={22} />
            </div>
            <div>
              <strong>Bakerz Bite</strong>
              <small>
                <span className="chatbot-online-dot"></span> Online
              </small>
            </div>
          </div>
          <button
            className="chatbot-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-msg ${msg.sender}`}>
              {msg.sender === 'bot' && (
                <div className="chat-avatar">
                  <IconCupcake width={14} height={14} />
                </div>
              )}
              <div className="chat-bubble-wrap">
                <div className="chat-bubble">
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <span className="chat-time">{formatTime(msg.time)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg bot">
              <div className="chat-avatar">
                <IconCupcake width={14} height={14} />
              </div>
              <div className="chat-bubble-wrap">
                <div className="chat-bubble typing">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && (
          <div className="chatbot-quick-replies">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(qr)}
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSend}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="chatbot-send-btn"
            aria-label="Send"
            disabled={!input.trim()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}