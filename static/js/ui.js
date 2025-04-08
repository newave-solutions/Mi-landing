// Custom chat interface implementation
const chatInterface = {
    init() {
        this.messageContainer = document.getElementById('chatMessages');
        this.inputField = document.getElementById('userInput');
        this.sendButton = document.querySelector('.chat-input button');
        this.bindEvents();
        this.messageQueue = [];
        this.isProcessing = false;
    },

    bindEvents() {
        this.sendButton?.addEventListener('click', () => this.processUserInput());
        this.inputField?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.processUserInput();
            }
        });
    },

    async processUserInput() {
        const message = this.inputField.value.trim();
        if (!message) return;

        this.inputField.value = '';
        this.addToChat('user', message);
        await this.sendToServer(message);
    },

    async sendToServer(message) {
        try {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            };

            const response = await this.makeRequest('/chat', options);
            this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    },

    async makeRequest(url, options) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(options.method, url);
            
            Object.entries(options.headers).forEach(([key, value]) => {
                request.setRequestHeader(key, value);
            });

            request.onload = () => resolve({
                status: request.status,
                data: JSON.parse(request.responseText)
            });
            
            request.onerror = () => reject(new Error('Network error'));
            request.send(options.body);
        });
    },

    handleResponse(response) {
        if (response.status === 200 && response.data.status === 'success') {
            this.addToChat('bot', response.data.response);
        } else {
            this.addToChat('error', 'An error occurred while processing your request');
        }
    },

    handleError(error) {
        console.error('Chat error:', error);
        this.addToChat('error', 'Unable to process request');
    },

    addToChat(type, content) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}-message`;
        messageElement.setAttribute('role', 'log');
        messageElement.setAttribute('aria-live', 'polite');
        
        const timestamp = new Date().toLocaleTimeString();
        messageElement.innerHTML = `
            <span class="message-time">${timestamp}</span>
            <span class="message-content">${this.sanitizeContent(content)}</span>
        `;
        
        this.messageContainer.appendChild(messageElement);
        this.scrollToBottom();
    },

    sanitizeContent(content) {
        const div = document.createElement('div');
        div.textContent = content;
        return div.innerHTML;
    },

    scrollToBottom() {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
};

// Initialize chat interface when DOM is ready
document.addEventListener('DOMContentLoaded', () => chatInterface.init());