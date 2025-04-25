document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const mainNav = document.querySelector(".main-nav")
  
    if (mobileMenuToggle && mainNav) {
      mobileMenuToggle.addEventListener("click", () => {
        mainNav.style.display = mainNav.style.display === "block" ? "none" : "block"
      })
    }
  
    // Modal functionality
    const modal = document.getElementById("alumniModal")
    const closeModal = document.querySelector(".close-modal")
  
    // Close modal when clicking the X
    if (closeModal && modal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none"
      })
    }
  
    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })
  
    // Tab functionality
    const tabButtons = document.querySelectorAll(".tab-btn")
  
    if (tabButtons.length > 0) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons and panes
          document.querySelectorAll(".tab-btn").forEach((btn) => {
            btn.classList.remove("active")
          })
          document.querySelectorAll(".tab-pane").forEach((pane) => {
            pane.classList.remove("active")
          })
  
          // Add active class to clicked button and corresponding pane
          this.classList.add("active")
          const tabId = this.getAttribute("data-tab")
          document.getElementById(tabId).classList.add("active")
        })
      })
    }
  
    // Handle window resize for responsive design
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && mainNav) {
        mainNav.style.display = ""
      }
    })
  })
  