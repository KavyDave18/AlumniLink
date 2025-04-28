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
        e.stopPropagation() // Prevent event bubbling
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
  const messageButtons = document.querySelectorAll(".message-btn")

  if (messageButtons.length > 0) {
    messageButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation() // Prevent event bubbling
        // In a real app, this would open a message modal or redirect to messages page
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
  const filterCheckboxes = document.querySelectorAll(".filter-option input")
  const applyFiltersBtn = document.querySelector(".apply-filters-btn")
  const clearFiltersBtn = document.getElementById("clearFilters")
  const resultsCount = document.getElementById("resultsCount")

  // Apply filters
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      applyFilters()
    })
  }

  // Clear filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      filterCheckboxes.forEach((checkbox) => {
        checkbox.checked = false
      })

      alumniCards.forEach((card) => {
        card.style.display = "block"
      })

      updateResultsCount()
    })
  }

  function applyFilters() {
    // Get selected filters
    const selectedFilters = {
      industry: [],
      year: [],
      location: [],
      skills: [],
    }

    filterCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const filterType = checkbox.name
        const filterValue = checkbox.value

        if (selectedFilters[filterType]) {
          selectedFilters[filterType].push(filterValue)
        }
      }
    })

    // Filter alumni cards
    alumniCards.forEach((card) => {
      let showCard = true

      // Check industry filter
      if (selectedFilters.industry.length > 0) {
        const cardIndustry = card.getAttribute("data-industry")
        if (!selectedFilters.industry.includes(cardIndustry)) {
          showCard = false
        }
      }

      // Check year filter
      if (showCard && selectedFilters.year.length > 0) {
        const cardYear = card.getAttribute("data-year")
        if (!selectedFilters.year.includes(cardYear)) {
          showCard = false
        }
      }

      // Check location filter
      if (showCard && selectedFilters.location.length > 0) {
        const cardLocation = card.getAttribute("data-location")
        if (!selectedFilters.location.includes(cardLocation)) {
          showCard = false
        }
      }

      // Show or hide card
      card.style.display = showCard ? "block" : "none"
    })

    updateResultsCount()
  }

  function updateResultsCount() {
    const visibleCards = document.querySelectorAll(
      ".alumni-card[style='display: block'], .alumni-card:not([style])",
    ).length
    if (resultsCount) {
      resultsCount.textContent = `(${visibleCards})`
    }
  }

  // Search functionality
  const searchInput = document.getElementById("alumniSearch")
  const searchButton = searchInput?.nextElementSibling

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", () => {
      searchAlumni()
    })

    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        searchAlumni()
      }
    })
  }

  function searchAlumni() {
    const searchTerm = searchInput.value.toLowerCase()

    alumniCards.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase()
      const role = card.querySelector(".alumni-role").textContent.toLowerCase()

      if (name.includes(searchTerm) || role.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })

    updateResultsCount()
  }

  // Pagination functionality
  const paginationNumbers = document.querySelectorAll(".pagination-number")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (paginationNumbers.length > 0) {
    paginationNumbers.forEach((button, index) => {
      button.addEventListener("click", function () {
        // Remove active class from all pagination numbers
        paginationNumbers.forEach((btn) => {
          btn.classList.remove("active")
        })

        // Add active class to clicked pagination number
        this.classList.add("active")

        // Enable/disable prev/next buttons
        prevBtn.disabled = index === 0
        nextBtn.disabled = index === paginationNumbers.length - 1

        // In a real app, this would fetch the next page of results
        console.log(`Showing page ${index + 1}`)
      })
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const activeIndex = Array.from(paginationNumbers).findIndex((btn) => btn.classList.contains("active"))

      if (activeIndex > 0) {
        paginationNumbers[activeIndex - 1].click()
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const activeIndex = Array.from(paginationNumbers).findIndex((btn) => btn.classList.contains("active"))

      if (activeIndex < paginationNumbers.length - 1) {
        paginationNumbers[activeIndex + 1].click()
      }
    })
  }
})
