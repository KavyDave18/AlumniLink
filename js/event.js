document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const eventSearchInput = document.getElementById("eventSearchInput")
    const eventsGrid = document.getElementById("eventsGrid")
    const eventCards = document.querySelectorAll(".event-card")
    const noResults = document.getElementById("noResults")
    const applyFiltersBtn = document.getElementById("applyFiltersBtn")
    const clearFiltersBtn = document.getElementById("clearFiltersBtn")
    const filterOptions = document.querySelectorAll(".event-filter")
    const eventTabs = document.querySelectorAll(".event-tab")
    const rsvpBtns = document.querySelectorAll(".rsvp-btn")
    const eventDetailsBtns = document.querySelectorAll(".event-details-btn")
    const eventModal = document.getElementById("eventModal")
    const closeModal = document.querySelector(".close-modal")
    const modalCloseBtn = document.getElementById("modalCloseBtn")
    const modalRsvpBtn = document.getElementById("modalRsvpBtn")
    const profileDropdownBtn = document.getElementById("profileDropdownBtn")
    const profileDropdown = document.getElementById("profileDropdown")
  
    // Event data for modal
    const eventData = [
      {
        id: 1,
        title: "Tech Career Panel",
        date: "May 15, 2023",
        time: "3:00 PM - 5:00 PM",
        location: "Virtual",
        type: "webinar",
        organizer: "Sarah Johnson (Class of 2019)",
        description: "Join us for a panel discussion with alumni working in various tech roles. Learn about different career paths, get advice on job searching, and network with professionals in the field.",
        attendees: 45,
        image: "https://placehold.co/800x400"
      },
      {
        id: 2,
        title: "Alumni Networking Mixer",
        date: "May 22, 2023",
        time: "6:00 PM - 8:00 PM",
        location: "Campus Center",
        type: "in-person",
        organizer: "Alumni Association",
        description: "Connect with alumni from various industries in a casual setting. Refreshments will be provided. This is a great opportunity to expand your professional network and learn from experienced graduates.",
        attendees: 78,
        image: "https://placehold.co/800x400"
      },
      {
        id: 3,
        title: "Resume Workshop",
        date: "May 28, 2023",
        time: "2:00 PM - 4:00 PM",
        location: "Virtual",
        type: "workshop",
        organizer: "David Kim (Class of 2017)",
        description: "Learn how to craft a standout resume that will get you noticed by recruiters. We'll cover formatting, content, and tailoring your resume for specific roles. Bring your current resume for personalized feedback.",
        attendees: 32,
        image: "https://placehold.co/800x400"
      },
      {
        id: 4,
        title: "Interview Preparation Seminar",
        date: "June 5, 2023",
        time: "4:00 PM - 6:00 PM",
        location: "Virtual",
        type: "webinar",
        organizer: "Michael Chen (Class of 2018)",
        description: "Prepare for technical and behavioral interviews with tips from alumni who have experience as both interviewees and interviewers. We'll cover common questions, strategies for answering, and how to stand out.",
        attendees: 56,
        image: "https://placehold.co/800x400"
      },
      {
        id: 5,
        title: "Summer Hackathon",
        date: "June 10-12, 2023",
        time: "All Day",
        location: "Engineering Building",
        type: "in-person",
        organizer: "Tech Club & Alumni Mentors",
        description: "Join us for a weekend of coding, collaboration, and creativity. Work on projects with peers and get mentorship from alumni in the tech industry. Prizes will be awarded for the best projects.",
        attendees: 120,
        image: "https://placehold.co/800x400"
      },
      {
        id: 6,
        title: "Industry Insights: Finance",
        date: "June 15, 2023",
        time: "5:00 PM - 6:30 PM",
        location: "Virtual",
        type: "webinar",
        organizer: "Finance Alumni Network",
        description: "Learn about current trends and career opportunities in the finance industry from alumni working at top firms. Q&A session included.",
        attendees: 38,
        image: "https://placehold.co/800x400"
      }
    ]
  
    // Profile dropdown toggle
    if (profileDropdownBtn && profileDropdown) {
      profileDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        profileDropdown.classList.toggle("active")
      })
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!profileDropdown.contains(e.target) && e.target !== profileDropdownBtn) {
          profileDropdown.classList.remove("active")
        }
      })
    }
  
    // RSVP functionality
    if (rsvpBtns.length > 0) {
      rsvpBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const eventId = this.getAttribute("data-id")
          
          // Toggle RSVP state
          if (this.textContent === "RSVP") {
            this.textContent = "Cancel RSVP"
            this.classList.add("rsvp-active")
            this.classList.remove("btn-primary")
            this.classList.add("btn-outline")
          } else {
            this.textContent = "RSVP"
            this.classList.remove("rsvp-active")
            this.classList.remove("btn-outline")
            this.classList.add("btn-primary")
          }
          
          // In a real app, you would save this to the user's profile
          console.log(`Event ${eventId} ${this.classList.contains("rsvp-active") ? "RSVP'd" : "RSVP canceled"}`)
        })
      })
    }
  
    // Event tabs functionality
    if (eventTabs.length > 0) {
      eventTabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          // Remove active class from all tabs
          eventTabs.forEach((t) => t.classList.remove("active"))
          
          // Add active class to clicked tab
          this.classList.add("active")
          
          const tabType = this.getAttribute("data-tab")
          
          // In a real app, you would filter events based on the tab
          console.log(`Selected tab: ${tabType}`)
          
          // For demo purposes, show/hide events based on tab
          if (tabType === "rsvp") {
            // Show only events with active RSVPs
            eventCards.forEach((card) => {
              const rsvpBtn = card.querySelector(".rsvp-btn")
              if (rsvpBtn && rsvpBtn.classList.contains("rsvp-active")) {
                card.style.display = "block"
              } else {
                card.style.display = "none"
              }
            })
          } else if (tabType === "past") {
            // For demo, hide all events (assuming all are upcoming)
            eventCards.forEach((card) => {
              card.style.display = "none"
            })
            noResults.style.display = "block"
          } else {
            // Show all events for "upcoming" tab
            eventCards.forEach((card) => {
              card.style.display = "block"
            })
            noResults.style.display = "none"
          }
        })
      })
    }
  
    // Event details modal
    if (eventDetailsBtns.length > 0 && eventModal) {
      eventDetailsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const eventId = parseInt(this.getAttribute("data-id"))
          const event = eventData.find(e => e.id === eventId)
          
          if (event) {
            // Update modal content
            document.getElementById("modalEventTitle").textContent = event.title
            document.getElementById("modalEventDate").textContent = event.date
            document.getElementById("modalEventTime").textContent = event.time
            document.getElementById("modalEventLocation").textContent = event.location
            document.getElementById("modalEventOrganizer").textContent = event.organizer
            document.getElementById("modalEventAttendees").textContent = `${event.attendees} people attending`
            document.getElementById("modalEventDescription").textContent = event.description
            
            // Update event tag
            const modalEventTag = document.getElementById("modalEventTag")
            modalEventTag.className = `event-tag ${event.type}`
            modalEventTag.textContent = event.type.charAt(0).toUpperCase() + event.type.slice(1)
            
            // Update modal image
            const modalImage = document.querySelector(".event-image-large img")
            modalImage.src = event.image
            modalImage.alt = event.title
            
            // Update RSVP button
            modalRsvpBtn.setAttribute("data-id", eventId)
            
            // Check if already RSVP'd
            const cardRsvpBtn = document.querySelector(`.rsvp-btn[data-id="${eventId}"]`)
            if (cardRsvpBtn && cardRsvpBtn.classList.contains("rsvp-active")) {
              modalRsvpBtn.textContent = "Cancel RSVP"
              modalRsvpBtn.classList.remove("btn-primary")
              modalRsvpBtn.classList.add("btn-outline")
            } else {
              modalRsvpBtn.textContent = "RSVP to Event"
              modalRsvpBtn.classList.remove("btn-outline")
              modalRsvpBtn.classList.add("btn-primary")
            }
            
            // Show modal
            eventModal.style.display = "block"
          }
        })
      })
      
      // Modal RSVP button
      if (modalRsvpBtn) {
        modalRsvpBtn.addEventListener("click", function () {
          const eventId = this.getAttribute("data-id")
          
          // Toggle RSVP state in modal
          if (this.textContent === "RSVP to Event") {
            this.textContent = "Cancel RSVP"
            this.classList.remove("btn-primary")
            this.classList.add("btn-outline")
          } else {
            this.textContent = "RSVP to Event"
            this.classList.remove("btn-outline")
            this.classList.add("btn-primary")
          }
          
          // Also toggle RSVP state in card
          const cardRsvpBtn = document.querySelector(`.rsvp-btn[data-id="${eventId}"]`)
          if (cardRsvpBtn) {
            if (cardRsvpBtn.textContent === "RSVP") {
              cardRsvpBtn.textContent = "Cancel RSVP"
              cardRsvpBtn.classList.add("rsvp-active")
              cardRsvpBtn.classList.remove("btn-primary")
              cardRsvpBtn.classList.add("btn-outline")
            } else {
              cardRsvpBtn.textContent = "RSVP"
              cardRsvpBtn.classList.remove("rsvp-active")
              cardRsvpBtn.classList.remove("btn-outline")
              cardRsvpBtn.classList.add("btn-primary")
            }
          }
          
          // In a real app, you would save this to the user's profile
          console.log(`Event ${eventId} ${this.textContent === "Cancel RSVP" ? "RSVP'd" : "RSVP canceled"} from modal`)
        })
      }
      
      // Close modal
      if (closeModal) {
        closeModal.addEventListener("click", () => {
          eventModal.style.display = "none"
        })
      }
      
      if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", () => {
          eventModal.style.display = "none"
        })
      }
      
      // Close modal when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === eventModal) {
          eventModal.style.display = "none"
        }
      })
    }
  
    // Search functionality
    if (eventSearchInput) {
      eventSearchInput.addEventListener("input", filterEvents)
    }
  
    // Apply filters button
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", filterEvents)
    }
  
    // Clear filters button
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        // Uncheck all filter checkboxes
        filterOptions.forEach((option) => {
          option.checked = false
        })
        
        // Clear search input
        if (eventSearchInput) {
          eventSearchInput.value = ""
        }
        
        // Show all events
        filterEvents()
      })
    }
  
    // Filter events based on search input and selected filters
    function filterEvents() {
      const searchTerm = eventSearchInput ? eventSearchInput.value.toLowerCase() : ""
      
      // Get selected filters
      const selectedFilters = {
        type: [],
        date: [],
        location: []
      }
      
      filterOptions.forEach((option) => {
        if (option.checked) {
          const filterType = option.name
          const filterValue = option.value
          selectedFilters[filterType].push(filterValue)
        }
      })
      
      let visibleCount = 0
      
      // Filter event cards
      eventCards.forEach((card) => {
        const eventTitle = card.querySelector("h3").textContent.toLowerCase()
        const eventDescription = card.querySelector(".event-description").textContent.toLowerCase()
        const eventOrganizer = card.querySelector(".event-details p:nth-child(4)").textContent.toLowerCase()
        
        const eventType = card.getAttribute("data-type")
        const eventDate = card.getAttribute("data-date")
        const eventLocation = card.getAttribute("data-location")
        
        // Check if event matches search term
        const matchesSearch = searchTerm === "" || 
          eventTitle.includes(searchTerm) || 
          eventDescription.includes(searchTerm) || 
          eventOrganizer.includes(searchTerm)
        
        // Check if event matches selected filters
        const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(eventType)
        const matchesDate = selectedFilters.date.length === 0 || selectedFilters.date.includes(eventDate)
        const matchesLocation = selectedFilters.location.length === 0 || selectedFilters.location.includes(eventLocation)
        
        // Show/hide event card
        if (matchesSearch && matchesType && matchesDate && matchesLocation) {
          card.style.display = "block"
          visibleCount++
        } else {
          card.style.display = "none"
        }
      })
      
      // Show/hide no results message
      if (visibleCount === 0) {
        noResults.style.display = "block"
      } else {
        noResults.style.display = "none"
      }
    }
  })
  