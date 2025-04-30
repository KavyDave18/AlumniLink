document.addEventListener("DOMContentLoaded", () => {
    // Get all edit buttons
    const editButtons = document.querySelectorAll(".edit-btn");
    const addButtons = document.querySelectorAll(".add-btn");
    
    // Handle edit button clicks
    editButtons.forEach(button => {
      button.addEventListener("click", function() {
        const section = this.closest(".profile-card");
        const sectionTitle = section.querySelector("h3").textContent;
        
        // Toggle edit mode
        if (section.classList.contains("editing")) {
          // Save changes
          section.classList.remove("editing");
          this.innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
          
          // Here you would typically send the updated data to the server
          showNotification(`${sectionTitle} updated successfully!`);
        } else {
          // Enter edit mode
          section.classList.add("editing");
          this.innerHTML = '<i class="fas fa-save"></i> Save';
          
          // Create edit form based on section type
          createEditForm(section);
        }
      });
    });
    
    // Handle add buttons
    addButtons.forEach(button => {
      button.addEventListener("click", function() {
        const section = this.closest(".profile-card");
        const sectionType = section.querySelector("h3").textContent.toLowerCase();
        
        // Show add form modal
        showAddModal(sectionType);
      });
    });
    
    // Create edit form based on section type
    function createEditForm(section) {
      const sectionType = section.querySelector("h3").textContent.toLowerCase();
      const contentArea = section.querySelector(".card-content") || section;
      const originalContent = contentArea.innerHTML;
      
      // Store original content for cancel operation
      contentArea.dataset.originalContent = originalContent;
      
      // Create different forms based on section type
      let formHTML = '';
      
      if (sectionType.includes("about")) {
        const aboutText = section.querySelector("p").textContent;
        formHTML = `
          <div class="edit-form">
            <textarea class="edit-textarea" rows="5">${aboutText}</textarea>
            <div class="form-actions">
              <button class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
              <button class="save-btn"><i class="fas fa-save"></i> Save</button>
            </div>
          </div>
        `;
      } else if (sectionType.includes("skills")) {
        const skills = Array.from(section.querySelectorAll(".skill-tag")).map(skill => skill.textContent);
        formHTML = `
          <div class="edit-form">
            <p class="form-label">Skills (comma separated)</p>
            <input type="text" class="edit-input" value="${skills.join(", ")}">
            <div class="form-actions">
              <button class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
              <button class="save-btn"><i class="fas fa-save"></i> Save</button>
            </div>
          </div>
        `;
      } else if (sectionType.includes("education")) {
        const school = section.querySelector("h4")?.textContent || "";
        const degree = section.querySelector(".edu-details p")?.textContent || "";
        const years = section.querySelector(".edu-date")?.textContent || "";
        
        formHTML = `
          <div class="edit-form">
            <div class="form-group">
              <label>School/University</label>
              <input type="text" class="edit-input" value="${school}">
            </div>
            <div class="form-group">
              <label>Degree</label>
              <input type="text" class="edit-input" value="${degree}">
            </div>
            <div class="form-group">
              <label>Years</label>
              <input type="text" class="edit-input" value="${years}">
            </div>
            <div class="form-actions">
              <button class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
              <button class="save-btn"><i class="fas fa-save"></i> Save</button>
            </div>
          </div>
        `;
      } else if (sectionType.includes("experience")) {
        // Create form for experience section
        formHTML = createExperienceEditForm(section);
      } else if (sectionType.includes("projects")) {
        // Create form for projects section
        formHTML = createProjectsEditForm(section);
      } else if (sectionType.includes("languages")) {
        // Create form for languages section
        formHTML = createLanguagesEditForm(section);
      }
      
      // Replace content with form
      if (formHTML) {
        contentArea.innerHTML = formHTML;
        
        // Add event listeners to new buttons
        const cancelBtn = contentArea.querySelector(".cancel-btn");
        const saveBtn = contentArea.querySelector(".save-btn");
        
        if (cancelBtn) {
          cancelBtn.addEventListener("click", () => {
            contentArea.innerHTML = contentArea.dataset.originalContent;
            section.classList.remove("editing");
            section.querySelector(".edit-btn").innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
          });
        }
        
        if (saveBtn) {
          saveBtn.addEventListener("click", () => {
            saveChanges(section, sectionType);
          });
        }
      }
    }
    
    // Create edit form for experience section
    function createExperienceEditForm(section) {
      const experiences = section.querySelectorAll(".experience-item");
      let formHTML = '<div class="edit-form">';
      
      experiences.forEach((exp, index) => {
        const role = exp.querySelector("h4")?.textContent || "";
        const company = exp.querySelector(".company")?.textContent || "";
        const period = exp.querySelector(".exp-date")?.textContent || "";
        const location = exp.querySelector(".exp-location")?.textContent || "";
        const description = exp.querySelector(".exp-description")?.textContent || "";
        
        formHTML += `
          <div class="experience-edit-item">
            <h4>Experience ${index + 1}</h4>
            <div class="form-group">
              <label>Role</label>
              <input type="text" class="edit-input" name="role-${index}" value="${role}">
            </div>
            <div class="form-group">
              <label>Company</label>
              <input type="text" class="edit-input" name="company-${index}" value="${company}">
            </div>
            <div class="form-group">
              <label>Period</label>
              <input type="text" class="edit-input" name="period-${index}" value="${period}">
            </div>
            <div class="form-group">
              <label>Location</label>
              <input type="text" class="edit-input" name="location-${index}" value="${location}">
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea class="edit-textarea" name="description-${index}" rows="3">${description}</textarea>
            </div>
          </div>
        `;
      });
      
      formHTML += `
        <div class="form-actions">
          <button class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
          <button class="save-btn"><i class="fas fa-save"></i> Save</button>
        </div>
      </div>`;
      
      return formHTML;
    }
    
    // Create edit form for projects section
    function createProjectsEditForm(section) {
      const projects = section.querySelectorAll(".project-item");
      let formHTML = '<div class="edit-form">';
      
      projects.forEach((project, index) => {
        const title = project.querySelector("h4")?.textContent || "";
        const description = project.querySelector("p")?.textContent || "";
        
        formHTML += `
          <div class="project-edit-item">
            <h4>Project ${index + 1}</h4>
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="edit-input" name="title-${index}" value="${title}">
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea class="edit-textarea" name="description-${index}" rows="3">${description}</textarea>
            </div>
            <div class="form-group">
              <label>Project Image</label>
              <input type="file" class="edit-file" name="image-${index}">
            </div>
          </div>
        `;
      });
      
      formHTML += `
        <div class="form-actions">
          <button class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
          <button class="save-btn"><i class="fas fa-save"></i> Save</button>
        </div>
      </div>`;
      
      return formHTML;
    }
    
    // Create edit form for languages section
    function createLanguagesEditForm(section) {
      const languages = section.querySelectorAll(".language-item");
      let formHTML = '<div class="edit-form">';
      
      languages.forEach((lang, index) => {
        const language = lang.querySelector("span:first-child")?.textContent || "";
        const level = lang.querySelector(".level-fill")?.style.width || "0%";
        const levelText = lang.querySelector(".level-text")?.textContent || "";
        
        formHTML += `
          <div class="language-edit-item">
            <div class="form-group">
              <label>Language</label>
              <input type="text" class="edit-input" name="language-${index}" value="${language}">
            </div>
            <div class="form-group">
              <label>Proficiency (${levelText})</label>
              <input type="range" class="edit-range" name="level-${index}" min="0" max="100" value="${parseInt(level)}">
            </div>
          </div>
        `;
      });
      
      formHTML += `
        <div class="form-actions">
          <button class="cancel-btn"><i class="fas fa-times"></i> Cancel</button>
          <button class="save-btn"><i class="fas fa-save"></i> Save</button>
        </div>
      </div>`;
      
      return formHTML;
    }
    
    // Save changes from edit form
    function saveChanges(section, sectionType) {
      // In a real app, you would send the data to the server here
      // For this demo, we'll just update the UI
      
      const form = section.querySelector(".edit-form");
      
      if (sectionType.includes("about")) {
        const newText = form.querySelector(".edit-textarea").value;
        section.querySelector("p").textContent = newText;
      } else if (sectionType.includes("skills")) {
        const skillsInput = form.querySelector(".edit-input").value;
        const skills = skillsInput.split(",").map(skill => skill.trim());
        
        let skillsHTML = '';
        skills.forEach(skill => {
          skillsHTML += `<span class="skill-tag">${skill}</span>`;
        });
        
        section.querySelector(".skills-list").innerHTML = skillsHTML;
      }
      
      // Reset section state
      section.classList.remove("editing");
      section.querySelector(".edit-btn").innerHTML = '<i class="fas fa-pencil-alt"></i> Edit';
      
      // Show success notification
      showNotification(`${sectionType} updated successfully!`);
    }
    
    // Show add modal
    function showAddModal(type) {
      // Create modal HTML based on type
      let modalHTML = `
        <div class="modal-overlay">
          <div class="modal">
            <div class="modal-header">
              <h3>Add ${type}</h3>
              <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-content">
      `;
      
      // Different form fields based on type
      if (type.includes("experience")) {
        modalHTML += `
          <div class="form-group">
            <label>Role/Position</label>
            <input type="text" class="modal-input" name="role">
          </div>
          <div class="form-group">
            <label>Company</label>
            <input type="text" class="modal-input" name="company">
          </div>
          <div class="form-group">
            <label>Period</label>
            <input type="text" class="modal-input" name="period" placeholder="e.g., Jan 2021 - Present">
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" class="modal-input" name="location">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="modal-textarea" name="description" rows="3"></textarea>
          </div>
        `;
      } else if (type.includes("project")) {
        modalHTML += `
          <div class="form-group">
            <label>Project Title</label>
            <input type="text" class="modal-input" name="title">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea class="modal-textarea" name="description" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>Technologies Used (comma separated)</label>
            <input type="text" class="modal-input" name="technologies">
          </div>
          <div class="form-group">
            <label>Project Link</label>
            <input type="text" class="modal-input" name="link">
          </div>
          <div class="form-group">
            <label>Project Image</label>
            <input type="file" class="modal-file" name="image">
          </div>
        `;
      } else if (type.includes("education")) {
        modalHTML += `
          <div class="form-group">
            <label>School/University</label>
            <input type="text" class="modal-input" name="school">
          </div>
          <div class="form-group">
            <label>Degree</label>
            <input type="text" class="modal-input" name="degree">
          </div>
          <div class="form-group">
            <label>Years</label>
            <input type="text" class="modal-input" name="years" placeholder="e.g., 2018 - 2022">
          </div>
          <div class="form-group">
            <label>Courses (comma separated)</label>
            <input type="text" class="modal-input" name="courses">
          </div>
        `;
      }
      
      modalHTML += `
            </div>
            <div class="modal-footer">
              <button class="modal-cancel">Cancel</button>
              <button class="modal-save">Save</button>
            </div>
          </div>
        </div>
      `;
      
      // Add modal to the page
      const modalElement = document.createElement("div");
      modalElement.innerHTML = modalHTML;
      document.body.appendChild(modalElement);
      
      // Add event listeners
      const modalOverlay = document.querySelector(".modal-overlay");
      const closeBtn = document.querySelector(".modal-close");
      const cancelBtn = document.querySelector(".modal-cancel");
      const saveBtn = document.querySelector(".modal-save");
      
      const closeModal = () => {
        document.body.removeChild(modalElement);
      };
      
      closeBtn.addEventListener("click", closeModal);
      cancelBtn.addEventListener("click", closeModal);
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
      });
      
      saveBtn.addEventListener("click", () => {
        // In a real app, you would save the data to the server
        // For this demo, we'll just show a notification
        showNotification(`New ${type} added successfully!`);
        closeModal();
      });
    }
    
    // Show notification
    function showNotification(message) {
      // Create notification element
      const notification = document.createElement("div");
      notification.className = "notification";
      notification.innerHTML = `
        <div class="notification-content">
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
        </div>
      `;
      
      // Add to page
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);
      
      // Remove after delay
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }
  });
  