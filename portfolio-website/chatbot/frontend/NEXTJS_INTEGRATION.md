# Next.js Integration Guide for Portfolio Chatbot Widget

This guide provides step-by-step instructions for integrating the portfolio chatbot widget into your Next.js application.

## Prerequisites

- A working Next.js application
- The chatbot frontend code (available in this repository)
- The chatbot backend running (see backend README.md for setup)

## Installation Steps

### 1. Copy the Chatbot Files

Copy the following files and directories from the `chatbot/frontend` directory to your Next.js project:

```
├── ChatWidget.module.css
├── ChatbotWidget.jsx
├── components/
│   ├── Chat.jsx
│   ├── ChatBubble.jsx
│   ├── ChatInput.jsx
│   ├── ChatToggle.jsx
│   └── TypingIndicator.jsx
├── fallback-responses.js
├── hooks/
│   └── useChatbot.js
└── utils/
    └── api.js
```

Place these files in a directory within your Next.js project, such as `components/chatbot/`.

### 2. Update API Configuration

Edit the `utils/api.js` file to point to your backend API URL:

```javascript
// Update this to match your backend API URL
export const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000';
```

Add the environment variable to your `.env.local` file:

```
NEXT_PUBLIC_CHATBOT_API_URL=http://your-backend-url:8000
```

### 3. Integration Options

#### Option A: Global Integration (in _app.js)

To include the chatbot on all pages of your application, add it to your `_app.js` file:

```jsx
// pages/_app.js
import '../styles/globals.css';
import ChatbotWidget from '../components/chatbot/ChatbotWidget';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ChatbotWidget initialMessage="Welcome to my portfolio! How can I help you today?" />
    </>
  );
}

export default MyApp;
```

#### Option B: Page-Specific Integration with Dynamic Import

To avoid hydration issues, use dynamic import with SSR disabled:

```jsx
// pages/index.js
import dynamic from 'next/dynamic';

// Import the ChatbotWidget with no SSR
const ChatbotWidget = dynamic(
  () => import('../components/chatbot/ChatbotWidget'),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      {/* Your page content */}
      <ChatbotWidget />
    </div>
  );
}
```

### 4. Configure CORS on Backend

Ensure your backend has CORS configured to allow requests from your Next.js application's domain:

```python
# In your FastAPI backend
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-nextjs-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 5. Customization Options

The ChatbotWidget component accepts the following props:

- `initialMessage` (string): The first message shown when the chat is opened

You can customize the appearance by modifying the `ChatWidget.module.css` file.

### 6. Testing the Integration

1. Start your Next.js development server:
   ```
   npm run dev
   ```

2. Ensure your chatbot backend is running.

3. Visit your Next.js application and test the chatbot functionality.

4. Test the fallback mode by stopping your backend server - the chatbot should still work with predefined responses.

## Troubleshooting

### Hydration Errors

If you encounter hydration errors, ensure you're using the dynamic import method with `ssr: false` as shown in Option B above.

### CORS Issues

If you see CORS errors in the console, verify that your backend CORS configuration includes your Next.js application's domain.

### API Connection Issues

If the chatbot cannot connect to the API:
1. Check that the backend server is running
2. Verify the API_URL in `utils/api.js` is correct
3. Ensure network connectivity between frontend and backend

## Advanced Configuration

### Custom Styling

To match your portfolio's theme, modify the CSS variables in `ChatWidget.module.css`.

### Environment-Based Configuration

Use Next.js environment variables to configure different backend URLs for development and production:

```
# .env.development
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000

# .env.production
NEXT_PUBLIC_CHATBOT_API_URL=https://api.your-domain.com
```

### Adding Analytics

You can extend the `sendMessage` function in `useChatbot.js` to include analytics tracking for chat interactions.