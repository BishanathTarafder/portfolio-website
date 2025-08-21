// Simple test script for the chatbot widget
// Run this in the browser console after loading the page with the chatbot widget

function testChatbotWidget() {
  console.log('🔍 Starting chatbot widget tests...');
  
  // Test 1: Check if the chatbot toggle button exists
  const toggleButton = document.querySelector('.chat-toggle-button');
  if (!toggleButton) {
    console.error('❌ Test failed: Chat toggle button not found');
    return;
  }
  console.log('✅ Chat toggle button found');
  
  // Test 2: Open the chat window
  toggleButton.click();
  setTimeout(() => {
    const chatWindow = document.querySelector('.chat-window');
    if (!chatWindow || !chatWindow.classList.contains('open')) {
      console.error('❌ Test failed: Chat window did not open');
      return;
    }
    console.log('✅ Chat window opens correctly');
    
    // Test 3: Check if chat input exists
    const chatInput = document.querySelector('.chat-input');
    if (!chatInput) {
      console.error('❌ Test failed: Chat input not found');
      return;
    }
    console.log('✅ Chat input found');
    
    // Test 4: Send a test message
    chatInput.value = 'Hello';
    const chatForm = document.querySelector('.chat-input-form');
    if (!chatForm) {
      console.error('❌ Test failed: Chat form not found');
      return;
    }
    
    // Submit the form
    const submitEvent = new Event('submit');
    chatForm.dispatchEvent(submitEvent);
    
    // Check if the message appears in the chat
    setTimeout(() => {
      const userMessages = document.querySelectorAll('.chat-bubble.user');
      if (userMessages.length === 0) {
        console.error('❌ Test failed: User message not displayed');
        return;
      }
      console.log('✅ User message displayed correctly');
      
      // Test 5: Check for typing indicator or response
      setTimeout(() => {
        const typingIndicator = document.querySelector('.typing-indicator');
        const assistantMessages = document.querySelectorAll('.chat-bubble.assistant');
        
        if (!typingIndicator && assistantMessages.length === 0) {
          console.error('❌ Test failed: No typing indicator or assistant response');
          return;
        }
        
        if (typingIndicator) {
          console.log('✅ Typing indicator displayed correctly');
        }
        
        if (assistantMessages.length > 0) {
          console.log('✅ Assistant response received');
        }
        
        // Test 6: Close the chat window
        const closeButton = document.querySelector('.chat-close-button');
        if (!closeButton) {
          console.error('❌ Test failed: Close button not found');
          return;
        }
        
        closeButton.click();
        setTimeout(() => {
          const chatWindowAfterClose = document.querySelector('.chat-window.open');
          if (chatWindowAfterClose) {
            console.error('❌ Test failed: Chat window did not close');
            return;
          }
          console.log('✅ Chat window closes correctly');
          console.log('\n✨ All widget tests completed!');
        }, 500);
      }, 2000); // Wait for typing indicator or response
    }, 500); // Wait for user message to appear
  }, 500); // Wait for chat window to open
}

// Instructions for manual testing
console.log('To run the chatbot widget tests, call testChatbotWidget() in the console');

// Automated test scenarios
const testScenarios = [
  {
    name: 'Greeting',
    message: 'Hello there!',
    expectedResponseContains: ['hi', 'hello', 'welcome', 'greetings']
  },
  {
    name: 'About Me',
    message: 'Tell me about yourself',
    expectedResponseContains: ['background', 'skills', 'experience', 'engineer']
  },
  {
    name: 'Projects',
    message: 'What projects have you worked on?',
    expectedResponseContains: ['project', 'developed', 'built', 'created']
  },
  {
    name: 'Contact',
    message: 'How can I contact you?',
    expectedResponseContains: ['email', 'contact', 'reach', 'linkedin']
  },
  {
    name: 'Unknown Query',
    message: "What's the weather like on Mars?",
    expectedResponseContains: ['portfolio', 'information', 'learning', 'check']
  }
];

console.log('Test scenarios available for manual verification:', testScenarios);