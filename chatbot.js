
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

const submitButton = document.querySelector(".send-btn");
const inputText = document.querySelector(".input-box");
const chatHistory = document.querySelector(".chat-history");

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("message", sender === "bot" ? "bot-message" : "user-message");
    msg.textContent = text; 
    chatHistory.appendChild(msg); 
}

function sendMessage() {

    /* Grab User Input */
    const text = inputText.value.trim(); 
    if (!text) return; 

    /* Append Message to Chat History */
    addMessage(text, "user");
    inputText.value = "";
    

    /* MOCK BOT RESPONSE */
    setTimeout (() => {
        const randomReply = 
            mockResponses[Math.floor(Math.random() * 4)];
        addMessage(randomReply, "bot");
    }, 500);

}

submitButton.addEventListener("click", sendMessage); 

// submitButton.addEventListener("click",() => {
//     /* Grab user input */
//     const userInput = inputText.value;
//     inputText.value = "";
//     console.log(userInput);

//     /* Add to the HTML chat history */
//     userMessages.
    
// });


