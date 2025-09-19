// Image Carousel JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Image data array
  const images = [
    {
      main: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=150&h=100&fit=crop",
      alt: "White Flowers",
    },
    {
      main: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=100&fit=crop",
      alt: "Fern Fronds",
    },
    {
      main: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=100&fit=crop",
      alt: "Kingfisher Bird",
    },
    {
      main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop",
      alt: "Lake and Forest",
    },
    {
      main: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&h=100&fit=crop",
      alt: "Old Tree",
    },
    {
      main: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop",
      alt: "Rolling Hills",
    },
  ];

  // DOM elements
  const mainImage = document.getElementById("mainImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const thumbnailItems = document.querySelectorAll(".thumbnail-item");
  const mainImageContainer = document.querySelector(".main-image-container");

  // Current image index
  let currentIndex = 2; // Start with the kingfisher image (index 2)

  // Initialize the carousel
  function initCarousel() {
    updateMainImage();
    updateThumbnailSelection();
    setupEventListeners();
    setupKeyboardNavigation();
    preloadImages();
  }

  // Update main image
  function updateMainImage() {
    const currentImage = images[currentIndex];

    // Add loading class
    mainImageContainer.classList.add("loading");

    // Create new image element for preloading
    const newImage = new Image();
    newImage.onload = function () {
      mainImage.src = currentImage.main;
      mainImage.alt = currentImage.alt;
      mainImageContainer.classList.remove("loading");

      // Add fade-in animation
      mainImage.style.opacity = "0";
      setTimeout(() => {
        mainImage.style.opacity = "1";
      }, 50);
    };

    newImage.onerror = function () {
      // Fallback image if loading fails
      mainImage.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+";
      mainImage.alt = "Image Unavailable";
      mainImageContainer.classList.remove("loading");
    };

    newImage.src = currentImage.main;
  }

  // Update thumbnail selection
  function updateThumbnailSelection() {
    thumbnailItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Navigate to previous image
  function goToPrevious() {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    updateMainImage();
    updateThumbnailSelection();
    addNavigationEffect("prev");
  }

  // Navigate to next image
  function goToNext() {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    updateMainImage();
    updateThumbnailSelection();
    addNavigationEffect("next");
  }

  // Navigate to specific image
  function goToImage(index) {
    if (index >= 0 && index < images.length && index !== currentIndex) {
      currentIndex = index;
      updateMainImage();
      updateThumbnailSelection();
      addNavigationEffect("thumbnail");
    }
  }

  // Add visual feedback for navigation
  function addNavigationEffect(type) {
    const container = document.querySelector(".carousel-container");
    container.classList.add("navigating");

    setTimeout(() => {
      container.classList.remove("navigating");
    }, 300);
  }

  // Setup event listeners
  function setupEventListeners() {
    // Arrow navigation
    prevBtn.addEventListener("click", goToPrevious);
    nextBtn.addEventListener("click", goToNext);

    // Thumbnail navigation
    thumbnailItems.forEach((item, index) => {
      item.addEventListener("click", () => goToImage(index));

      // Add hover effect
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px) scale(1.05)";
      });

      item.addEventListener("mouseleave", function () {
        if (!this.classList.contains("active")) {
          this.style.transform = "translateY(0) scale(1)";
        }
      });
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    mainImageContainer.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    mainImageContainer.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;

      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }
    });

    // Mouse wheel navigation
    mainImageContainer.addEventListener("wheel", function (e) {
      e.preventDefault();
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    });
  }

  // Setup keyboard navigation
  function setupKeyboardNavigation() {
    document.addEventListener("keydown", function (e) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          goToImage(0);
          break;
        case "End":
          e.preventDefault();
          goToImage(images.length - 1);
          break;
        case " ":
          e.preventDefault();
          goToNext();
          break;
      }
    });
  }

  // Preload images for better performance
  function preloadImages() {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.main;
    });
  }

  // Auto-play functionality (optional)
  let autoPlayInterval;

  function startAutoPlay(interval = 5000) {
    stopAutoPlay();
    autoPlayInterval = setInterval(goToNext, interval);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // Pause auto-play on hover
  mainImageContainer.addEventListener("mouseenter", stopAutoPlay);
  mainImageContainer.addEventListener("mouseleave", () => {
    // Uncomment the line below to enable auto-play
    // startAutoPlay();
  });

  // Add loading states and error handling
  function handleImageError(img) {
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+";
    img.alt = "Image Unavailable";
  }

  // Add error handling to all images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => handleImageError(img));
  });

  // Add smooth transitions
  function addSmoothTransitions() {
    const style = document.createElement("style");
    style.textContent = `
      .carousel-container.navigating .main-image {
        transform: scale(0.98);
        opacity: 0.8;
      }
      
      .main-image {
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize everything
  addSmoothTransitions();
  initCarousel();

  // Add some interactive feedback
  function addInteractiveFeedback() {
    // Add click ripple effect
    function createRipple(event) {
      const button = event.currentTarget;
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    // Add ripple effect to navigation arrows
    [prevBtn, nextBtn].forEach((btn) => {
      btn.addEventListener("click", createRipple);
    });
  }

  // Add ripple effect styles
  function addRippleStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .nav-arrow {
        position: relative;
        overflow: hidden;
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize interactive features
  addRippleStyles();
  addInteractiveFeedback();

  // Expose some functions globally for debugging
  window.carousel = {
    goToPrevious,
    goToNext,
    goToImage,
    startAutoPlay,
    stopAutoPlay,
    currentIndex: () => currentIndex,
    totalImages: () => images.length,
  };
});
