// Main JavaScript for AlumniLink

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu
  initMobileMenu()

  // Initialize profile dropdown
  initProfileDropdown()

  // Initialize modals
  initModals()

  // Initialize tabs
  initTabs()

  // Add profile redirect
  initProfileRedirect()

  // Add animations
  initAnimations()
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

// Profile Dropdown
function initProfileDropdown() {
  const userAvatar = document.querySelector(".user-avatar")
  const profileDropdown = document.querySelector(".profile-dropdown")

  if (userAvatar && profileDropdown) {
    userAvatar.addEventListener("click", (e) => {
      e.stopPropagation()
      profileDropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      if (profileDropdown.classList.contains("active")) {
        profileDropdown.classList.remove("active")
      }
    })
  }
}

// Modal Functionality
function initModals() {
  const modalTriggers = document.querySelectorAll("[data-modal]")

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal")
      const modal = document.getElementById(modalId)

      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden" // Prevent scrolling

        // Close modal when clicking on close button
        const closeBtn = modal.querySelector(".close-modal")
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            modal.style.display = "none"
            document.body.style.overflow = ""
          })
        }

        // Close modal when clicking outside content
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none"
            document.body.style.overflow = ""
          }
        })
      }
    })
  })
}

// Tab Functionality
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn, .conversation-tab, .feed-filter")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabGroup = this.closest(".tab-buttons, .conversation-tabs, .feed-filters")
      const tabContainer = this.closest("[data-tabs]")
      const tabName = this.getAttribute("data-tab")

      if (tabGroup && tabContainer) {
        // Remove active class from all buttons in this group
        tabGroup.querySelectorAll("button").forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked button
        this.classList.add("active")

        // Hide all tab panes
        const tabPanes = tabContainer.querySelectorAll(".tab-pane, .conversation-pane, .feed-pane")
        tabPanes.forEach((pane) => {
          pane.classList.remove("active")
        })

        // Show the selected tab pane
        const activePane = tabContainer.querySelector(`.${tabName}`)
        if (activePane) {
          activePane.classList.add("active")
        }
      }
    })
  })
}

// Profile Redirect
function initProfileRedirect() {
  const userAvatars = document.querySelectorAll(".user-avatar")

  userAvatars.forEach((avatar) => {
    avatar.addEventListener("click", (e) => {
      // If there's a profile dropdown, don't redirect immediately
      const profileDropdown = document.querySelector(".profile-dropdown")
      if (profileDropdown && profileDropdown.classList.contains("active")) {
        return
      }

      // Redirect to profile page
      window.location.href = "profile.html"
    })
  })
}

// Add animations
function initAnimations() {
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".feature-card, .alumni-card, .event-item, .job-item, .stat-card")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.classList.add("animated")
      }
    })
  }

  // Run once on load
  animateOnScroll()

  // Run on scroll
  window.addEventListener("scroll", animateOnScroll)
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for fixed header
        behavior: "smooth",
      })
    }
  })
})
