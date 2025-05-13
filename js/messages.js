document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const conversationsList = document.getElementById("conversationsList")
  const chatArea = document.getElementById("chatArea")
  const emptyState = document.getElementById("emptyState")
  const backButton = document.getElementById("backButton")
  const conversationItems = document.querySelectorAll(".conversation-item")
  const conversationTabs = document.querySelectorAll(".conversation-tab")
  const messageInput = document.getElementById("messageInput")
  const sendButton = document.getElementById("sendButton")
  const messagesContainer = document.querySelector(".messages-container")
  const chatMessages = document.getElementById("chatMessages")

  // Check if we're on mobile
  const isMobile = () => window.innerWidth < 768

  // Initialize the UI
  function initializeUI() {
    if (isMobile()) {
      // On mobile, show conversations list by default
      emptyState.style.display = "none"
      chatArea.style.display = "none"
      conversationsList.style.display = "block"
    } else {
      // On desktop, show empty state or chat area depending on if a conversation is selected
      const activeConversation = document.querySelector(".conversation-item.active")
      if (activeConversation) {
        emptyState.style.display = "none"
        chatArea.style.display = "flex"
      } else {
        emptyState.style.display = "flex"
        chatArea.style.display = "none"
      }
    }
  }

  // Initialize the UI on page load
  initializeUI()

  // Handle window resize
  window.addEventListener("resize", initializeUI)

  // Handle conversation selection
  conversationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all conversations
      conversationItems.forEach((conv) => conv.classList.remove("active"))

      // Add active class to clicked conversation
      this.classList.add("active")

      // Remove conversation badge if present
      const badge = this.querySelector(".conversation-badge")
      if (badge) {
        badge.remove()
      }

      // Show chat area
      emptyState.style.display = "none"
      chatArea.style.display = "flex"

      if (isMobile()) {
        // On mobile, hide conversations list and show chat area
        messagesContainer.classList.add("show-chat")
      }

      // In a real app, you would fetch the conversation messages here
      console.log(`Selected conversation ID: ${this.getAttribute("data-id")}`)

      // Scroll to bottom of chat messages
      scrollToBottom()
    })
  })

  // Handle back button on mobile
  if (backButton) {
    backButton.addEventListener("click", () => {
      messagesContainer.classList.remove("show-chat")
    })
  }

  // Handle conversation tabs
  conversationTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      conversationTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      const tabType = this.getAttribute("data-tab")

      // In a real app, you would filter conversations based on the tab
      console.log(`Selected tab: ${tabType}`)
    })
  })

  // Handle sending messages
  if (sendButton && messageInput) {
    sendButton.addEventListener("click", sendMessage)
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage()
      }
    })
  }

  function sendMessage() {
    const messageText = messageInput.value.trim()

    if (messageText === "") {
      return
    }

    // Create new message element
    const messageItem = document.createElement("div")
    messageItem.className = "message-item outgoing"

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"

    const messageBubble = document.createElement("div")
    messageBubble.className = "message-bubble"

    const messageP = document.createElement("p")
    messageP.textContent = messageText

    const messageTime = document.createElement("div")
    messageTime.className = "message-time"

    // Get current time
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    messageTime.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`

    // Assemble message
    messageBubble.appendChild(messageP)
    messageContent.appendChild(messageBubble)
    messageContent.appendChild(messageTime)
    messageItem.appendChild(messageContent)

    // Add message to chat
    chatMessages.appendChild(messageItem)

    // Clear input
    messageInput.value = ""

    // Scroll to bottom
    scrollToBottom()

    // In a real app, you would send the message to the server here
    console.log(`Sent message: ${messageText}`)

    // Simulate a reply after a short delay
    setTimeout(simulateReply, 1000)
  }

  function simulateReply() {
    // Create new message element for the reply
    const messageItem = document.createElement("div")
    messageItem.className = "message-item"

    const messageAvatar = document.createElement("div")
    messageAvatar.className = "message-avatar"

    const avatarImg = document.createElement("img")
    avatarImg.src = "images/avatar-1.jpg"
    avatarImg.alt = "Sarah Johnson"

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"

    const messageBubble = document.createElement("div")
    messageBubble.className = "message-bubble"

    const messageP = document.createElement("p")
    messageP.textContent = "Thanks for your message! I'll get back to you soon."

    const messageTime = document.createElement("div")
    messageTime.className = "message-time"

    // Get current time
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    messageTime.textContent = `${formattedHours}:${formattedMinutes} ${ampm}`

    // Assemble message
    messageAvatar.appendChild(avatarImg)
    messageBubble.appendChild(messageP)
    messageContent.appendChild(messageBubble)
    messageContent.appendChild(messageTime)
    messageItem.appendChild(messageAvatar)
    messageItem.appendChild(messageContent)

    // Add message to chat
    chatMessages.appendChild(messageItem)

    // Scroll to bottom
    scrollToBottom()
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Initial scroll to bottom
  scrollToBottom()
})
// Messages Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu
  initMobileMenu()

  // Initialize conversation selection
  initConversationSelection()

  // Initialize back button
  initBackButton()

  // Initialize message sending
  initMessageSending()

  // Initialize tabs
  initTabs()
})

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active")

      // Toggle aria-expanded for accessibility
      const expanded = mainNav.classList.contains("active")
      mobileMenuToggle.setAttribute("aria-expanded", expanded)
    })
  }
}

// Conversation Selection
function initConversationSelection() {
  const conversationItems = document.querySelectorAll(".conversation-item")
  const messagesContainer = document.getElementById("messagesContainer")
  const chatArea = document.getElementById("chatArea")
  const emptyState = document.getElementById("emptyState")

  conversationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all conversation items
      conversationItems.forEach((conv) => conv.classList.remove("active"))

      // Add active class to clicked item
      this.classList.add("active")

      // Show chat area and hide empty state
      if (chatArea && emptyState) {
        chatArea.style.display = "flex"
        emptyState.style.display = "none"
      }

      // For mobile view
      if (window.innerWidth < 768) {
        messagesContainer.classList.add("show-chat")
      }

      // Update chat header with selected conversation info
      updateChatHeader(this)

      // Mark as read (remove badge)
      const badge = this.querySelector(".conversation-badge")
      if (badge) {
        badge.style.display = "none"
      }
    })
  })
}

// Update Chat Header
function updateChatHeader(conversationItem) {
  const chatUserInfo = document.querySelector(".chat-user-info")
  const chatAvatar = document.querySelector(".chat-avatar img")
  const statusIndicator = document.querySelector(".chat-avatar .status-indicator")

  if (chatUserInfo && chatAvatar) {
    const name = conversationItem.querySelector("h3").textContent
    const role = conversationItem.querySelector(".conversation-role").textContent
    const avatar = conversationItem.querySelector(".conversation-avatar img").src
    const isOnline = conversationItem.querySelector(".status-indicator.online")

    chatUserInfo.querySelector("h3").textContent = name
    chatUserInfo.querySelector("p").textContent = role
    chatAvatar.src = avatar

    if (statusIndicator) {
      if (isOnline) {
        statusIndicator.classList.add("online")
      } else {
        statusIndicator.classList.remove("online")
      }
    }
  }
}

// Back Button for Mobile
function initBackButton() {
  const backButton = document.getElementById("backButton")
  const messagesContainer = document.getElementById("messagesContainer")

  if (backButton && messagesContainer) {
    backButton.addEventListener("click", () => {
      messagesContainer.classList.remove("show-chat")
    })
  }
}

// Message Sending
function initMessageSending() {
  const messageInput = document.getElementById("messageInput")
  const sendButton = document.getElementById("sendButton")
  const chatMessages = document.getElementById("chatMessages")

  if (messageInput && sendButton && chatMessages) {
    // Send message on button click
    sendButton.addEventListener("click", () => {
      sendMessage()
    })

    // Send message on Enter key
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        sendMessage()
      }
    })

    function sendMessage() {
      const message = messageInput.value.trim()

      if (message !== "") {
        // Create message element
        const messageItem = document.createElement("div")
        messageItem.className = "message-item outgoing"

        const currentTime = new Date()
        const hours = currentTime.getHours()
        const minutes = currentTime.getMinutes()
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`

        messageItem.innerHTML = `
          <div class="message-content">
            <div class="message-bubble">
              <p>${message}</p>
            </div>
            <div class="message-time">${formattedTime}</div>
          </div>
        `

        // Add message to chat
        chatMessages.appendChild(messageItem)

        // Clear input
        messageInput.value = ""

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight

        // Simulate reply after delay (for demo purposes)
        simulateReply()
      }
    }

    function simulateReply() {
      // Show typing indicator
      const typingIndicator = document.createElement("div")
      typingIndicator.className = "typing-indicator"
      typingIndicator.innerHTML = `
        <div class="message-avatar">
          <img src="images/avatar-1.jpg" alt="Sarah Johnson">
        </div>
        <div class="message-content">
          <div class="typing-text">Sarah is typing</div>
          <div class="typing-dots">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      `

      chatMessages.appendChild(typingIndicator)
      chatMessages.scrollTop = chatMessages.scrollHeight

      // Remove typing indicator and show reply after delay
      setTimeout(() => {
        chatMessages.removeChild(typingIndicator)

        const replyItem = document.createElement("div")
        replyItem.className = "message-item"

        const currentTime = new Date()
        const hours = currentTime.getHours()
        const minutes = currentTime.getMinutes()
        const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`

        replyItem.innerHTML = `
          <div class="message-avatar">
            <img src="images/avatar-1.jpg" alt="Sarah Johnson">
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <p>Thanks for your message! I'll get back to you shortly.</p>
            </div>
            <div class="message-time">${formattedTime}</div>
          </div>
        `

        chatMessages.appendChild(replyItem)
        chatMessages.scrollTop = chatMessages.scrollHeight
      }, 2000)
    }
  }
}

// Tab Functionality
function initTabs() {
  const tabButtons = document.querySelectorAll(".conversation-tab")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Filter conversations based on tab
      filterConversations(tabName)
    })
  })

  function filterConversations(tabName) {
    const conversations = document.querySelectorAll(".conversation-item")

    conversations.forEach((conversation) => {
      if (tabName === "all") {
        conversation.style.display = "flex"
      } else if (tabName === "unread") {
        const badge = conversation.querySelector(".conversation-badge")
        conversation.style.display = badge ? "flex" : "none"
      } else if (tabName === "alumni") {
        // For demo purposes, show all in alumni tab
        conversation.style.display = "flex"
      }
    })
  }
}

// Window resize handler
window.addEventListener("resize", () => {
  const messagesContainer = document.getElementById("messagesContainer")
  const activeConversation = document.querySelector(".conversation-item.active")

  if (window.innerWidth >= 768) {
    messagesContainer.classList.remove("show-chat")
  } else if (activeConversation && !messagesContainer.classList.contains("show-chat")) {
    messagesContainer.classList.add("show-chat")
  }
})
