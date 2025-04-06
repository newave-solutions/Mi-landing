// Chat Interface Elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const loadingIndicator = document.getElementById('loading-indicator');

async function sendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    try {
        // Disable input while processing
        userInput.disabled = true;
        sendButton.disabled = true;
        loadingIndicator.style.display = 'block';

        // Add user message
        addMessage(userText, 'user');
        userInput.value = '';

        // Send to backend
        const response = await fetch('/api/ask-gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userText }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to get response');
        }

        // Add bot response
        addMessage(data.response, 'bot');

    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, something went wrong. Please try again.', 'error');
    } finally {
        userInput.disabled = false;
        sendButton.disabled = false;
        loadingIndicator.style.display = 'none';
        userInput.focus();
    }
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Initial greeting
document.addEventListener('DOMContentLoaded', () => {
    addMessage('Hello! How can I help you today?', 'bot');
});
