document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const jobSearchInput = document.getElementById("jobSearchInput")
    const jobsList = document.getElementById("jobsList")
    const jobItems = document.querySelectorAll(".job-item")
    const noResults = document.getElementById("noResults")
    const applyFiltersBtn = document.getElementById("applyFiltersBtn")
    const clearFiltersBtn = document.getElementById("clearFiltersBtn")
    const filterOptions = document.querySelectorAll(".job-filter")
    const saveJobBtns = document.querySelectorAll(".save-job-btn")
    const profileDropdownBtn = document.getElementById("profileDropdownBtn")
    const profileDropdown = document.getElementById("profileDropdown")
  
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
  
    // Save job functionality
    if (saveJobBtns.length > 0) {
      saveJobBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const jobId = this.getAttribute("data-id")
          
          // Toggle saved state
          if (this.innerHTML.includes("Save Job")) {
            this.innerHTML = '<i class="fas fa-bookmark"></i> Saved'
            this.classList.add("saved")
          } else {
            this.innerHTML = '<i class="far fa-bookmark"></i> Save Job'
            this.classList.remove("saved")
          }
          
          // In a real app, you would save this to the user's profile
          console.log(`Job ${jobId} ${this.classList.contains("saved") ? "saved" : "removed"}`)
        })
      })
    }
  
    // Search functionality
    if (jobSearchInput) {
      jobSearchInput.addEventListener("input", filterJobs)
    }
  
    // Apply filters button
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", filterJobs)
    }
  
    // Clear filters button
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        // Uncheck all filter checkboxes
        filterOptions.forEach((option) => {
          option.checked = false
        })
        
        // Clear search input
        if (jobSearchInput) {
          jobSearchInput.value = ""
        }
        
        // Show all jobs
        filterJobs()
      })
    }
  
    // Filter jobs based on search input and selected filters
    function filterJobs() {
      const searchTerm = jobSearchInput ? jobSearchInput.value.toLowerCase() : ""
      
      // Get selected filters
      const selectedFilters = {
        type: [],
        location: [],
        poster: []
      }
      
      filterOptions.forEach((option) => {
        if (option.checked) {
          const filterType = option.name
          const filterValue = option.value
          selectedFilters[filterType].push(filterValue)
        }
      })
      
      let visibleCount = 0
      
      // Filter job items
      jobItems.forEach((item) => {
        const jobTitle = item.querySelector("h2").textContent.toLowerCase()
        const jobCompany = item.querySelector(".job-company").textContent.toLowerCase()
        const jobDescription = item.querySelector(".job-description p").textContent.toLowerCase()
        
        const jobType = item.getAttribute("data-type")
        const jobLocation = item.getAttribute("data-location")
        const jobPoster = item.getAttribute("data-poster")
        
        // Check if job matches search term
        const matchesSearch = searchTerm === "" || 
          jobTitle.includes(searchTerm) || 
          jobCompany.includes(searchTerm) || 
          jobDescription.includes(searchTerm)
        
        // Check if job matches selected filters
        const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(jobType)
        const matchesLocation = selectedFilters.location.length === 0 || selectedFilters.location.includes(jobLocation)
        const matchesPoster = selectedFilters.poster.length === 0 || selectedFilters.poster.includes(jobPoster)
        
        // Show/hide job item
        if (matchesSearch && matchesType && matchesLocation && matchesPoster) {
          item.style.display = "block"
          visibleCount++
        } else {
          item.style.display = "none"
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
  