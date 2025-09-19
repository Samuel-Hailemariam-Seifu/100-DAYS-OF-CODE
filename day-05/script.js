// Recipe Page Interactive Features
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const startCookingBtn = document.getElementById("startCookingBtn");
  const saveRecipeBtn = document.getElementById("saveRecipeBtn");
  const timerModal = document.getElementById("timerModal");
  const closeTimerModal = document.getElementById("closeTimerModal");
  const timerDisplay = document.getElementById("timerDisplay");
  const startTimer = document.getElementById("startTimer");
  const pauseTimer = document.getElementById("pauseTimer");
  const resetTimer = document.getElementById("resetTimer");
  const ingredientCheckboxes = document.querySelectorAll(
    ".ingredient-checkbox"
  );
  const ingredientItems = document.querySelectorAll(".ingredient-item");

  // Timer variables
  let timerInterval;
  let totalSeconds = 10 * 60; // 10 minutes in seconds
  let isRunning = false;
  let isPaused = false;

  // Initialize page
  initializePage();

  function initializePage() {
    // Add event listeners
    startCookingBtn.addEventListener("click", handleStartCooking);
    saveRecipeBtn.addEventListener("click", handleSaveRecipe);
    closeTimerModal.addEventListener("click", closeTimerModalFunction);
    startTimer.addEventListener("click", handleStartTimer);
    pauseTimer.addEventListener("click", handlePauseTimer);
    resetTimer.addEventListener("click", handleResetTimer);

    // Add ingredient checkbox listeners
    ingredientCheckboxes.forEach((checkbox, index) => {
      checkbox.addEventListener("change", function () {
        handleIngredientCheck(index, this.checked);
      });
    });

    // Add ingredient item click listeners
    ingredientItems.forEach((item, index) => {
      item.addEventListener("click", function (e) {
        if (e.target !== ingredientCheckboxes[index]) {
          ingredientCheckboxes[index].click();
        }
      });
    });

    // Close modal when clicking outside
    timerModal.addEventListener("click", function (e) {
      if (e.target === timerModal) {
        closeTimerModalFunction();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && timerModal.classList.contains("show")) {
        closeTimerModalFunction();
      }
    });

    // Add step completion tracking
    addStepCompletionTracking();

    // Add image loading fallback
    addImageFallback();

    console.log("Recipe page loaded successfully!");
  }

  // Start cooking handler
  function handleStartCooking() {
    showNotification("Starting cooking session!", "success");

    // Add visual feedback
    startCookingBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      startCookingBtn.style.transform = "scale(1)";
    }, 150);

    // Show timer modal
    showTimerModal();

    // Reset all ingredients
    resetAllIngredients();
  }

  // Save recipe handler
  function handleSaveRecipe() {
    showNotification("Recipe saved to your collection!", "success");

    // Add visual feedback
    saveRecipeBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      saveRecipeBtn.style.transform = "scale(1)";
    }, 150);

    // Simulate saving to localStorage
    const recipeData = {
      title: "Sweet Iced Coffee with Coconut Milk",
      savedAt: new Date().toISOString(),
      ingredients: Array.from(ingredientCheckboxes).map((cb) => ({
        text: cb.parentNode.querySelector(".ingredient-text").textContent,
        checked: cb.checked,
      })),
    };

    localStorage.setItem("savedRecipe", JSON.stringify(recipeData));
  }

  // Timer modal functions
  function showTimerModal() {
    timerModal.classList.add("show");
    document.body.style.overflow = "hidden";

    // Add animation to modal content
    const modalContent = timerModal.querySelector(".modal-content");
    modalContent.style.animation = "fadeIn 0.3s ease-out";
  }

  function closeTimerModalFunction() {
    timerModal.classList.remove("show");
    document.body.style.overflow = "auto";

    // Pause timer when closing modal
    if (isRunning) {
      handlePauseTimer();
    }
  }

  // Timer functions
  function handleStartTimer() {
    if (!isRunning) {
      isRunning = true;
      isPaused = false;
      startTimer.textContent = "Running...";
      startTimer.disabled = true;
      pauseTimer.disabled = false;

      timerInterval = setInterval(updateTimer, 1000);
      showNotification("Timer started!", "info");
    }
  }

  function handlePauseTimer() {
    if (isRunning) {
      isRunning = false;
      isPaused = true;
      clearInterval(timerInterval);
      startTimer.textContent = "Resume";
      startTimer.disabled = false;
      pauseTimer.disabled = true;

      showNotification("Timer paused", "info");
    }
  }

  function handleResetTimer() {
    isRunning = false;
    isPaused = false;
    clearInterval(timerInterval);
    totalSeconds = 10 * 60;
    updateTimerDisplay();

    startTimer.textContent = "Start";
    startTimer.disabled = false;
    pauseTimer.disabled = true;

    showNotification("Timer reset", "info");
  }

  function updateTimer() {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      // Timer finished
      handleTimerComplete();
    }
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  function handleTimerComplete() {
    isRunning = false;
    clearInterval(timerInterval);

    startTimer.textContent = "Start";
    startTimer.disabled = false;
    pauseTimer.disabled = true;

    showNotification(
      "🎉 Cooking time complete! Your coffee is ready!",
      "success"
    );

    // Add celebration animation
    document.body.style.animation = "celebration 0.5s ease-in-out";
    setTimeout(() => {
      document.body.style.animation = "";
    }, 500);
  }

  // Ingredient handling
  function handleIngredientCheck(index, isChecked) {
    const ingredientItem = ingredientItems[index];

    if (isChecked) {
      ingredientItem.classList.add("checked");
      showNotification(
        `✓ ${ingredientItem.querySelector(".ingredient-text").textContent}`,
        "success"
      );

      // Check if all ingredients are checked
      checkAllIngredientsComplete();
    } else {
      ingredientItem.classList.remove("checked");
    }

    // Add visual feedback
    ingredientItem.style.transform = "scale(0.98)";
    setTimeout(() => {
      ingredientItem.style.transform = "scale(1)";
    }, 150);
  }

  function checkAllIngredientsComplete() {
    const allChecked = Array.from(ingredientCheckboxes).every(
      (cb) => cb.checked
    );

    if (allChecked) {
      showNotification(
        "🎉 All ingredients gathered! Ready to start cooking!",
        "success"
      );

      // Enable start cooking button with animation
      startCookingBtn.style.background = "#22c55e";
      startCookingBtn.style.animation = "pulse 1s infinite";
    }
  }

  function resetAllIngredients() {
    ingredientCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    ingredientItems.forEach((item) => {
      item.classList.remove("checked");
    });

    // Reset start cooking button
    startCookingBtn.style.background = "#3b82f6";
    startCookingBtn.style.animation = "";
  }

  // Step completion tracking
  function addStepCompletionTracking() {
    const instructionSteps = document.querySelectorAll(".instruction-step");

    instructionSteps.forEach((step, index) => {
      step.addEventListener("click", function () {
        toggleStepCompletion(this, index);
      });

      // Add hover effect
      step.style.cursor = "pointer";
      step.addEventListener("mouseenter", function () {
        this.style.background = "#f8fafc";
        this.style.borderRadius = "8px";
        this.style.padding = "12px";
        this.style.margin = "0 -12px";
      });

      step.addEventListener("mouseleave", function () {
        this.style.background = "";
        this.style.borderRadius = "";
        this.style.padding = "";
        this.style.margin = "";
      });
    });
  }

  function toggleStepCompletion(step, index) {
    const stepNumber = step.querySelector(".step-number");
    const isCompleted = stepNumber.classList.contains("completed");

    if (isCompleted) {
      stepNumber.classList.remove("completed");
      stepNumber.style.background = "#3b82f6";
      stepNumber.textContent = index + 1;
      showNotification(`Step ${index + 1} marked as incomplete`, "info");
    } else {
      stepNumber.classList.add("completed");
      stepNumber.style.background = "#22c55e";
      stepNumber.textContent = "✓";
      showNotification(`✓ Step ${index + 1} completed!`, "success");
    }

    // Add visual feedback
    step.style.transform = "scale(0.98)";
    setTimeout(() => {
      step.style.transform = "scale(1)";
    }, 150);
  }

  // Image fallback
  function addImageFallback() {
    const recipeImage = document.querySelector(".recipe-image");

    recipeImage.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGQUZDIi8+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjIwMCIgcj0iNDAiIGZpbGw9IiNFMkU4RjAiLz4KPHN2ZyB4PSIyNjAiIHk9IjE2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJTNi40OCAyMiAxMiAyMlMyMiAxNy41MiAyMiAxMlMxNy41MiAyIDEyIDJaTTEzIDE3SDExVjE1SDEzVjE3Wk0xMyAxM0gxMVY3SDEzVjEzWiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4KPC9zdmc+";
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

  // Add celebration animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes celebration {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
  document.head.appendChild(style);

  // Add progress tracking
  function updateProgress() {
    const checkedIngredients = Array.from(ingredientCheckboxes).filter(
      (cb) => cb.checked
    ).length;
    const totalIngredients = ingredientCheckboxes.length;
    const progress = (checkedIngredients / totalIngredients) * 100;

    // Update page title with progress
    if (progress > 0) {
      document.title = `Sweet Iced Coffee (${Math.round(
        progress
      )}% complete) - Recipe`;
    } else {
      document.title = "Sweet Iced Coffee with Coconut Milk - Recipe";
    }
  }

  // Add progress tracking to ingredient checkboxes
  ingredientCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateProgress);
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    // Space bar to toggle first unchecked ingredient
    if (e.code === "Space" && e.target === document.body) {
      e.preventDefault();
      const firstUnchecked = Array.from(ingredientCheckboxes).find(
        (cb) => !cb.checked
      );
      if (firstUnchecked) {
        firstUnchecked.click();
      }
    }

    // Enter to start cooking
    if (e.code === "Enter" && e.ctrlKey) {
      e.preventDefault();
      startCookingBtn.click();
    }
  });

  // Add touch feedback for mobile
  if ("ontouchstart" in window) {
    document
      .querySelectorAll(".ingredient-item, .instruction-step, .btn")
      .forEach((element) => {
        element.addEventListener("touchstart", function () {
          this.style.transform = "scale(0.98)";
        });

        element.addEventListener("touchend", function () {
          this.style.transform = "scale(1)";
        });
      });
  }
});

// Additional utility functions
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

function saveRecipeToLocalStorage(recipeData) {
  try {
    const savedRecipes = JSON.parse(
      localStorage.getItem("savedRecipes") || "[]"
    );
    savedRecipes.push(recipeData);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    return true;
  } catch (error) {
    console.error("Error saving recipe:", error);
    return false;
  }
}

function getSavedRecipes() {
  try {
    return JSON.parse(localStorage.getItem("savedRecipes") || "[]");
  } catch (error) {
    console.error("Error loading recipes:", error);
    return [];
  }
}

// Export functions for potential use in other scripts
window.RecipeApp = {
  formatTime,
  saveRecipeToLocalStorage,
  getSavedRecipes,
};
