// Contact Us Form Interactive Features
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");
  const modalOk = document.getElementById("modalOk");
  const submitBtn = contactForm.querySelector(".submit-btn");

  // Form validation state
  let isSubmitting = false;

  // Form submission handler
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    // Validate form
    if (validateForm()) {
      submitForm();
    }
  });

  // Real-time form validation
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearFieldError(this);
    });
  });

  // Modal handlers
  closeModal.addEventListener("click", closeModalFunction);
  modalOk.addEventListener("click", closeModalFunction);

  // Close modal when clicking outside
  successModal.addEventListener("click", function (e) {
    if (e.target === successModal) {
      closeModalFunction();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && successModal.classList.contains("show")) {
      closeModalFunction();
    }
  });

  // Form validation function
  function validateForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    // Validate email format
    const emailField = contactForm.querySelector("#email");
    if (emailField.value && !isValidEmail(emailField.value)) {
      showFieldError(emailField, "Please enter a valid email address");
      isValid = false;
    }

    // Validate phone format if provided
    const phoneField = contactForm.querySelector("#phone");
    if (phoneField.value && !isValidPhone(phoneField.value)) {
      showFieldError(phoneField, "Please enter a valid phone number");
      isValid = false;
    }

    return isValid;
  }

  // Validate individual field
  function validateField(field) {
    const value = field.value.trim();

    if (field.hasAttribute("required") && !value) {
      showFieldError(field, "This field is required");
      return false;
    }

    if (field.type === "email" && value && !isValidEmail(value)) {
      showFieldError(field, "Please enter a valid email address");
      return false;
    }

    if (field.type === "tel" && value && !isValidPhone(value)) {
      showFieldError(field, "Please enter a valid phone number");
      return false;
    }

    clearFieldError(field);
    return true;
  }

  // Show field error
  function showFieldError(field, message) {
    clearFieldError(field);

    field.classList.add("error");
    field.style.borderColor = "#EF4444";

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
            color: #EF4444;
            font-size: 12px;
            margin-top: 4px;
            display: block;
        `;

    field.parentNode.appendChild(errorDiv);
  }

  // Clear field error
  function clearFieldError(field) {
    field.classList.remove("error");
    field.style.borderColor = "";

    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
  }

  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation
  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  }

  // Submit form
  function submitForm() {
    isSubmitting = true;

    // Update button state
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    submitBtn.style.background = "#9ca3af";

    // Simulate API call
    setTimeout(() => {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      submitBtn.style.background = "#EC4899";

      // Show success modal
      showSuccessModal();

      // Reset form
      contactForm.reset();

      isSubmitting = false;
    }, 2000);
  }

  // Show success modal
  function showSuccessModal() {
    successModal.classList.add("show");
    document.body.style.overflow = "hidden";

    // Add animation to modal content
    const modalContent = successModal.querySelector(".modal-content");
    modalContent.style.animation = "fadeIn 0.3s ease-out";
  }

  // Close modal function
  function closeModalFunction() {
    successModal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  // Add form field animations
  const formGroups = contactForm.querySelectorAll(".form-group");
  formGroups.forEach((group, index) => {
    group.style.animation = `fadeIn 0.6s ease-out ${index * 0.1}s both`;
  });

  // Add hover effects to form inputs
  const formInputs = contactForm.querySelectorAll(
    ".form-input, .form-textarea"
  );
  formInputs.forEach((input) => {
    input.addEventListener("mouseenter", function () {
      if (!this.classList.contains("error")) {
        this.style.borderColor = "#8B5CF6";
      }
    });

    input.addEventListener("mouseleave", function () {
      if (!this.classList.contains("error") && !this.matches(":focus")) {
        this.style.borderColor = "#d1d5db";
      }
    });
  });

  // Add radio button animations
  const radioInputs = contactForm.querySelectorAll(".radio-input");
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Add visual feedback
      this.parentNode.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.parentNode.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Add submit button animation
  submitBtn.addEventListener("mouseenter", function () {
    if (!this.disabled) {
      this.style.transform = "translateY(-2px)";
    }
  });

  submitBtn.addEventListener("mouseleave", function () {
    if (!this.disabled) {
      this.style.transform = "translateY(0)";
    }
  });

  // Add map pin click handler
  const mapPin = document.querySelector(".map-pin");
  if (mapPin) {
    mapPin.addEventListener("click", function () {
      showNotification("Opening map location...", "info");

      // Add click animation
      this.style.transform = "translateX(-50%) scale(1.2)";
      setTimeout(() => {
        this.style.transform = "translateX(-50%) scale(1)";
      }, 200);
    });
  }

  // Add address card click handler
  const addressCard = document.querySelector(".address-card");
  if (addressCard) {
    addressCard.addEventListener("click", function () {
      showNotification("Copying address to clipboard...", "success");

      // Copy address to clipboard
      const addressText = this.querySelector(".address-text").textContent;
      navigator.clipboard
        .writeText(addressText)
        .then(() => {
          showNotification("Address copied to clipboard!", "success");
        })
        .catch(() => {
          showNotification("Could not copy address", "error");
        });

      // Add click animation
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
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
            font-size: 14px;
            max-width: 300px;
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

  // Add smooth scrolling for better UX
  document.documentElement.style.scrollBehavior = "smooth";

  // Initialize page
  console.log("Contact Us page loaded successfully!");

  // Add form field focus animations
  const formInputs = contactForm.querySelectorAll(
    ".form-input, .form-textarea"
  );
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentNode.style.transform = "translateY(-2px)";
      this.parentNode.style.transition = "transform 0.2s ease";
    });

    input.addEventListener("blur", function () {
      this.parentNode.style.transform = "translateY(0)";
    });
  });

  // Add character counter for message field
  const messageField = contactForm.querySelector("#message");
  if (messageField) {
    const maxLength = 500;
    const counter = document.createElement("div");
    counter.className = "char-counter";
    counter.style.cssText = `
            text-align: right;
            font-size: 12px;
            color: #9ca3af;
            margin-top: 4px;
        `;
    messageField.parentNode.appendChild(counter);

    function updateCounter() {
      const remaining = maxLength - messageField.value.length;
      counter.textContent = `${messageField.value.length}/${maxLength}`;
      counter.style.color = remaining < 50 ? "#ef4444" : "#9ca3af";
    }

    messageField.addEventListener("input", updateCounter);
    updateCounter();
  }
});

// Additional utility functions
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

function validateFormData(formData) {
  const errors = [];

  if (!formData.name.trim()) {
    errors.push("Name is required");
  }

  if (!formData.email.trim()) {
    errors.push("Email is required");
  } else if (!isValidEmail(formData.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!formData.message.trim()) {
    errors.push("Message is required");
  }

  return errors;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Export functions for potential use in other scripts
window.ContactForm = {
  formatPhoneNumber,
  validateFormData,
  isValidEmail,
};
