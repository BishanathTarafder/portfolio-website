# Chatbot UI/UX Refactoring Verification

This document outlines the changes made to the Chatbot UI/UX and provides instructions for verification.

## Changes Implemented

1.  **Markdown Rendering**:
    *   Replaced plain text rendering with `react-markdown`.
    *   Added support for **bold**, *italics*, lists, links, code blocks, and blockquotes.
    *   Styled markdown elements to match the chat theme (including Dark Mode support).
    *   Links now open in a new tab (`target="_blank"`).

2.  **Auto-Scrolling**:
    *   Improved the auto-scroll logic to trigger not just on message addition, but also during the typing animation and when the "thinking" indicator appears.
    *   Ensures the chat always stays at the bottom to show the latest content.

3.  **Interface Standardization**:
    *   Increased Chat Window dimensions:
        *   **Width**: `24rem` (was `20rem`) - ~384px
        *   **Height**: `34rem` (was `24rem`) - ~544px
        *   **Mobile**: Width `calc(100vw - 1.5rem)`, Height `70vh`.
    *   Allowed "Suggested Question" chips to wrap text if they exceed the container width, preventing cutoff.
    *   Updated CSS to support larger code blocks with horizontal scrolling.

## Verification Instructions

### Prerequisites
Ensure dependencies are installed:
```bash
npm install
```

### 1. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Verify Interface Sizing
*   Open the chatbot by clicking the toggle button.
*   **Check**: The window should look taller and slightly wider than before.
*   **Check**: The "Try asking" suggestion chips (e.g., "What's your educational background?") should be fully visible and not cut off.

### 3. Verify Auto-Scrolling
*   Send a message (e.g., "Hello").
*   **Check**: As the bot types the response, the chat window should stay scrolled to the bottom.
*   **Check**: When the "Thinking..." indicator appears, it should be visible without manual scrolling.

### 4. Verify Markdown Rendering
Ask the bot to generate various markdown elements. You can use the following prompts:

*   **Code Block**: "Write a Python function to calculate fibonacci."
    *   *Expectation*: You should see a gray/dark box with formatted code.
*   **List**: "List 3 benefits of Next.js."
    *   *Expectation*: You should see a bulleted list with proper indentation.
*   **Bold/Italic**: "Explain the difference between **bold** and *italic* text."
    *   *Expectation*: The text should be rendered with correct font weights/styles.
*   **Link**: "Give me a link to the official React documentation."
    *   *Expectation*: The link should be blue/underlined and open in a new tab when clicked.

### 5. Verify Mobile Responsiveness
*   Open Chrome DevTools (F12) and toggle Device Toolbar (Ctrl+Shift+M).
*   Select a mobile device (e.g., iPhone 12).
*   **Check**: The chat window should take up most of the screen height (`70vh`) and width, leaving a small gap at the bottom/sides.
*   **Check**: Text wrapping and scrolling should still work smoothly.
