document.addEventListener("DOMContentLoaded", () => {
    // Connect button functionality
    const connectButtons = document.querySelectorAll(".connect-btn")
  
    if (connectButtons.length > 0) {
      connectButtons.forEach((button) => {
        button.addEventListener("click", function () {
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
  
    // RSVP button functionality
    const rsvpButtons = document.querySelectorAll(".rsvp-btn")
  
    if (rsvpButtons.length > 0) {
      rsvpButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const eventId = this.getAttribute("data-id")
  
          // Toggle button text and style
          if (this.textContent === "RSVP") {
            this.textContent = "Cancel RSVP"
            this.classList.add("btn-outline")
            this.classList.remove("btn-primary")
          } else {
            this.textContent = "RSVP"
            this.classList.add("btn-primary")
            this.classList.remove("btn-outline")
          }
  
          // In a real app, you would send this to the server
          console.log(`RSVP ${this.textContent === "RSVP" ? "removed" : "added"} for event ID: ${eventId}`)
        })
      })
    }
  
    // Show alumni profile modal when clicking on alumni card
    const alumniCards = document.querySelectorAll(".alumni-card")
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
          console.log("Opening alumni profile modal")
        })
      })
    }
  
    // Add animation to feature cards
    const featureCards = document.querySelectorAll(".feature-card")
  
    if (featureCards.length > 0) {
      featureCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-10px)"
        })
  
        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)"
        })
      })
    }
  })
  