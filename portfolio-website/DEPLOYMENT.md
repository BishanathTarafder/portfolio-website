# Portfolio Website Deployment Guide

## Project Overview

This portfolio website consists of two main components:

1. **Frontend**: A Next.js application with React components
2. **Backend**: A FastAPI Python application that powers the chatbot functionality

## Deployment Architecture

### Frontend Deployment (Vercel)

The frontend Next.js application is configured for deployment on Vercel, a platform optimized for Next.js applications.

#### Key Configuration Files

- `next.config.js`: Contains Next.js configuration including image optimization settings
- `package.json`: Defines build scripts and dependencies
- `chatbot/frontend/vercel.json`: Contains Vercel-specific configuration for the chatbot widget

#### Build and Deployment Process

1. **Build Command**: `npm run build`
2. **Output Directory**: `.next`
3. **Environment Variables**: 
   - `NEXT_PUBLIC_API_URL`: URL of the deployed backend API

### Backend Deployment

The backend FastAPI application can be deployed to any platform that supports Python applications.

#### Key Configuration Files

- `chatbot/backend/requirements.txt`: Lists all Python dependencies
- `chatbot/backend/Procfile`: Defines the command to start the server
- `chatbot/backend/.env.example`: Template for required environment variables

#### Environment Variables

```
# API Configuration
PORT=8000
HOST=0.0.0.0
DEBUG=False  # Set to False in production

# CORS Settings
ALLOWED_ORIGINS="https://your-frontend-domain.com"  # Update with your frontend URL

# LLM API Keys
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Alternative LLM Providers
# GROQ_API_KEY=your_groq_api_key_here
# MISTRAL_API_KEY=your_mistral_api_key_here
# ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Security
SECRET_KEY=your_secret_key_here  # Generate with: openssl rand -hex 32
```

#### Deployment Options

1. **Heroku**
   - Already configured with Procfile
   - Set environment variables in Heroku dashboard
   - Deploy with Git or Heroku CLI

2. **Railway**
   - Import from GitHub repository
   - Set environment variables in Railway dashboard
   - Automatic deployment from main branch

3. **Render**
   - Create a new Web Service
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Set environment variables in Render dashboard

## Deployment Steps

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure the project:
   - Root Directory: `/`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: URL of your deployed backend API
4. Deploy

### Backend (Example: Render)

1. Create a new Web Service in Render dashboard
2. Connect your GitHub repository
3. Configure the service:
   - Root Directory: `chatbot/backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables from the `.env.example` file
5. Deploy

## Post-Deployment Verification

1. Verify the frontend is accessible and loads correctly
2. Test the chatbot functionality by sending a message
3. Check the backend logs for any errors
4. Verify CORS is configured correctly by checking network requests

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure `ALLOWED_ORIGINS` in backend environment variables includes your frontend domain
   - Check for any proxy or CDN that might be modifying request headers

2. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` is set correctly in frontend environment variables
   - Check if the backend is running and accessible

3. **LLM API Errors**
   - Verify API keys are set correctly in backend environment variables
   - Check backend logs for specific error messages

## Maintenance

### Frontend Updates

1. Make changes to the codebase
2. Push to the connected repository
3. Vercel will automatically rebuild and deploy

### Backend Updates

1. Make changes to the codebase
2. Push to the connected repository
3. Depending on the platform, it may automatically rebuild and deploy

## Security Considerations

1. Ensure `DEBUG` is set to `False` in production
2. Generate a strong `SECRET_KEY` for production
3. Restrict `ALLOWED_ORIGINS` to only necessary domains
4. Keep API keys secure and rotate them regularly
5. Consider using environment-specific configuration files