# Chatbot Fallback Mode

## Overview

The portfolio chatbot has been enhanced with a fallback mode that allows it to function even when the backend API is unavailable. This ensures that visitors to your portfolio website can still interact with the chatbot and receive helpful responses about your skills, projects, and experience.

## How Fallback Mode Works

When a user sends a message to the chatbot, the system first attempts to connect to the backend API. If the connection fails or the API is unavailable, the chatbot automatically switches to fallback mode, which uses pre-defined responses based on the content of the user's message.

### Key Components

1. **fallback-responses.js**: Contains categorized responses for different types of user queries:
   - Greetings ("Hello", "Hi")
   - About information ("Tell me about yourself")
   - Projects ("What projects have you worked on?")
   - Skills ("What are your technical skills?")
   - Contact information ("How can I contact you?")
   - Default fallback responses for other queries

2. **chatbot-vanilla.js**: The main chatbot widget implementation that includes:
   - Automatic detection of API availability
   - Seamless switching to fallback mode when needed
   - Message history persistence using localStorage
   - Responsive design for all device sizes

3. **chatbot-mobile-fix.css**: Additional styles to ensure the chatbot is always visible and properly positioned on all devices, including mobile.

## Integration

The chatbot has been integrated into the main portfolio website through the following files:

- **index.html**: The main portfolio page now includes the chatbot widget
- **test-integration.html**: A standalone test page for verifying chatbot functionality

## Customizing Fallback Responses

To customize the fallback responses to better match your personal information:

1. Open `chatbot/frontend/fallback-responses.js`
2. Edit the response arrays for each category (greeting, about, projects, skills, contact)
3. Add or modify the keywords in the `categorizeInput` function to better match specific terms relevant to your portfolio

Example:

```javascript
// Customize the about responses
about: [
  "I'm a full-stack developer specializing in React and Node.js with 5 years of experience in web development.",
  "I have a background in computer science with expertise in building responsive web applications and RESTful APIs.",
  "My professional journey includes working at tech startups and enterprise companies, focusing on creating scalable web solutions."
],
```

## Troubleshooting

If the chatbot button is not visible or the chat window doesn't open properly:

1. Check that all required files are properly linked in the HTML:
   - chatbot.css
   - chatbot-mobile-fix.css
   - fallback-responses.js
   - chatbot-vanilla.js

2. Verify that the chatbot initialization code is present and correctly configured:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const chatbot = new ChatbotWidget({
    apiUrl: 'http://localhost:8000',  // Change this to your actual API URL when deployed
    position: 'bottom-right',
    title: 'Portfolio Assistant',
    placeholder: 'Ask me anything about this portfolio...',
    initialMessage: 'Hi! I can help you learn more about this portfolio.'
  });
  
  chatbot.init();
});
```

3. If the button is still not visible, check for CSS conflicts by inspecting the `.chat-toggle-button` element in your browser's developer tools.

## Future Enhancements

- Expand the fallback responses to cover more specific questions about your projects
- Add support for displaying images or links in the chatbot responses
- Implement a hybrid mode that uses both API and fallback responses for better coverage