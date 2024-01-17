// Function to add chat bubbles to the chat container
function addUserMessage(message) {
// The chat container where messages will be displayed
    const chatContainer = document.querySelector('.chat-history-container');
// Create a new div element that will be the chat bubble
    const bubble = document.createElement('div');
    
// Might need to delete this comment later: Add two classes to the bubble: 'chat-bubble' for common styles and 'user' or 'Baloo'
  // delete: for specific styles depending on who is sending the message//
    bubble.classList.add('chat-bubble', 'chat-bubble-user'); // Use your existing chat-bubble-user class
    
// Set the text inside the bubble to be the message we want to display
    bubble.innerText = message;
    
// Add the bubble to the chat container element
    chatContainer.appendChild(bubble);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the latest message
}
    


    
function addChatResponse(message) {
    const chatContainer = document.querySelector('.chat-history-container'); 
    const responseContainer = document.createElement('div');
    responseContainer.classList.add('chat-response-container');
    
    const balooImage = document.createElement('img');
    balooImage.src = 'Character%20Main%20face%20PNG.png'; 
    balooImage.alt = 'little-baloo';
    balooImage.classList.add('baloo-image');
    
    const chatBubble = document.createElement('div');
    chatBubble.classList.add('chat-bubble', 'chat-bubble-response'); 
    chatBubble.innerText = message;
    
    responseContainer.appendChild(balooImage);
    responseContainer.appendChild(chatBubble);
    chatContainer.appendChild(responseContainer);
    
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the latest message
}
    
  


document.getElementById('send-button').addEventListener('click', function() {
// Get the user's input message
    const messageInput = document.getElementById('message-input');
    const userMessage = messageInput.value.trim();

// Only proceed if the userMessage is not empty
    if (userMessage) {
    // Add the user's message as a chat bubble
        addUserMessage(userMessage);
        showLoadingMessage(); // Show loading message
    //addChatBubble(userMessage, 'chat-bubble-user'); delete this part
        messageInput.value = ''; // Clear the input after sending
  }

// Send the user's message to the server using fetch API
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        
        hideLoadingMessage(); // Hide loading message
        addChatResponse(data.response); // Use the appropriate class for API responses. Pass the API response to the new function
    })
    
    .catch(error => {
        console.error('Error:', error);
        hideLoadingMessage(); // Hide loading message in case of error
    });
    
    messageInput.value = ''; // Clear the input after sending
});



// Have a loading display for the chat 
    function showLoadingMessage() {
        const chatContainer = document.querySelector('.chat-history-container');
        const loadingMessage = document.createElement('div');
        loadingMessage.id = 'loading-message';
        loadingMessage.classList.add('chat-bubble', 'chat-bubble-response');
        loadingMessage.innerText = 'Baloo is thinking...';
        chatContainer.appendChild(loadingMessage);
    }

    function hideLoadingMessage() {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }





// Make the return key the enter key, also make Enter + Shift key the normal return key //
        function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const userMessage = messageInput.value.trim();

    if (userMessage) {
        // Add the user's message as a chat bubble
        addUserMessage(userMessage);
        showLoadingMessage(); // Show loading message
        messageInput.value = ''; // Clear the input after sending

        // Send the user's message to the server using fetch API
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            setTimeout(() => { // Delay hiding the loading message for testing

            hideLoadingMessage(); // Hide loading message.. 
            addChatResponse(data.response); // Add the server's response to the chat
            }, 1000); // Delay for 1 second
        })
        .catch(error => {
            console.error('Error:', error);
            hideLoadingMessage(); // Hide loading message in case of error
        });
    }
}

document.getElementById('send-button').addEventListener('click', sendMessage);

document.getElementById('message-input').addEventListener('keydown', function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault(); // Prevents adding a new line
        sendMessage();
    }
});





//Get eyes moving *NOT WORKING YET* // 
    document.addEventListener('mousemove', function(event) {
        console.log('Mouse moved!'); // This should log every time you move the mouse
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;
            const deltaX = event.clientX - eyeCenterX;
            const deltaY = event.clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);
            const distance = Math.min(rect.width / 4, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
            const eyeX = distance * Math.cos(angle);
            const eyeY = distance * Math.sin(angle);
            eye.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
            console.log(`Eye movement: X=${eyeX}, Y=${eyeY}`); // This will show you the calculated positions

        });
    });





