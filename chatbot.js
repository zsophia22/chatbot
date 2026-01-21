const EXAMPLE_QUESTIONS = [
    "example question 1", 
    "example question 2",
    "example question 3", 
    "example question 4"
];

const mockResponses = [
    "That's a great question! I'd be happy to help you understand this better. The key points involve understanding the core functionality and how it benefits users.",
    
    "I understand what you're asking about. This is actually a common topic that comes up frequently. Let me explain the main factors to consider.",
    
    "Excellent question! This works through a combination of different components working together. The system processes your input and provides tailored responses.",
    
    "Thanks for asking! I can definitely help clarify this for you. The concept involves several interconnected parts designed to streamline processes efficiently.",
    
    "That's an interesting point you've raised. The system leverages modern technologies and best practices to deliver a robust, scalable solution.",
    
    "I appreciate you asking about this! The approach involves multiple layers of functionality, each serving a specific purpose to provide value to users.",
    
    "Great question! The process begins when you initiate an action, and the system goes through carefully designed stages to ensure accuracy and efficiency.",
    
    "That's a thoughtful question! The design philosophy centers around making complex processes simple and accessible through user-friendly interfaces."
];

let shouldAutoScroll = true; 
const SCROLL_THRESHOLD = 100;
let isProcessing = false;

const submitButton = document.querySelector(".send-btn");
const inputText = document.querySelector(".input-box");
const chatHistory = document.querySelector(".chat-history");

function isNearButton() {
    const scrollTop = chatHistory.scrollTop; // How far the user has scrolled from the top
    const scrollHeight = chatHistory.scrollHeight; // Total height of the chat history
    const clientHeight = chatHistory.clientHeight; // Visible height of the chat history
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= SCROLL_THRESHOLD; // If the user is near the bottom of the chat history
}

function scrollToBottom() {
    chatHistory.scrollTo({
        top: chatHistory.scrollHeight,
        behavior: 'smooth'
    });
}

chatHistory.addEventListener("scroll", () => {
    shouldAutoScroll = isNearButton();
});

function showTypingIndicator() {
    const message = document.createElement("div");
    message.className = "message bot typing-indicator";

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", "bot");
    icon.className="lucide-icon";
    avatar.appendChild(icon);

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

    message.appendChild(avatar);
    message.appendChild(bubble);
    chatHistory.appendChild(message);

    lucide.createIcons();

    if (shouldAutoScroll) {
        setTimeout(scrollToBottom, 0);
    }
    return message;
}

function removeTypingIndicator() {
    const typingIndicator = document.querySelector(".typing-indicator");
    if (typingIndicator) {
        typingIndicator.remove();
    }
}


function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}`;
    message.setAttribute("role", "log");

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.setAttribute("aria-hidden", "true");

    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", sender === "user" ? "user" : "bot");
    icon.className = "lucide-icon";
    avatar.appendChild(icon);
    
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    bubble.setAttribute("aria-label", `${sender} message: ${text}`);
    
    message.appendChild(avatar);
    message.appendChild(bubble);
    chatHistory.appendChild(message); 

    lucide.createIcons();
    
    // Auto-scroll after message is added
    if (shouldAutoScroll) {
        setTimeout(scrollToBottom, 100);
    }
}

function setLoadingState(loading) {
    isProcessing = loading;
    submitButton.disabled = loading;
    inputText.disabled = loading;
    
    if (loading) {
        submitButton.classList.add("loading");
        submitButton.setAttribute("aria-busy", "true");
    } else {
        submitButton.classList.remove("loading");
        submitButton.setAttribute("aria-busy", "false");
        inputText.focus();
    }
}

function sendMessage() {
    /* Prevent multiple simultaneous sends */
    if (isProcessing) return;

    /* Grab User Input */
    const text = inputText.value.trim(); 
    if (!text) {
        inputText.focus();
        return;
    }

    /* Hide example questions after first message */
    const exampleSection = document.querySelector(".chat-example");
    if (exampleSection && exampleSection.style.display !== "none") {
        exampleSection.style.display = "none";
    }

    /* Append Message to Chat History */
    addMessage(text, "user");
    inputText.value = "";
    
    /* Set loading state */
    setLoadingState(true);
    
    /* Show typing indicator */
    showTypingIndicator();
    
    /* MOCK BOT RESPONSE */
    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        try {
            const randomReply = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            addMessage(randomReply, "bot");
        } catch (error) {
            console.error("Error adding bot message:", error);
            addMessage("Sorry, I encountered an error. Please try again.", "bot");
        } finally {
            // Reset loading state
            setLoadingState(false);
        }
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5s for more natural feel
}

/* Event Listeners */
submitButton.addEventListener("click", sendMessage);

inputText.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});

// Handle example question clicks
const exampleSection = document.querySelector(".chat-example");
const exampleItems = document.querySelectorAll(".chat-example ul li");

function handleExampleClick(event) {
    if (isProcessing) return;
    
    const questionText = event.target.textContent.trim();
    if (!questionText) return;
    
    exampleSection.style.display = "none";
    inputText.value = questionText;
    sendMessage();
}

function handleExampleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleExampleClick(event);
    }
}

exampleItems.forEach(item => {
    item.addEventListener("click", handleExampleClick);
    item.addEventListener("keydown", handleExampleKeydown);
});

// Prevent form submission if form element exists
const form = document.querySelector("form");
if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        sendMessage();
    });
}

// Auto-focus input on load (better UX)
window.addEventListener("load", () => {
    inputText.focus();
});

// Handle window resize for better mobile experience
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (shouldAutoScroll) {
            scrollToBottom();
        }
    }, 250);
});

// Initialize Lucide icons
lucide.createIcons();

// Add error handling for network issues or API failures
window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
});

// Prevent accidental page refresh during message sending
window.addEventListener("beforeunload", (event) => {
    if (isProcessing) {
        event.preventDefault();
        event.returnValue = "";
        return "";
    }
});


