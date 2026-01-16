import requests
import json
import uuid
import time

# Configuration
BASE_URL = "http://localhost:8000"
SESSION_ID = str(uuid.uuid4())

def test_health_check():
    """Test the health check endpoint"""
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    print("✅ Health check passed")

def test_chat_endpoint():
    """Test the chat endpoint with different message types"""
    # Test greeting
    greeting_response = send_message("Hello there!")
    assert greeting_response.status_code == 200
    greeting_data = greeting_response.json()
    assert "response" in greeting_data
    print(f"✅ Greeting test passed: {greeting_data['response'][:50]}...")
    
    # Small delay between requests
    time.sleep(1)
    
    # Test about me question
    about_response = send_message("Tell me about yourself")
    assert about_response.status_code == 200
    about_data = about_response.json()
    assert "response" in about_data
    print(f"✅ About me test passed: {about_data['response'][:50]}...")
    
    time.sleep(1)
    
    # Test projects question
    projects_response = send_message("What projects have you worked on?")
    assert projects_response.status_code == 200
    projects_data = projects_response.json()
    assert "response" in projects_data
    print(f"✅ Projects test passed: {projects_data['response'][:50]}...")
    
    time.sleep(1)
    
    # Test contact question
    contact_response = send_message("How can I contact you?")
    assert contact_response.status_code == 200
    contact_data = contact_response.json()
    assert "response" in contact_data
    print(f"✅ Contact test passed: {contact_data['response'][:50]}...")
    
    time.sleep(1)
    
    # Test fallback for unknown query
    fallback_response = send_message("What's the weather like on Mars?")
    assert fallback_response.status_code == 200
    fallback_data = fallback_response.json()
    assert "response" in fallback_data
    print(f"✅ Fallback test passed: {fallback_data['response'][:50]}...")

def send_message(message):
    """Send a message to the chat endpoint"""
    payload = {
        "message": message,
        "session_id": SESSION_ID
    }
    headers = {"Content-Type": "application/json"}
    return requests.post(f"{BASE_URL}/chat", data=json.dumps(payload), headers=headers)

def run_all_tests():
    """Run all tests"""
    print("🔍 Starting API tests...")
    try:
        test_health_check()
        test_chat_endpoint()
        print("\n✨ All tests passed successfully!")
    except Exception as e:
        print(f"\n❌ Test failed: {str(e)}")

if __name__ == "__main__":
    run_all_tests()