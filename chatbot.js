
const EXAMPLE_QUESTIONS = [
    "example question 1", 
    "example question 2",
    "example question 3", 
    "example question 4"
];

const mockResponses = [
    "Nice, very interesting", 
    "Tell me more!", 
    "I can see what you mean", 
    "COOOOOOL"
]

// const [messages, setMessages] = useState; 
// const [input, setInput] = useState('');
let shouldAutoScroll = true; 
const SCROLL_THRESHOLD = 100;

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

function scrollToBotton() {
    chatHistory.scrollTop = chatHistory.scrollHeight;
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
        setTimeout(scrollToBotton, 0);
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

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", sender === "user"? "user" : "bot");
    icon.className="lucide-icon";
    avatar.appendChild(icon);
    
    const bubble = document.createElement("div");
    bubble.className = "bubble"
    bubble.textContent = text;
    
    message.appendChild(avatar);
    message.appendChild(bubble);
    document.querySelector(".chat-history").appendChild(message); 

    lucide.createIcons();
}

function sendMessage() {

    /* Grab User Input */
    const text = inputText.value.trim(); 
    if (!text) return; 

    /* Append Message to Chat History */
    addMessage(text, "user");
    inputText.value = "";
    
    showTypingIndicator();
    /* MOCK BOT RESPONSE */
    setTimeout(() => {
        // Remove typing indicator
        removeTypingIndicator();
        
        const randomReply = mockResponses[Math.floor(Math.random() * 4)];
        addMessage(randomReply, "bot");
        
        // Auto-scroll if needed
        if (shouldAutoScroll) {
            setTimeout(scrollToBotton, 0);
        }
    }, 1000);

}

submitButton.addEventListener("click", sendMessage); 
inputText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
const exampleSection = document.querySelector(".chat-example");
const exampleItems = document.querySelectorAll(".chat-example ul li");

function handleExampleClick(event) {
    exampleSection.style.display = "none";
    inputText.value = event.target.textContent;
    sendMessage();
}

exampleItems.forEach(item => {
    item.addEventListener("click", handleExampleClick);
});




lucide.createIcons();


