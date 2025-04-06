// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Enable smooth scrolling
                block: 'start'     // Scroll to the top of the target element
            });
        }
    });
});
// Form submission handler (basic example)
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); //prevent page reload

        //In a real application, you'd do something like:
        //1. Gather form data
        //2. Validate the data
        //3. Send an AJAX request to a server
        //4. Handle the server's response (success or error)
        //5. Show a message to the user

        console.log('Contact Sales button clicked!'); // Placeholder action

        //Example of gathering form data (if you had a form)
        // const name = document.querySelector('#name').value;
        // const email = document.querySelector('#email').value;

        //Example of a very basic AJAX request (using fetch)
        /*
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email }) // Send data as JSON
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            //Handle the server's response (success/error)
            console.log(data);
            if(data.success){
                //Display a success message
            } else{
                //Display an error message
            }
        })
        .catch(error => {
            console.error('Error:', error);
             //Handle errors during the request
        });
        */

    });
});

function sendMessage() {
    const input = document.getElementById('userInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (input.value.trim()) {
        // Create user message
        const userMessage = document.createElement('div');
        userMessage.textContent = input.value;
        userMessage.classList.add('user-message');
        messagesContainer.appendChild(userMessage);
        
        // Clear input
        input.value = '';
        
        // Auto scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}
