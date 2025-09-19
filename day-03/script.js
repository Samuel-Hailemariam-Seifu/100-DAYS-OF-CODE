// Mobile Navigation Interactive Features
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const menuItems = document.querySelectorAll(".menu-item");
  const navItems = document.querySelectorAll(".nav-item");
  const profileImage = document.querySelector(".profile-image");

  // State variables
  let currentActiveNav = "profile";

  // Menu item click handlers
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      const action = this.getAttribute("data-action");
      handleMenuAction(action);

      // Add visual feedback
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });

    // Add hover effects
    item.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.backgroundColor = "#f8f9fa";
      }
    });

    item.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.backgroundColor = "transparent";
      }
    });
  });

  // Navigation item click handlers
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const navType = this.getAttribute("data-nav");
      handleNavigation(navType);

      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Profile image click handler
  profileImage.addEventListener("click", function () {
    showProfileModal();

    // Add pulse animation
    this.style.animation = "pulse 0.6s ease-in-out";
    setTimeout(() => {
      this.style.animation = "";
    }, 600);
  });

  // Handle menu actions
  function handleMenuAction(action) {
    switch (action) {
      case "personal-data":
        showNotification("Opening Personal Data...", "info");
        // In a real app, this would navigate to personal data page
        console.log("Navigate to Personal Data");
        break;

      case "messages":
        showNotification("Opening Messages...", "info");
        // In a real app, this would navigate to messages page
        console.log("Navigate to Messages");
        break;

      case "notifications":
        showNotification("Opening Notifications...", "info");
        // In a real app, this would navigate to notifications page
        console.log("Navigate to Notifications");
        break;

      case "location":
        showNotification("Opening Location Settings...", "info");
        // In a real app, this would navigate to location page
        console.log("Navigate to Location");
        break;

      case "community":
        showNotification("Opening Community...", "info");
        // In a real app, this would navigate to community page
        console.log("Navigate to Community");
        break;

      case "faqs":
        showNotification("Opening FAQs...", "info");
        // In a real app, this would navigate to FAQs page
        console.log("Navigate to FAQs");
        break;

      case "settings":
        showNotification("Opening Settings...", "info");
        // In a real app, this would navigate to settings page
        console.log("Navigate to Settings");
        break;

      default:
        console.log("Unknown action:", action);
    }
  }

  // Handle navigation
  function handleNavigation(navType) {
    // Remove active class from all nav items
    navItems.forEach((item) => {
      item.classList.remove("active");
    });

    // Add active class to clicked nav item
    const activeNavItem = document.querySelector(`[data-nav="${navType}"]`);
    if (activeNavItem) {
      activeNavItem.classList.add("active");
    }

    currentActiveNav = navType;

    // Show navigation feedback
    switch (navType) {
      case "home":
        showNotification("Navigating to Home...", "success");
        break;
      case "analytics":
        showNotification("Navigating to Analytics...", "success");
        break;
      case "messages":
        showNotification("Navigating to Messages...", "success");
        break;
      case "profile":
        showNotification("Already on Profile page", "info");
        break;
    }

    console.log("Navigate to:", navType);
  }

  // Show profile modal
  function showProfileModal() {
    // Create modal element
    const modal = document.createElement("div");
    modal.className = "profile-modal";
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Profile Information</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-profile">
                             <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face" 
                                  alt="Lisa Richardson" class="modal-profile-image"
                                  onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjYwIiBmaWxsPSIjRjBGNEYzIi8+CjxzdmcgeD0iMzAiIHk9IjMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAxMkMxNC4yMSAxMiAxNiAxMC4yMSAxNiA4QzE2IDUuNzkgMTQuMjEgNCAxMiA0QzkuNzkgNCA4IDUuNzkgOCA4QzggMTAuMjEgOS43OSAxMiAxMiAxMloiIGZpbGw9IiM5OTk5OTkiLz4KPHBhdGggZD0iTTEyIDE0QzguNjkgMTQgNiAxNi42OSA2IDIwSDE4QzE4IDE2LjY5IDE1LjMxIDE0IDEyIDE0WiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4KPC9zdmc+Cg=='"
                            <div class="modal-profile-info">
                                <h4>Lisa Richardson</h4>
                                <p>Environmental meteorologist</p>
                                <p class="modal-profile-details">
                                    Specializing in climate research and weather pattern analysis. 
                                    Passionate about environmental conservation and sustainable practices.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" id="editProfile">Edit Profile</button>
                        <button class="btn btn-primary" id="viewFullProfile">View Full Profile</button>
                    </div>
                </div>
            </div>
        `;

    // Add modal styles
    const modalStyles = `
            .profile-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                border-radius: 16px;
                max-width: 400px;
                width: 100%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 20px 0;
            }
            
            .modal-header h3 {
                font-size: 18px;
                font-weight: 600;
                color: #333;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: #f0f0f0;
                color: #333;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-profile {
                display: flex;
                gap: 16px;
                align-items: flex-start;
            }
            
            .modal-profile-image {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #f0f0f0;
            }
            
            .modal-profile-info h4 {
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-bottom: 4px;
            }
            
            .modal-profile-info p {
                font-size: 14px;
                color: #666;
                margin-bottom: 8px;
            }
            
            .modal-profile-details {
                font-size: 13px;
                color: #888;
                line-height: 1.4;
            }
            
            .modal-actions {
                display: flex;
                gap: 12px;
                padding: 0 20px 20px;
            }
            
            .btn {
                flex: 1;
                padding: 12px 16px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .btn-secondary {
                background: #f0f0f0;
                color: #333;
            }
            
            .btn-secondary:hover {
                background: #e0e0e0;
            }
            
            .btn-primary {
                background: #1a73e8;
                color: white;
            }
            
            .btn-primary:hover {
                background: #1557b0;
            }
        `;

    // Add styles to head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);

    // Add modal to body
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    // Close modal handlers
    const closeModal = () => {
      modal.remove();
      styleSheet.remove();
      document.body.style.overflow = "auto";
    };

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal
      .querySelector(".modal-overlay")
      .addEventListener("click", function (e) {
        if (e.target === this) {
          closeModal();
        }
      });

    // Modal action handlers
    modal.querySelector("#editProfile").addEventListener("click", function () {
      showNotification("Opening Profile Editor...", "info");
      closeModal();
    });

    modal
      .querySelector("#viewFullProfile")
      .addEventListener("click", function () {
        showNotification("Opening Full Profile...", "info");
        closeModal();
      });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });
  }

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
            left: 50%;
            transform: translateX(-50%);
            background: ${
              type === "success"
                ? "#4caf50"
                : type === "error"
                ? "#f44336"
                : "#2196f3"
            };
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            font-weight: 500;
            font-size: 14px;
            max-width: 300px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
    }, 100);

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Add pulse animation
  const pulseKeyframes = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;

  const pulseStyle = document.createElement("style");
  pulseStyle.textContent = pulseKeyframes;
  document.head.appendChild(pulseStyle);

  // Handle image loading
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    profileImage.addEventListener("error", function () {
      // Fallback to a different image source
      this.src = "https://via.placeholder.com/80x80/E0F4F3/999999?text=LR";
      this.onerror = function () {
        // Final fallback to SVG
        this.style.display = "none";
        this.parentNode.innerHTML = `
          <div class="profile-image-fallback">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="#E0F4F3"/>
              <svg x="15" y="15" width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z" fill="#999999"/>
                <path d="M12 14C8.69 14 6 16.69 6 20H18C18 16.69 15.31 14 12 14Z" fill="#999999"/>
              </svg>
            </svg>
          </div>
        `;
      };
    });
  }

  // Initialize page
  console.log("Mobile Navigation loaded successfully!");
  console.log("Current active navigation:", currentActiveNav);

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = "smooth";

  // Add touch feedback for mobile devices
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");

    // Add touch-specific styles
    const touchStyles = `
            .touch-device .menu-item:active {
                background-color: #e0e0e0;
                transform: scale(0.98);
            }
            
            .touch-device .nav-item:active {
                transform: scale(0.95);
            }
        `;

    const touchStyleSheet = document.createElement("style");
    touchStyleSheet.textContent = touchStyles;
    document.head.appendChild(touchStyleSheet);
  }
});

// Additional utility functions
function formatUserData(user) {
  return {
    name: user.name || "Unknown User",
    role: user.role || "User",
    avatar: user.avatar || "https://via.placeholder.com/80x80",
  };
}

function validateMenuAction(action) {
  const validActions = [
    "personal-data",
    "messages",
    "notifications",
    "location",
    "community",
    "faqs",
    "settings",
  ];
  return validActions.includes(action);
}

// Export functions for potential use in other scripts
window.MobileNavigation = {
  formatUserData,
  validateMenuAction,
};
