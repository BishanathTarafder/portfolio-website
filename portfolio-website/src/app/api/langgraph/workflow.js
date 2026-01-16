import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the provided API key
const createGeminiModel = (apiKey) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  return model;
};

// Create a simple LangGraph workflow
export const createLangGraphWorkflow = (apiKey = process.env.GOOGLE_API_KEY) => {
  // Create the model
  const geminiModel = createGeminiModel(apiKey);
  
  // Create a prompt template for the chatbot
  const promptTemplate = ChatPromptTemplate.fromTemplate(`
    You are an AI assistant for a portfolio website. You help visitors learn about the portfolio owner's skills, projects, and experience.
    
    Current conversation:
    {history}
    
    Human: {message}
    AI: 
  `);
  
  // Create a wrapper for the Gemini model to make it compatible with LangChain
  const geminiModelWrapper = async (input) => {
    try {
      const result = await geminiModel.generateContent(input.text);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error in Gemini model:', error);
      return 'I apologize, but I encountered an error processing your request. Please try again.';
    }
  };
  
  // Create the LangGraph workflow
  const workflow = RunnableSequence.from([
    {
      // Format the input for the prompt template
      formatInput: async ({ message, history = [] }) => {
        const formattedHistory = history.map(msg => 
          `${msg.role === 'user' ? 'Human' : 'AI'}: ${msg.content}`
        ).join('\n');
        
        return { message, history: formattedHistory };
      }
    },
    // Format the prompt with the input
    async (input) => {
      const formattedInput = await input.formatInput(input);
      const promptResult = await promptTemplate.format(formattedInput);
      return { text: promptResult };
    },
    // Call the Gemini model
    geminiModelWrapper,
    // Parse the output
    new StringOutputParser()
  ]);
  
  return workflow;
};

// Store workflow sessions
const workflowSessions = new Map();

// Get or create a workflow session
export const getOrCreateWorkflowSession = (sessionId, apiKey) => {
  if (sessionId && workflowSessions.has(sessionId)) {
    return {
      workflow: workflowSessions.get(sessionId).workflow,
      history: workflowSessions.get(sessionId).history,
      sessionId
    };
  }
  
  // Create a new workflow session
  const newSessionId = sessionId || Date.now().toString();
  const workflow = createLangGraphWorkflow(apiKey);
  const history = [
    { role: 'user', content: 'Hello, I\'m interested in learning more about your portfolio and skills.' },
    { role: 'assistant', content: 'Hello! I\'m an AI assistant for this portfolio website. I can tell you about the projects, skills, and experience showcased here. What specific information are you looking for?' }
  ];
  
  workflowSessions.set(newSessionId, { workflow, history });
  
  return { workflow, history, sessionId: newSessionId };
};

// Update a workflow session with a new message
export const updateWorkflowSession = (sessionId, message, response) => {
  if (sessionId && workflowSessions.has(sessionId)) {
    const session = workflowSessions.get(sessionId);
    session.history.push(
      { role: 'user', content: message },
      { role: 'assistant', content: response }
    );
    workflowSessions.set(sessionId, session);
  }
};