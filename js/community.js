document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const postInput = document.getElementById("postInput")
    const createPostBtn = document.getElementById("createPostBtn")
    const postsFeed = document.getElementById("postsFeed")
    const feedFilters = document.querySelectorAll(".feed-filter")
    const feedSort = document.getElementById("feedSort")
    const likeBtns = document.querySelectorAll(".like-btn")
    const commentBtns = document.querySelectorAll(".comment-btn")
    const shareBtns = document.querySelectorAll(".share-btn")
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    const connectBtns = document.querySelectorAll(".connect-btn")
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
  
    // Create post functionality
    if (createPostBtn && postInput) {
      createPostBtn.addEventListener("click", () => {
        const postText = postInput.value.trim()
        
        if (postText === "") {
          return
        }
        
        // Create new post element
        const newPost = document.createElement("div")
        newPost.className = "post-card"
        
        // Get current time
        const now = new Date()
        const timeString = "Just now"
        
        // Create post HTML
        newPost.innerHTML = `
          <div class="post-header">
            <div class="post-author">
              <div class="user-avatar-small">JS</div>
              <div class="author-info">
                <h4>John Smith</h4>
                <p>Computer Science Student • ${timeString}</p>
              </div>
            </div>
            <div class="post-menu">
              <button class="btn-icon">
                <i class="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
          <div class="post-content">
            <p>${postText}</p>
          </div>
          <div class="post-stats">
            <span><i class="fas fa-thumbs-up"></i> 0 likes</span>
            <span><i class="fas fa-comment"></i> 0 comments</span>
            <span><i class="fas fa-share"></i> 0 shares</span>
          </div>
          <div class="post-actions">
            <button class="post-action-btn like-btn" data-id="new">
              <i class="far fa-thumbs-up"></i>
              <span>Like</span>
            </button>
            <button class="post-action-btn comment-btn" data-id="new">
              <i class="far fa-comment"></i>
              <span>Comment</span>
            </button>
            <button class="post-action-btn share-btn" data-id="new">
              <i class="far fa-share-square"></i>
              <span>Share</span>
            </button>
          </div>
          <div class="post-comments">
            <div class="comment-input">
              <div class="user-avatar-small">JS</div>
              <input type="text" placeholder="Write a comment..." class="comment-text">
              <button class="btn-icon send-comment-btn">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        `
        
        // Add new post to the top of the feed
        postsFeed.insertBefore(newPost, postsFeed.firstChild)
        
        // Clear input
        postInput.value = ""
        
        // Add event listeners to new post buttons
        const newLikeBtn = newPost.querySelector(".like-btn")
        const newCommentBtn = newPost.querySelector(".comment-btn")
        const newShareBtn = newPost.querySelector(".share-btn")
        
        if (newLikeBtn) {
          newLikeBtn.addEventListener("click", handleLike)
        }
        
        if (newCommentBtn) {
          newCommentBtn.addEventListener("click", handleComment)
        }
        
        if (newShareBtn) {
          newShareBtn.addEventListener("click", handleShare)
        }
      })
    }
  
    // Feed filters functionality
    if (feedFilters.length > 0) {
      feedFilters.forEach((filter) => {
        filter.addEventListener("click", function () {
          // Remove active class from all filters
          feedFilters.forEach((f) => f.classList.remove("active"))
          
          // Add active class to clicked filter
          this.classList.add("active")
          
          const filterType = this.getAttribute("data-filter")
          
          // In a real app, you would filter posts based on the filter type
          console.log(`Selected filter: ${filterType}`)
        })
      })
    }
  
    // Feed sort functionality
    if (feedSort) {
      feedSort.addEventListener("change", function () {
        const sortType = this.value
        
        // In a real app, you would sort posts based on the sort type
        console.log(`Sorting by: ${sortType}`)
      })
    }
  
    // Like button functionality
    if (likeBtns.length > 0) {
      likeBtns.forEach((btn) => {
        btn.addEventListener("click", handleLike)
      })
    }
  
    function handleLike() {
      const postId = this.getAttribute("data-id")
      
      // Toggle like state
      if (this.innerHTML.includes("far fa-thumbs-up")) {
        this.innerHTML = '<i class="fas fa-thumbs-up"></i><span>Liked</span>'
        this.classList.add("active")
        
        // Update like count
        const likesElement = this.closest(".post-card").querySelector(".post-stats span:first-child")
        const currentLikes = parseInt(likesElement.textContent.match(/\d+/)[0])
        likesElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentLikes + 1} likes`
      } else {
        this.innerHTML = '<i class="far fa-thumbs-up"></i><span>Like</span>'
        this.classList.remove("active")
        
        // Update like count
        const likesElement = this.closest(".post-card").querySelector(".post-stats span:first-child")
        const currentLikes = parseInt(likesElement.textContent.match(/\d+/)[0])
        likesElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${currentLikes - 1} likes`
      }
      
      // In a real app, you would send this to the server
      console.log(`Post ${postId} ${this.classList.contains("active") ? "liked" : "unliked"}`)
    }
  
    // Comment button functionality
    if (commentBtns.length > 0) {
      commentBtns.forEach((btn) => {
        btn.addEventListener("click", handleComment)
      })
    }
  
    function handleComment() {
      const postId = this.getAttribute("data-id")
      const commentsSection = this.closest(".post-card").querySelector(".post-comments")
      const commentInput = commentsSection.querySelector(".comment-text")
      
      // Toggle comments visibility
      if (commentsSection.style.display === "none") {
        commentsSection.style.display = "block"
      }
      
      // Focus on comment input
      commentInput.focus()
      
      // In a real app, you would load comments from the server
      console.log(`Commenting on post ${postId}`)
    }
  
    // Share button functionality
    if (shareBtns.length > 0) {
      shareBtns.forEach((btn) => {
        btn.addEventListener("click", handleShare)
      })
    }
  
    function handleShare() {
      const postId = this.getAttribute("data-id")
      
      // In a real app, you would open a share dialog
      alert(`Sharing post ${postId}`)
      
      // Update share count
      const sharesElement = this.closest(".post-card").querySelector(".post-stats span:last-child")
      const currentShares = parseInt(sharesElement.textContent.match(/\d+/)[0])
      sharesElement.innerHTML = `<i class="fas fa-share"></i> ${currentShares + 1} shares`
    }
  
    // Load more button functionality
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", function () {
        // In a real app, you would load more posts from the server
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'
        
        // Simulate loading delay
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-sync"></i> Load More Posts'
          alert("No more posts to load")
        }, 1500)
      })
    }
  
    // Connect button functionality
    if (connectBtns.length > 0) {
      connectBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const userId = this.getAttribute("data-id")
          
          // Toggle connect state
          if (this.innerHTML.includes("Connect")) {
            this.innerHTML = '<i class="fas fa-check"></i> Connected'
            this.classList.add("connected")
          } else {
            this.innerHTML = '<i class="fas fa-user-plus"></i> Connect'
            this.classList.remove("connected")
          }
          
          // In a real app, you would send this to the server
          console.log(`User ${userId} ${this.classList.contains("connected") ? "connected" : "disconnected"}`)
        })
      })
    }
  
    // Comment input functionality
    const commentInputs = document.querySelectorAll(".comment-text")
    const sendCommentBtns = document.querySelectorAll(".send-comment-btn")
    
    if (commentInputs.length > 0 && sendCommentBtns.length > 0) {
      for (let i = 0; i < commentInputs.length; i++) {
        const input = commentInputs[i]
        const sendBtn = sendCommentBtns[i]
        
        // Send comment on Enter key
        input.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            sendComment(this)
          }
        })
        
        // Send comment on button click
        sendBtn.addEventListener("click", function () {
          const input = this.previousElementSibling
          sendComment(input)
        })
      }
    }
  
    function sendComment(input) {
      const commentText = input.value.trim()
      
      if (commentText === "") {
        return
      }
      
      const commentsSection = input.closest(".post-comments")
      let commentsList = commentsSection.querySelector(".comments-list")
      
      // Create comments list if it doesn't exist
      if (!commentsList) {
        commentsList = document.createElement("div")
        commentsList.className = "comments-list"
        commentsSection.appendChild(commentsList)
      }
      
      // Get current time
      const now = new Date()
      const timeString = "Just now"
      
      // Create new comment element
      const newComment = document.createElement("div")
      newComment.className = "comment-item"
      newComment.innerHTML = `
        <div class="user-avatar-small">JS</div>
        <div class="comment-content">
          <div class="comment-author">
            <h5>John Smith</h5>
            <span>${timeString}</span>
          </div>
          <p>${commentText}</p>
          <div class="comment-actions">
            <button class="btn-text">Like</button>
            <button class="btn-text">Reply</button>
          </div>
        </div>
      `
      
      // Add new comment to the list
      commentsList.appendChild(newComment)
      
      // Clear input
      input.value = ""
      
      // Update comment count
      const commentsElement = commentsSection.closest(".post-card").querySelector(".post-stats span:nth-child(2)")
      const currentComments = parseInt(commentsElement.textContent.match(/\d+/)[0])
      commentsElement.innerHTML = `<i class="fas fa-comment"></i> ${currentComments + 1} comments`
    }
  })

