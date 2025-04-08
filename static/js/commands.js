document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for send button
    const sendButton = document.querySelector('.chat-input button');
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Add event listener for Enter key in textarea
    const textarea = document.getElementById('userInput');
    if (textarea) {
        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});