import uvicorn
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get configuration from environment variables
port = int(os.getenv("PORT", 8000))
host = os.getenv("HOST", "0.0.0.0")
debug = os.getenv("DEBUG", "True").lower() in ("true", "1", "t")

if __name__ == "__main__":
    print(f"Starting server on {host}:{port} (debug={debug})")
    uvicorn.run("app.main:app", host=host, port=port, reload=debug)