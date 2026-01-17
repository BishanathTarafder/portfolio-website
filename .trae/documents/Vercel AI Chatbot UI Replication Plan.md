I will perform a strict, pixel-perfect refactor of the Chatbot UI to match the Vercel AI Chatbot design, addressing the specific visual discrepancies identified in my analysis (specifically the User Bubble color and Empty State layout).

### **Plan of Action**

1.  **Refine Visual Style (Pixel-Perfecting)**:
    *   **User Bubbles**: Switch from "Blue" to the signature **Monochrome (Zinc-950/Black)** style used by Vercel.
    *   **Empty State**: Replace the current list of suggestions with a **Centered Grid Layout** for "Starter Prompts," mimicking the Vercel template's empty screen.
    *   **Typography & Spacing**: Tighten the spacing and ensure font weights match the Vercel aesthetic (Inter/Sans).

2.  **Component Updates**:
    *   **`ChatBubble.tsx`**: Update color classes to `bg-zinc-950 text-white` (Light Mode) and `bg-white text-black` (Dark Mode).
    *   **`Chat.tsx`**: 
        *   Implement a dedicated "Empty State" view centered in the container.
        *   Style the `PREDEFINED_QUESTIONS` as a responsive grid cards.
    *   **`ChatInput.tsx`**: Ensure the input field has the correct `shadow-sm`, border radius, and internal button positioning.

3.  **Clean & Verify**:
    *   Ensure `ChatWidget.module.css` remains unused.
    *   Verify auto-scroll, markdown rendering, and animations behave exactly as the reference.

**Note**: I will keep the backend and API integration 100% untouched.
