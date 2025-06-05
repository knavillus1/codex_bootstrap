#!/usr/bin/env python3
"""
Test script to verify file attachment functionality end-to-end.
"""

import requests
import json
import tempfile
import os

BASE_URL = "http://localhost:8000"

def test_file_attachment_workflow():
    """Test the complete file attachment workflow."""
    
    print("🧪 Testing File Attachment Workflow...")
    
    # Step 1: Create a test file
    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
        f.write("This is a test file for attachment verification.\nLine 2 of content.")
        test_file_path = f.name
    
    try:
        # Step 2: Upload the file
        print("📤 Uploading file...")
        with open(test_file_path, 'rb') as f:
            files = {'file': ('test_attachment.txt', f, 'text/plain')}
            upload_response = requests.post(f"{BASE_URL}/files/", files=files)
        
        if upload_response.status_code != 201:
            print(f"❌ File upload failed: {upload_response.status_code} - {upload_response.text}")
            return False
        
        upload_data = upload_response.json()
        filename = upload_data['filename']
        print(f"✅ File uploaded successfully: {filename}")
        
        # Step 3: Create a chat
        print("💬 Creating chat...")
        chat_data = {"title": "File Attachment Test Chat"}
        chat_response = requests.post(f"{BASE_URL}/chats/", json=chat_data)
        
        if chat_response.status_code != 201:
            print(f"❌ Chat creation failed: {chat_response.status_code} - {chat_response.text}")
            return False
        
        chat = chat_response.json()
        chat_id = chat['id']
        print(f"✅ Chat created: {chat_id}")
        
        # Step 4: Create a message with file attachment
        print("📝 Creating message with file attachment...")
        message_data = {
            "chat_id": chat_id,
            "role": "user",
            "content": "I'm attaching a test file to verify the file attachment functionality.",
            "file": {
                "filename": filename,
                "content_type": "text/plain",
                "url": f"/files/{filename}"
            }
        }
        
        message_response = requests.post(f"{BASE_URL}/messages/", json=message_data)
        
        if message_response.status_code != 201:
            print(f"❌ Message creation failed: {message_response.status_code} - {message_response.text}")
            return False
        
        message = message_response.json()
        print(f"✅ Message created with file attachment: {message['id']}")
        
        # Step 5: Verify file can be retrieved
        print("📥 Verifying file can be retrieved...")
        file_response = requests.get(f"{BASE_URL}/files/{filename}")
        
        if file_response.status_code != 200:
            print(f"❌ File retrieval failed: {file_response.status_code}")
            return False
        
        print(f"✅ File retrieved successfully. Content length: {len(file_response.text)}")
        
        # Step 6: Verify message can be retrieved with attachment
        print("📋 Verifying message retrieval...")
        messages_response = requests.get(f"{BASE_URL}/messages/{chat_id}")
        
        if messages_response.status_code != 200:
            print(f"❌ Message retrieval failed: {messages_response.status_code}")
            return False
        
        messages = messages_response.json()
        if not messages:
            print("❌ No messages found")
            return False
        
        message_with_file = messages[0]
        if not message_with_file.get('file'):
            print("❌ Message does not contain file attachment")
            return False
        
        file_attachment = message_with_file['file']
        expected_fields = ['filename', 'content_type', 'url']
        
        for field in expected_fields:
            if field not in file_attachment:
                print(f"❌ Missing field in file attachment: {field}")
                return False
        
        print("✅ Message retrieved with complete file attachment data")
        
        # Step 7: Display summary
        print("\n📊 Test Summary:")
        print(f"   Chat ID: {chat_id}")
        print(f"   Message ID: {message['id']}")
        print(f"   File Name: {file_attachment['filename']}")
        print(f"   Content Type: {file_attachment['content_type']}")
        print(f"   File URL: {file_attachment['url']}")
        print(f"   Message Content: {message_with_file['content']}")
        
        print("\n🎉 All tests passed! File attachment functionality is working correctly.")
        return True
        
    finally:
        # Cleanup
        os.unlink(test_file_path)

if __name__ == "__main__":
    try:
        success = test_file_attachment_workflow()
        exit(0 if success else 1)
    except Exception as e:
        print(f"❌ Test failed with exception: {e}")
        exit(1)
