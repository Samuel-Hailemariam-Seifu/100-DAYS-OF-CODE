// Create Account Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const accountForm = document.getElementById('accountForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordToggle = document.getElementById('passwordToggle');
  const submitBtn = document.getElementById('submitBtn');
  const successModal = document.getElementById('successModal');
  const closeModal = document.getElementById('closeModal');
  const modalOk = document.getElementById('modalOk');

  // Form validation rules
  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'First name must be at least 2 characters and contain only letters'
    },
    lastName: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Last name must be at least 2 characters and contain only letters'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
    }
  };

  // Initialize the form
  function initForm() {
    setupEventListeners();
    setupPasswordToggle();
    setupFormValidation();
    setupKeyboardNavigation();
    addFormAnimations();
  }

  // Setup event listeners
  function setupEventListeners() {
    // Form submission
    accountForm.addEventListener('submit', handleFormSubmit);

    // Real-time validation
    [firstNameInput, lastNameInput, emailInput, passwordInput].forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => clearFieldError(input));
    });

    // Modal controls
    closeModal.addEventListener('click', closeSuccessModal);
    modalOk.addEventListener('click', closeSuccessModal);

    // Close modal on outside click
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        closeSuccessModal();
      }
    });

    // Sign in link
    const signInLink = document.querySelector('.signin-text');
    signInLink.addEventListener('click', (e) => {
      e.preventDefault();
      showNotification('Sign in functionality would be implemented here', 'info');
    });
  }

  // Setup password toggle functionality
  function setupPasswordToggle() {
    passwordToggle.addEventListener('click', togglePasswordVisibility);
    
    // Update password toggle icon based on visibility
    updatePasswordToggleIcon();
  }

  // Toggle password visibility
  function togglePasswordVisibility() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    // Update the value to show/hide dots
    if (isPassword) {
      passwordInput.value = passwordInput.getAttribute('data-real-value') || '';
    } else {
      passwordInput.setAttribute('data-real-value', passwordInput.value);
      passwordInput.value = '••••••••';
    }
    
    updatePasswordToggleIcon();
  }

  // Update password toggle icon
  function updatePasswordToggleIcon() {
    const isPassword = passwordInput.type === 'password';
    const icon = passwordToggle.querySelector('svg');
    
    if (isPassword) {
      // Show eye icon
      icon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    } else {
      // Show eye-off icon
      icon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    }
  }

  // Setup form validation
  function setupFormValidation() {
    // Add error message elements
    [firstNameInput, lastNameInput, emailInput, passwordInput].forEach(input => {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.id = `${input.name}-error`;
      input.parentNode.appendChild(errorElement);
    });
  }

  // Handle form submission
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    
    if (isValid) {
      submitForm();
    } else {
      showNotification('Please fix the errors before submitting', 'error');
    }
  }

  // Validate entire form
  function validateForm() {
    let isValid = true;
    
    [firstNameInput, lastNameInput, emailInput, passwordInput].forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  // Validate individual field
  function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    const rules = validationRules[fieldName];
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Clear previous errors
    clearFieldError(input);
    
    // Check required
    if (rules.required && !value) {
      showFieldError(input, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
      return false;
    }
    
    // Check minimum length
    if (rules.minLength && value.length < rules.minLength) {
      showFieldError(input, rules.message);
      return false;
    }
    
    // Check pattern
    if (rules.pattern && value && !rules.pattern.test(value)) {
      showFieldError(input, rules.message);
      return false;
    }
    
    return true;
  }

  // Show field error
  function showFieldError(input, message) {
    input.classList.add('error');
    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  // Clear field error
  function clearFieldError(input) {
    input.classList.remove('error');
    const errorElement = document.getElementById(`${input.name}-error`);
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  // Submit form
  function submitForm() {
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      // Hide loading state
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      
      // Show success modal
      showSuccessModal();
      
      // Reset form
      resetForm();
    }, 2000);
  }

  // Show success modal
  function showSuccessModal() {
    successModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  // Close success modal
  function closeSuccessModal() {
    successModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  // Reset form
  function resetForm() {
    accountForm.reset();
    
    // Reset to default values
    firstNameInput.value = 'John';
    lastNameInput.value = 'Doe';
    emailInput.value = 'john.doe@email.com';
    passwordInput.value = '••••••••';
    passwordInput.type = 'password';
    
    // Clear all errors
    [firstNameInput, lastNameInput, emailInput, passwordInput].forEach(clearFieldError);
    
    // Update password toggle icon
    updatePasswordToggleIcon();
  }

  // Setup keyboard navigation
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Close modal with Escape key
      if (e.key === 'Escape' && successModal.classList.contains('show')) {
        closeSuccessModal();
      }
      
      // Submit form with Enter key (when not in textarea)
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        if (e.target === passwordInput) {
          e.preventDefault();
          handleFormSubmit(e);
        }
      }
    });
  }

  // Add form animations
  function addFormAnimations() {
    // Add focus animations
    [firstNameInput, lastNameInput, emailInput, passwordInput].forEach(input => {
      input.addEventListener('focus', () => {
        input.parentNode.style.transform = 'scale(1.02)';
      });
      
      input.addEventListener('blur', () => {
        input.parentNode.style.transform = 'scale(1)';
      });
    });
    
    // Add button hover effects
    submitBtn.addEventListener('mouseenter', () => {
      if (!submitBtn.disabled) {
        submitBtn.style.transform = 'translateY(-2px)';
      }
    });
    
    submitBtn.addEventListener('mouseleave', () => {
      submitBtn.style.transform = 'translateY(0)';
    });
  }

  // Show notification
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '1001',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '300px',
      wordWrap: 'break-word'
    });
    
    // Set background color based on type
    const colors = {
      info: '#3b82f6',
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Add input formatting
  function addInputFormatting() {
    // Format name inputs
    [firstNameInput, lastNameInput].forEach(input => {
      input.addEventListener('input', (e) => {
        // Capitalize first letter
        const value = e.target.value;
        if (value.length > 0) {
          e.target.value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
      });
    });
    
    // Format email input
    emailInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.toLowerCase();
    });
  }

  // Add password strength indicator
  function addPasswordStrengthIndicator() {
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.innerHTML = `
      <div class="strength-bar">
        <div class="strength-fill"></div>
      </div>
      <div class="strength-text">Password strength</div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .password-strength {
        margin-top: 8px;
        display: none;
      }
      
      .strength-bar {
        height: 4px;
        background: #e5e7eb;
        border-radius: 2px;
        overflow: hidden;
        margin-bottom: 4px;
      }
      
      .strength-fill {
        height: 100%;
        width: 0%;
        transition: all 0.3s ease;
        border-radius: 2px;
      }
      
      .strength-text {
        font-size: 12px;
        color: #6b7280;
      }
    `;
    document.head.appendChild(style);
    
    passwordInput.parentNode.appendChild(strengthIndicator);
    
    // Update strength on input
    passwordInput.addEventListener('input', () => {
      const password = passwordInput.value;
      const strength = calculatePasswordStrength(password);
      
      if (password.length > 0) {
        strengthIndicator.style.display = 'block';
        updateStrengthIndicator(strength);
      } else {
        strengthIndicator.style.display = 'none';
      }
    });
  }

  // Calculate password strength
  function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    
    return strength;
  }

  // Update strength indicator
  function updateStrengthIndicator(strength) {
    const fill = document.querySelector('.strength-fill');
    const text = document.querySelector('.strength-text');
    
    fill.style.width = `${strength}%`;
    
    if (strength < 25) {
      fill.style.backgroundColor = '#ef4444';
      text.textContent = 'Weak';
      text.style.color = '#ef4444';
    } else if (strength < 50) {
      fill.style.backgroundColor = '#f59e0b';
      text.textContent = 'Fair';
      text.style.color = '#f59e0b';
    } else if (strength < 75) {
      fill.style.backgroundColor = '#3b82f6';
      text.textContent = 'Good';
      text.style.color = '#3b82f6';
    } else {
      fill.style.backgroundColor = '#10b981';
      text.textContent = 'Strong';
      text.style.color = '#10b981';
    }
  }

  // Initialize everything
  initForm();
  addInputFormatting();
  addPasswordStrengthIndicator();

  // Expose some functions globally for debugging
  window.accountForm = {
    validateForm,
    resetForm,
    showNotification,
    currentFormData: () => ({
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    })
  };
});
