document.addEventListener("DOMContentLoaded", () => {
    // Network Activity Chart
    const networkActivityCtx = document.getElementById("networkActivityChart");
    
    if (networkActivityCtx) {
      const networkActivityChart = new Chart(networkActivityCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Profile Views",
              data: [12, 19, 15, 25, 22, 30],
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "New Connections",
              data: [5, 8, 7, 10, 12, 15],
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  
    // Profile completion tasks
    const taskItems = document.querySelectorAll(".task-item:not(.completed)");
    
    if (taskItems.length > 0) {
      taskItems.forEach((item) => {
        item.addEventListener("click", function () {
          this.classList.toggle("completed");
          
          if (this.classList.contains("completed")) {
            const icon = this.querySelector("i");
            icon.classList.remove("fa-circle");
            icon.classList.add("fa-check-circle");
            
            // Update progress bar
            updateProfileCompletion();
          }
        });
      });
    }
  
    function updateProfileCompletion() {
      const totalTasks = document.querySelectorAll(".task-item").length;
      const completedTasks = document.querySelectorAll(".task-item.completed").length;
      const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
      
      const progressBar = document.querySelector(".progress");
      const completionText = document.querySelector(".completion-text");
      
      if (progressBar && completionText) {
        progressBar.style.width = `${completionPercentage}%`;
        completionText.textContent = `${completionPercentage}% Complete`;
      }
    }
  
    // Stat cards hover effect
    const statCards = document.querySelectorAll(".stat-card");
    
    if (statCards.length > 0) {
      statCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-10px)";
        });
        
        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)";
        });
      });
    }
  
    // Message buttons
    const messageButtons = document.querySelectorAll(".connection-actions .btn");
    
    if (messageButtons.length > 0) {
      messageButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // In a real app, this would open a message modal or redirect to messages page
          window.location.href = "messages.html";
        });
      });
    }
  });