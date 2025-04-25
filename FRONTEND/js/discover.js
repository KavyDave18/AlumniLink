document.addEventListener("DOMContentLoaded", () => {
    // View tabs functionality
    const viewTabs = document.querySelectorAll(".view-tab")
    const alumniViews = document.querySelectorAll(".alumni-view")
  
    if (viewTabs.length > 0) {
      viewTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          // Remove active class from all tabs and views
          viewTabs.forEach((t) => t.classList.remove("active"))
          alumniViews.forEach((v) => v.classList.remove("active"))
  
          // Add active class to clicked tab and corresponding view
          this.classList.add("active")
          const viewType = this.getAttribute("data-view")
          document.querySelector(`.${viewType}-view`).classList.add("active")
        })
      })
    }
  
    // Connect button functionality
    const connectButtons = document.querySelectorAll(".connect-btn")
  
    if (connectButtons.length > 0) {
      connectButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          e.stopPropagation() // Prevent opening modal when clicking connect button
  
          const alumniId = this.getAttribute("data-id")
  
          // Toggle button text and style
          if (this.innerHTML.includes("Connect")) {
            this.innerHTML = '<i class="fas fa-check"></i> Connected'
            this.classList.add("connected")
          } else {
            this.innerHTML = '<i class="fas fa-user-plus"></i> Connect'
            this.classList.remove("connected")
          }
  
          // In a real app, you would send this to the server
          console.log(
            `Connection ${this.classList.contains("connected") ? "requested" : "removed"} for alumni ID: ${alumniId}`,
          )
        })
      })
    }
  
    // Message button functionality
    const messageButtons = document.querySelectorAll(".alumni-actions .message-btn")
  
    if (messageButtons.length > 0) {
      messageButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.stopPropagation() // Prevent opening modal when clicking message button
  
          // In a real app, you would redirect to messages page or open a message modal
          console.log("Message button clicked")
          window.location.href = "messages.html"
        })
      })
    }
  
    // Show alumni profile modal when clicking on alumni card
    const alumniCards = document.querySelectorAll(".alumni-card")
    const alumniListItems = document.querySelectorAll(".alumni-list-item")
    const alumniModal = document.getElementById("alumniModal")
  
    if (alumniCards.length > 0 && alumniModal) {
      alumniCards.forEach((card) => {
        card.addEventListener("click", (e) => {
          // Don't open modal if clicking on buttons
          if (e.target.closest(".btn-action")) {
            return
          }
  
          alumniModal.style.display = "block"
  
          // In a real app, you would fetch the alumni data and update the modal content
          console.log("Opening alumni profile modal from card")
        })
      })
    }
  
    if (alumniListItems.length > 0 && alumniModal) {
      alumniListItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          // Don't open modal if clicking on buttons
          if (e.target.closest(".btn")) {
            return
          }
  
          alumniModal.style.display = "block"
  
          // In a real app, you would fetch the alumni data and update the modal content
          console.log("Opening alumni profile modal from list item")
        })
      })
    }
  
    // Filter functionality
    const filterOptions = document.querySelectorAll(".filter-option input")
  
    if (filterOptions.length > 0) {
      filterOptions.forEach((option) => {
        option.addEventListener("change", function () {
          // In a real app, you would filter the alumni based on the selected options
          console.log(`Filter ${this.name}=${this.value} ${this.checked ? "checked" : "unchecked"}`)
        })
      })
    }
  })
  