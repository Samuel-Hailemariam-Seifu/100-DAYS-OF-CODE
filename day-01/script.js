// Profile Card Interactive Features
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const followBtn = document.getElementById("followBtn");
  const messageBtn = document.getElementById("messageBtn");
  const profileImage = document.querySelector(".profile-image");
  const socialLinks = document.querySelectorAll(".social-link");

  // Follow button functionality
  let isFollowing = false;

  followBtn.addEventListener("click", function () {
    if (!isFollowing) {
      // Start following
      followBtn.classList.add("loading");
      followBtn.textContent = "";

      // Simulate API call
      setTimeout(() => {
        followBtn.classList.remove("loading");
        followBtn.textContent = "Following";
        followBtn.style.background = "#48bb78";
        followBtn.style.boxShadow = "0 4px 15px rgba(72, 187, 120, 0.3)";
        isFollowing = true;

        // Show success message
        showNotification("Successfully followed!", "success");
      }, 1500);
    } else {
      // Unfollow
      followBtn.textContent = "Follow";
      followBtn.style.background =
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      followBtn.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
      isFollowing = false;

      // Show unfollow message
      showNotification("Unfollowed", "info");
    }
  });

  // Message button functionality
  messageBtn.addEventListener("click", function () {
    messageBtn.classList.add("loading");
    messageBtn.textContent = "";

    // Simulate opening message modal
    setTimeout(() => {
      messageBtn.classList.remove("loading");
      messageBtn.textContent = "Message";

      // Show message modal
      showMessageModal();
    }, 1000);
  });

  // Profile image click effect
  profileImage.addEventListener("click", function () {
    // Add pulse effect
    profileImage.style.transform = "scale(1.1)";
    profileImage.style.boxShadow = "0 0 20px rgba(102, 126, 234, 0.5)";

    setTimeout(() => {
      profileImage.style.transform = "scale(1)";
      profileImage.style.boxShadow = "none";
    }, 300);

    // Show profile view modal
    showProfileModal();
  });

  // Social links functionality
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const platform = this.getAttribute("aria-label");

      // Add click animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);

      // Show platform-specific message
      showNotification(`Opening ${platform}...`, "info");

      // In a real app, this would open the actual social media profile
      console.log(`Opening ${platform} profile`);
    });
  });

  // Add hover effects to profile card
  const profileCard = document.querySelector(".profile-card");

  profileCard.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px)";
  });

  profileCard.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#48bb78"
            : type === "error"
            ? "#f56565"
            : "#667eea"
        };
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 3000);
}

// Message Modal
function showMessageModal() {
  // Remove existing modal
  const existingModal = document.querySelector(".modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Send Message</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <textarea placeholder="Type your message here..." rows="4"></textarea>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary modal-cancel">Cancel</button>
                <button class="btn btn-primary modal-send">Send</button>
            </div>
        </div>
    `;

  // Add modal styles
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 0;
        max-width: 400px;
        width: 90%;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

  const modalHeader = modal.querySelector(".modal-header");
  modalHeader.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

  const modalBody = modal.querySelector(".modal-body");
  modalBody.style.cssText = `
        padding: 20px;
    `;

  const textarea = modal.querySelector("textarea");
  textarea.style.cssText = `
        width: 100%;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px;
        font-family: inherit;
        font-size: 14px;
        resize: vertical;
        outline: none;
        transition: border-color 0.3s ease;
    `;

  const modalFooter = modal.querySelector(".modal-footer");
  modalFooter.style.cssText = `
        padding: 20px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    `;

  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #718096;
    `;

  document.body.appendChild(modal);

  // Animate in
  setTimeout(() => {
    modal.style.opacity = "1";
    modalContent.style.transform = "scale(1)";
  }, 100);

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  modal.querySelector(".modal-cancel").addEventListener("click", closeModal);
  modal.querySelector(".modal-send").addEventListener("click", sendMessage);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // Focus textarea
  textarea.focus();

  function closeModal() {
    modal.style.opacity = "0";
    modalContent.style.transform = "scale(0.9)";
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 300);
  }

  function sendMessage() {
    const message = textarea.value.trim();
    if (message) {
      showNotification("Message sent successfully!", "success");
      closeModal();
    } else {
      textarea.style.borderColor = "#f56565";
      setTimeout(() => {
        textarea.style.borderColor = "#e2e8f0";
      }, 2000);
    }
  }
}

// Profile Modal
function showProfileModal() {
  // Remove existing modal
  const existingModal = document.querySelector(".profile-modal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create modal
  const modal = document.createElement("div");
  modal.className = "profile-modal";
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Profile View</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                     alt="Profile Picture" 
                     style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; display: block;">
                <p style="text-align: center; color: #4a5568; line-height: 1.6;">
                    This is a larger view of the profile picture. In a real application, 
                    this could show more profile details, photo gallery, or other information.
                </p>
            </div>
        </div>
    `;

  // Add modal styles (similar to message modal)
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const modalContent = modal.querySelector(".modal-content");
  modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 0;
        max-width: 400px;
        width: 90%;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

  const modalHeader = modal.querySelector(".modal-header");
  modalHeader.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;

  const modalBody = modal.querySelector(".modal-body");
  modalBody.style.cssText = `
        padding: 20px;
    `;

  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #718096;
    `;

  document.body.appendChild(modal);

  // Animate in
  setTimeout(() => {
    modal.style.opacity = "1";
    modalContent.style.transform = "scale(1)";
  }, 100);

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.opacity = "0";
    modalContent.style.transform = "scale(0.9)";
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 300);
  }
}

// Add keyboard navigation support
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal, .profile-modal");
    if (modal) {
      const closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.click();
    }
  }
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = "smooth";
