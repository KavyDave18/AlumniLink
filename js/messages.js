document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const conversationsList = document.getElementById("conversationsList");
  const chatArea = document.getElementById("chatArea");
  const emptyState = document.getElementById("emptyState");
  const backButton = document.getElementById("backButton");
  const conversationItems = document.querySelectorAll(".conversation-item");
  const conversationTabs = document.querySelectorAll(".conversation-tab");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const messagesContainer = document.querySelector(".messages-container");
  const chatMessages = document.getElementById("chatMessages");

  // Check if we're on mobile
  const isMobile = () => window.innerWidth < 768;

  // Initialize the UI
  function initializeUI() {
    if (isMobile()) {
      // On mobile, show conversations list by default
      emptyState.style.display = "none";
      chatArea.style.display = "none";
      conversationsList.style.display = "block";
    } else {
      // On desktop, show empty state or chat area depending on if a conversation is selected
      const activeConversation = document.querySelector(".conversation-item.active");
      if (activeConversation) {
        emptyState.style.display = "none";
        chatArea.style.display = "flex";
      } else {
        emptyState.style.display = "flex";
        chatArea.style.display = "none";
      }
    }
  }

  // Initialize the UI on page load
  initializeUI();

  // Handle window resize
  window.addEventListener("resize", initializeUI);

  // Handle conversation selection
  conversationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all conversations
      conversationItems.forEach((conv) => conv.classList.remove("active"));

      // Add active class to clicked conversation
      this.classList.add("active");

      // Remove conversation badge if present
      const badge = this.querySelector(".conversation-badge");
      if (badge) {
        badge.remove();
      }

      // Show chat area
      emptyState.style.display = "none";
      chatArea.style.display = "flex";

      if (isMobile()) {
        // On mobile, hide conversations list and show chat area
        messagesContainer.classList.add("show-chat");
      }

      // In a real app, you would fetch the conversation messages here
      console.log(`Selected conversation ID: ${this.getAttribute("data-id")}`);

      // Scroll to bottom of chat messages
      scrollToBottom();
    });
  });

  // Handle back button on mobile
  if (backButton) {
    backButton.addEventListener("click", () => {
      messagesContainer.classList.remove("show-chat");
    });
  }

  // Handle conversation tabs
  conversationTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      conversationTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      const tabType = this.getAttribute("data-tab");

      // In a real app, you would filter conversations based on the tab
      console.log(`Selected tab: ${tabType}`);
    });
  });

  // Handle sending messages
  if (sendButton && messageInput) {
    sendButton.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  function sendMessage() {
    const messageText = messageInput.value.trim();

    if (messageText === "") {
      return;
    }

    // Create new message element
    const messageItem = document.createElement("div");
    messageItem.className = "message-item outgoing";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const messageBubble = document.createElement("div");
    messageBubble.className = "message-bubble";

    const messageP = document.createElement("p");
    messageP.textContent = messageText;

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";

    // Get current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    messageTime.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // Assemble message
    messageBubble.appendChild(messageP);
    messageContent.appendChild(messageBubble);
    messageContent.appendChild(messageTime);
    messageItem.appendChild(messageContent);

    // Add message to chat
    chatMessages.appendChild(messageItem);

    // Clear input
    messageInput.value = "";

    // Scroll to bottom
    scrollToBottom();

    // In a real app, you would send the message to the server here
    console.log(`Sent message: ${messageText}`);

    // Simulate a reply after a short delay
    setTimeout(simulateReply, 1000);
  }

  function simulateReply() {
    // Create new message element for the reply
    const messageItem = document.createElement("div");
    messageItem.className = "message-item";

    const messageAvatar = document.createElement("div");
    messageAvatar.className = "message-avatar";

    const avatarImg = document.createElement("img");
    avatarImg.src = "images/avatar-1.jpg";
    avatarImg.alt = "Sarah Johnson";

    const messageContent = document.createElement("div");
    messageContent.className = "message-content";

    const messageBubble = document.createElement("div");
    messageBubble.className = "message-bubble";

    const messageP = document.createElement("p");
    messageP.textContent = "Thanks for your message! I'll get back to you soon.";

    const messageTime = document.createElement("div");
    messageTime.className = "message-time";

    // Get current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    messageTime.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`;

    // Assemble message
    messageAvatar.appendChild(avatarImg);
    messageBubble.appendChild(messageP);
    messageContent.appendChild(messageBubble);
    messageContent.appendChild(messageTime);
    messageItem.appendChild(messageAvatar);
    messageItem.appendChild(messageContent);

    // Add message to chat
    chatMessages.appendChild(messageItem);

    // Scroll to bottom
    scrollToBottom();
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Initial scroll to bottom
  scrollToBottom();
});
