// Test script for verifying the chatbot integration in Next.js

/**
 * This script helps test the chatbot widget integration in a Next.js application.
 * Run this in your browser console after loading your Next.js page with the chatbot.
 */

(function() {
  console.log('Starting chatbot integration test...');
  
  // Test 1: Check if the chatbot widget is present in the DOM
  function testWidgetPresence() {
    const chatContainer = document.querySelector('[class*="container"]');
    if (!chatContainer) {
      console.error('❌ Test failed: Chatbot container not found in the DOM');
      return false;
    }
    console.log('✅ Test passed: Chatbot container found in the DOM');
    return true;
  }
  
  // Test 2: Test toggle button functionality
  function testToggleButton() {
    const toggleButton = document.querySelector('button[aria-label="Open chat"]');
    if (!toggleButton) {
      console.error('❌ Test failed: Chat toggle button not found');
      return false;
    }
    
    console.log('Clicking chat toggle button...');
    toggleButton.click();
    
    // Check if chat window opens
    setTimeout(() => {
      const chatWindow = document.querySelector('[class*="chatWindow"]');
      if (!chatWindow) {
        console.error('❌ Test failed: Chat window did not open after clicking toggle');
        return false;
      }
      console.log('✅ Test passed: Chat window opened successfully');
      
      // Test closing the chat
      const closeButton = document.querySelector('[class*="chatHeader"] button');
      if (closeButton) {
        console.log('Clicking close button...');
        closeButton.click();
        
        setTimeout(() => {
          const chatWindowAfterClose = document.querySelector('[class*="chatWindow"]');
          if (chatWindowAfterClose) {
            console.error('❌ Test failed: Chat window did not close');
          } else {
            console.log('✅ Test passed: Chat window closed successfully');
          }
        }, 500);
      }
      
      return true;
    }, 500);
  }
  
  // Test 3: Test sending a message
  function testSendMessage() {
    const toggleButton = document.querySelector('button[aria-label="Open chat"]');
    if (toggleButton) {
      toggleButton.click();
      
      setTimeout(() => {
        const inputField = document.querySelector('input[type="text"]');
        const sendButton = document.querySelector('button[type="submit"]');
        
        if (!inputField || !sendButton) {
          console.error('❌ Test failed: Chat input or send button not found');
          return false;
        }
        
        // Type a test message
        inputField.value = 'Hello, this is a test message';
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        
        console.log('Sending test message...');
        sendButton.click();
        
        // Check if message appears in chat
        setTimeout(() => {
          const messages = document.querySelectorAll('[class*="messagesContainer"] > div');
          const lastMessage = messages[messages.length - 1];
          
          if (!lastMessage || !lastMessage.textContent.includes('Hello, this is a test message')) {
            console.error('❌ Test failed: Test message was not displayed in chat');
          } else {
            console.log('✅ Test passed: Test message was sent and displayed');
            
            // Wait for response
            console.log('Waiting for chatbot response...');
          }
        }, 500);
      }, 500);
    }
  }
  
  // Test 4: Check API connection status
  function testApiConnection() {
    // Look for fallback badge
    setTimeout(() => {
      const fallbackBadge = document.querySelector('[class*="fallbackBadge"]');
      if (fallbackBadge) {
        console.warn('⚠️ Note: Chatbot is running in offline/fallback mode');
      } else {
        console.log('✅ Chatbot is connected to the backend API');
      }
      
      console.log('Chatbot integration tests completed!');
    }, 2000);
  }
  
  // Run tests in sequence
  if (testWidgetPresence()) {
    testToggleButton();
    setTimeout(() => {
      testSendMessage();
      setTimeout(testApiConnection, 2000);
    }, 1500);
  }
})();