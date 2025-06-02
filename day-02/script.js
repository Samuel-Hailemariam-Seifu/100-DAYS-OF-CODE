// Product Page Interactive Features
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const mainImage = document.getElementById("mainImage");
  const zoomOverlay = document.getElementById("zoomOverlay");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const sizeOptions = document.querySelectorAll(".size-option");
  const colorOptions = document.querySelectorAll(".color-option");
  const decreaseQty = document.getElementById("decreaseQty");
  const increaseQty = document.getElementById("increaseQty");
  const quantityDisplay = document.getElementById("quantityDisplay");
  const addToBagBtn = document.getElementById("addToBagBtn");
  const wishlistBtn = document.getElementById("wishlistBtn");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");
  const continueShopping = document.getElementById("continueShopping");
  const viewBag = document.getElementById("viewBag");

  // State variables
  let currentQuantity = 1;
  let selectedSize = "M";
  let selectedColor = "navy";
  let isWishlisted = false;

  // Image zoom functionality
  mainImage.addEventListener("click", function () {
    zoomOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  zoomOverlay.addEventListener("click", function (e) {
    if (e.target === zoomOverlay) {
      zoomOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Thumbnail image switching
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Remove active class from all thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Update main image
      const mainSrc = this.getAttribute("data-main");
      const zoomSrc = this.getAttribute("data-zoom");
      const color = this.getAttribute("data-color");

      mainImage.src = mainSrc;
      mainImage.alt = this.alt;

      // Update zoom image
      const zoomedImage = zoomOverlay.querySelector(".zoomed-image");
      zoomedImage.src = zoomSrc;
      zoomedImage.alt = this.alt;

      // Update selected color
      selectedColor = color;
    });
  });

  // Size selection
  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all size options
      sizeOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");

      // Update selected size
      selectedSize = this.getAttribute("data-size");

      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Color selection
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all color options
      colorOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");

      // Update selected color
      selectedColor = this.getAttribute("data-color");

      // Add visual feedback
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Quantity controls
  decreaseQty.addEventListener("click", function () {
    if (currentQuantity > 1) {
      currentQuantity--;
      updateQuantityDisplay();
      addButtonAnimation(this);
    }
  });

  increaseQty.addEventListener("click", function () {
    if (currentQuantity < 10) {
      currentQuantity++;
      updateQuantityDisplay();
      addButtonAnimation(this);
    }
  });

  function updateQuantityDisplay() {
    quantityDisplay.textContent = currentQuantity;
  }

  function addButtonAnimation(button) {
    button.style.transform = "scale(0.9)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 150);
  }

  // Add to bag functionality
  addToBagBtn.addEventListener("click", function () {
    // Add loading state
    this.classList.add("loading");
    this.querySelector(".btn-text").textContent = "Adding...";

    // Simulate API call
    setTimeout(() => {
      // Remove loading state
      this.classList.remove("loading");
      this.querySelector(".btn-text").textContent = "Add to Bag";

      // Show success modal
      showSuccessModal();

      // Add to bag animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    }, 1500);
  });

  // Wishlist functionality
  wishlistBtn.addEventListener("click", function () {
    isWishlisted = !isWishlisted;

    if (isWishlisted) {
      this.classList.add("active");
      this.querySelector(".btn-icon").textContent = "❤️";
      showNotification("Added to wishlist!", "success");
    } else {
      this.classList.remove("active");
      this.querySelector(".btn-icon").textContent = "♡";
      showNotification("Removed from wishlist", "info");
    }

    // Add animation
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // Success modal functionality
  function showSuccessModal() {
    // Update modal content
    document.getElementById("modalSize").textContent = selectedSize;
    const colorNames = {
      navy: "Navy Blue",
      gray: "Gray",
      "dark-gray": "Dark Gray",
    };
    document.getElementById("modalColor").textContent =
      colorNames[selectedColor] || selectedColor;
    document.getElementById("modalQuantity").textContent = currentQuantity;

    // Show modal
    successModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close modal
  closeModal.addEventListener("click", closeModalFunction);
  continueShopping.addEventListener("click", closeModalFunction);

  function closeModalFunction() {
    successModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // View bag functionality
  viewBag.addEventListener("click", function () {
    showNotification("Redirecting to shopping bag...", "info");
    closeModalFunction();

    // In a real app, this would redirect to the cart page
    console.log("Redirecting to shopping bag");
  });

  // Close modal when clicking outside
  successModal.addEventListener("click", function (e) {
    if (e.target === successModal) {
      closeModalFunction();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (successModal.classList.contains("active")) {
        closeModalFunction();
      }
      if (zoomOverlay.classList.contains("active")) {
        zoomOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    }
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
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
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

  // Image lazy loading simulation
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    // Set initial opacity for smooth loading
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll(
    "button, .thumbnail, .size-option, .color-option"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      if (
        !this.classList.contains("selected") &&
        !this.classList.contains("active")
      ) {
        this.style.transform = "translateY(-2px)";
      }
    });

    element.addEventListener("mouseleave", function () {
      if (
        !this.classList.contains("selected") &&
        !this.classList.contains("active")
      ) {
        this.style.transform = "translateY(0)";
      }
    });
  });

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = "smooth";

  // Initialize page
  console.log("Product page loaded successfully!");
  console.log("Selected size:", selectedSize);
  console.log("Selected color:", selectedColor);
  console.log("Quantity:", currentQuantity);
});

// Additional utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function validateForm() {
  // In a real application, you would validate the form here
  return true;
}

// Export functions for potential use in other scripts
window.ProductPage = {
  formatPrice,
  validateForm,
};
