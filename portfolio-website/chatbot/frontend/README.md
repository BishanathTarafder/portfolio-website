# Portfolio Website Chatbot - Frontend

This directory contains the frontend components for the portfolio website chatbot. The chatbot is designed to be easily integrated into any website, with special support for Next.js applications.

## Features

- Modern, responsive chat interface
- Fallback mode for offline operation
- Smooth animations and transitions
- Markdown support in messages
- Easy integration with Next.js
- Customizable styling

## Directory Structure

```
├── ChatWidget.module.css       # CSS module for styling
├── ChatbotWidget.jsx           # Main widget component
├── components/                 # UI components
│   ├── Chat.jsx               # Main chat component
│   ├── ChatBubble.jsx         # Message bubble component
│   ├── ChatInput.jsx          # Message input component
│   ├── ChatToggle.jsx         # Chat open/close button
│   └── TypingIndicator.jsx    # Typing animation
├── examples/                   # Integration examples
│   ├── NextJsIntegration.jsx  # Next.js integration example
│   └── test_nextjs_integration.js # Test script
├── fallback-responses.js       # Offline mode responses
├── hooks/                      # React hooks
│   └── useChatbot.js          # Chat state management
├── utils/                      # Utility functions
│   └── api.js                 # API communication
├── NEXTJS_INTEGRATION.md       # Next.js integration guide
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- A React-based project (React 16.8+ for hooks support)
- For Next.js integration: Next.js 10+
- Backend API running (see `../backend/README.md`)

### Basic Integration

1. Copy the frontend directory to your project
2. Update the API URL in `utils/api.js`
3. Import and use the `ChatbotWidget` component in your application

```jsx
import ChatbotWidget from './path/to/ChatbotWidget';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ChatbotWidget />
    </div>
  );
}
```

### Next.js Integration

For detailed Next.js integration instructions, see [NEXTJS_INTEGRATION.md](./NEXTJS_INTEGRATION.md).

## Customization

### Styling

The chatbot uses CSS modules for styling. You can customize the appearance by modifying `ChatWidget.module.css`.

### Fallback Responses

You can customize the offline mode responses by editing the categories and messages in `fallback-responses.js`.

## Testing

Use the test script in `examples/test_nextjs_integration.js` to verify your integration. Run it in your browser's console after loading your page with the chatbot.

## Features

### Fallback Mode

The chatbot automatically detects when the backend API is unavailable and switches to fallback mode, providing predefined responses based on message content.

### Animations

The chatbot includes smooth animations for:
- Opening/closing the chat window
- Message appearance
- Typing indicator
- Toggle button pulse effect

### Responsive Design

The chat widget is fully responsive and works well on mobile devices.

## License

This project is licensed under the MIT License - see the LICENSE file for details.