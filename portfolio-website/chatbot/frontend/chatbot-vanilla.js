// Vanilla JavaScript implementation of the chatbot widget

class ChatbotWidget {
  constructor(options = {}) {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.sessionId = this.getOrCreateSessionId();
    
    // Set options with defaults
    this.apiUrl = options.apiUrl || 'http://localhost:8000';
    this.position = options.position || 'bottom-right';
    this.title = options.title || 'Portfolio Assistant';
    this.placeholder = options.placeholder || 'Ask me anything...';
    this.initialMessage = options.initialMessage || 'Hi! How can I help you today?';
    
    this.initialized = false;
  }
  
  // Initialize the chatbot
  init() {
    if (this.initialized) return;
    
    // Create and inject the chatbot HTML
    this.createChatbotHTML();
    
    // Cache DOM elements
    this.chatWindow = document.querySelector('.chat-window');
    this.chatMessages = document.querySelector('.chat-messages');
    this.chatInput = document.querySelector('.chat-input');
    this.chatForm = document.querySelector('.chat-input-form');
    this.toggleButton = document.querySelector('.chat-toggle-button');
    this.closeButton = document.querySelector('.chat-close-button');
    
    // Add event listeners
    this.addEventListeners();
    
    // Load previous messages or add initial message
    if (!this.loadMessages() && this.initialMessage) {
      // Add initial message if no previous messages
      this.addMessage(this.initialMessage, 'assistant');
    }
    
    // Ensure the toggle button is always visible
    this.toggleButton.style.zIndex = '9999';
    
    // Apply position
    const container = document.querySelector('.chatbot-container');
    container.classList.add(this.position);
    
    this.initialized = true;
  }
  
  // Create a unique session ID or retrieve existing one
  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('chatbot_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('chatbot_session_id', sessionId);
    }
    return sessionId;
  }
  
  // Create the chatbot HTML structure
  createChatbotHTML() {
    const chatbotHTML = `
      <div class="chatbot-container">
        <div class="chat-window">
          <div class="chat-header">
            <div class="chat-header-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>${this.title}</span>
            </div>
            <button class="chat-close-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="chat-messages"></div>
          <div class="chat-input-container">
            <form class="chat-input-form">
              <input type="text" class="chat-input" placeholder="${this.placeholder}" />
              <button type="submit" class="chat-send-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <button class="chat-toggle-button" style="z-index: 9999;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 500 500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <!-- Robot Head -->
            <rect x="130" y="100" width="240" height="200" rx="30" fill="#1E3A5F" stroke="#2D3748" stroke-width="10" />
            
            <!-- Robot Face Screen -->
            <rect x="150" y="120" width="200" height="160" rx="15" fill="#0F172A" stroke="#2D3748" stroke-width="5" />
            
            <!-- Robot Eyes -->
            <circle cx="200" cy="170" r="25" fill="#4FD1C5" />
            <circle cx="300" cy="170" r="25" fill="#4FD1C5" />
            
            <!-- Robot Smile -->
            <path d="M220 220 Q250 240 280 220" stroke="#4FD1C5" stroke-width="10" stroke-linecap="round" />
            
            <!-- Robot Ears/Antenna -->
            <rect x="110" y="150" width="20" height="60" rx="5" fill="#CBD5E0" />
            <rect x="370" y="150" width="20" height="60" rx="5" fill="#CBD5E0" />
            
            <!-- Robot Head Top -->
            <path d="M130 100 Q250 70 370 100" fill="#CBD5E0" stroke="#2D3748" stroke-width="5" />
            
            <!-- Robot Body -->
            <path d="M180 300 L180 380 Q250 400 320 380 L320 300" fill="#CBD5E0" stroke="#2D3748" stroke-width="10" />
            
            <!-- Robot Arms -->
            <path d="M180 320 L120 380" stroke="#CBD5E0" stroke-width="20" stroke-linecap="round" />
            <path d="M320 320 L380 380" stroke="#CBD5E0" stroke-width="20" stroke-linecap="round" />
            
            <!-- Robot Body Line -->
            <path d="M200 350 L300 350" stroke="#4FD1C5" stroke-width="5" />
            
            <!-- Shadow -->
            <ellipse cx="250" cy="430" rx="70" ry="10" fill="#CBD5E0" opacity="0.3" />
          </svg>
        </button>
      </div>
    `;
    
    // Create a div to hold the chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatbotHTML;
    
    // Append to body
    document.body.appendChild(chatbotContainer.firstElementChild);
  }
  
  // Add event listeners to chatbot elements
  addEventListeners() {
    // Toggle chat window
    this.toggleButton.addEventListener('click', () => this.toggleChat());
    this.closeButton.addEventListener('click', () => this.toggleChat());
    
    // Send message on form submit
    this.chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = this.chatInput.value.trim();
      if (message) {
        this.sendMessage(message);
        this.chatInput.value = '';
      }
    });
  }
  
  // Toggle chat window visibility
  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatWindow.classList.add('open');
    } else {
      this.chatWindow.classList.remove('open');
    }
  }
  
  // Add a message to the chat
  addMessage(message, sender) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.classList.add('chat-bubble', sender);
    
    // Handle markdown-like formatting for assistant messages
    if (sender === 'assistant') {
      // Simple markdown parsing for code blocks
      let formattedMessage = message
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/\n/g, '<br>');
      
      messageEl.innerHTML = formattedMessage;
    } else {
      messageEl.textContent = message;
    }
    
    // Add to DOM
    this.chatMessages.appendChild(messageEl);
    
    // Scroll to bottom
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    
    // Save message to state and localStorage
    this.messages.push({ content: message, sender });
    this.saveMessages();
  }
  
  // Show typing indicator
  showTypingIndicator() {
    this.isTyping = true;
    const typingEl = document.createElement('div');
    typingEl.classList.add('typing-indicator');
    typingEl.innerHTML = '<span></span><span></span><span></span>';
    this.chatMessages.appendChild(typingEl);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
  
  // Hide typing indicator
  hideTypingIndicator() {
    this.isTyping = false;
    const typingEl = document.querySelector('.typing-indicator');
    if (typingEl) {
      typingEl.remove();
    }
  }
  
  // Send message to API
  async sendMessage(message) {
    // Add user message to chat
    this.addMessage(message, 'user');
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Check if fallback-responses.js is loaded
      const useFallback = typeof getFallbackResponse === 'function';
      
      // Try API first if not using fallback
      if (!useFallback) {
        // Send to API
        const response = await fetch(`${this.apiUrl}/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            session_id: this.sessionId,
          }),
        });
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Add assistant response
        this.addMessage(data.response, 'assistant');
        return;
      }
      
      // Use fallback if API is not available or fallback is forced
      throw new Error('Using fallback responses');
    } catch (error) {
      console.log('Using fallback response system:', error);
      
      // Add a small delay to simulate thinking
      setTimeout(() => {
        // Hide typing indicator
        this.hideTypingIndicator();
        
        // Use fallback response if available, otherwise use generic message
        if (typeof getFallbackResponse === 'function') {
          const fallbackResponse = getFallbackResponse(message);
          this.addMessage(fallbackResponse, 'assistant');
        } else {
          this.addMessage('I can help you learn more about this portfolio. Feel free to ask about projects, skills, or experience!', 'assistant');
        }
      }, 1000);
    }
  }
  
  // Save messages to localStorage
  saveMessages() {
    localStorage.setItem('chatbot_messages', JSON.stringify(this.messages));
  }
  
  // Load messages from localStorage
  loadMessages() {
    const savedMessages = localStorage.getItem('chatbot_messages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
      this.messages.forEach(msg => {
        this.addMessage(msg.content, msg.sender);
      });
    } else {
      // Add welcome message
      this.addMessage('Hi there! I\'m your portfolio assistant. How can I help you today?', 'assistant');
    }
  }
  
  // Clear chat history
  clearChat() {
    this.messages = [];
    localStorage.removeItem('chatbot_messages');
    this.chatMessages.innerHTML = '';
    this.addMessage('Hi there! I\'m your portfolio assistant. How can I help you today?', 'assistant');
  }
}

// Initialize the chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create the chatbot instance
  window.chatbot = new ChatbotWidget();
});