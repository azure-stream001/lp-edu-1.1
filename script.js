// JavaScript for Japanese Child Education Landing Page

document.addEventListener("DOMContentLoaded", function () {
  // Check if the device is a touch device
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Interactive click effects
  const clickEffectsContainer = document.querySelector(".click-effects");
  document.addEventListener("click", function (e) {
    createClickEffect(e.clientX, e.clientY);
  });

  function createClickEffect(x, y) {
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.style.left = x - 10 + "px";
    effect.style.top = y - 10 + "px";
    clickEffectsContainer.appendChild(effect);

    setTimeout(() => {
      effect.remove();
    }, 600);
  }

  // Magical cursor trail (disabled for touch devices for better performance)
  if (!isTouchDevice) {
    let mouseTrail = [];
    document.addEventListener("mousemove", function (e) {
      mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });

      // Keep only recent trail points
      mouseTrail = mouseTrail.filter((point) => Date.now() - point.time < 1000);

      // Create sparkle effect occasionally
      if (Math.random() < 0.1) {
        createSparkle(e.clientX, e.clientY);
      }
    });

    function createSparkle(x, y) {
      const sparkle = document.createElement("div");
      sparkle.innerHTML = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "9999";
      sparkle.style.fontSize = "12px";
      sparkle.style.animation = "twinkle 1s ease-out forwards";
      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  }

  // Enhanced button interactions
  const magicalButtons = document.querySelectorAll(
    ".magical-button, .magical-button-outline, .magical-button-small, .magical-submit-btn"
  );
  magicalButtons.forEach((button) => {
    // Removed mouseenter and mouseleave listeners for mobile stability
    button.addEventListener("click", function (e) {
      createClickBurst(e.target, e.clientX, e.clientY);
    });
  });

  function createButtonSparkles(button) {
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "⭐";
        sparkle.style.position = "fixed";
        sparkle.style.left = rect.left + Math.random() * rect.width + "px";
        sparkle.style.top = rect.top + Math.random() * rect.height + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "10px";
        sparkle.style.animation = "twinkle 0.8s ease-out forwards";
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 800);
      }, i * 100);
    }
  }

  function createClickBurst(element, x, y) {
    const colors = ["🌟", "✨", "💫", "⭐", "🎉"];
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement("div");
      particle.innerHTML = colors[Math.floor(Math.random() * colors.length)];
      particle.style.position = "fixed";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";
      particle.style.fontSize = "14px";

      const angle = (i / 8) * Math.PI * 2;
      const velocity = 50 + Math.random() * 50;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      particle.style.animation = `particle-burst 1s ease-out forwards`;
      particle.style.setProperty("--vx", vx + "px");
      particle.style.setProperty("--vy", vy + "px");

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }

  // Add particle burst animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes particle-burst {
            0% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(var(--vx), var(--vy)) scale(0);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Add magical scroll effect
        if (!isTouchDevice) {
          createScrollSparkles();
        }
      }
    });
  });

  function createScrollSparkles() {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "🌟";
        sparkle.style.position = "fixed";
        sparkle.style.right = "20px";
        sparkle.style.top = 100 + i * 20 + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "16px";
        sparkle.style.animation = "fadeInUp 0.5s ease-out forwards";
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }, i * 100);
    }
  }

  // Navbar background change on scroll
  const navbar = document.querySelector(".custom-navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.borderImage =
        "linear-gradient(45deg, #FF6B9D, #4ECDC4, #FFE66D) 1";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    }
  });

  // Enhanced animated counters for statistics with sparkle effects
  const counters = document.querySelectorAll(".stat-number");
  const options = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-count"));
        let current = 0;
        const increment = target / 60; // Animation duration control

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);

            // Add sparkle effect during counting (disabled for touch)
            if (!isTouchDevice && Math.random() < 0.3) {
              createCounterSparkle(counter);
            }

            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
            // Final celebration sparkles (disabled for touch)
            if (!isTouchDevice) {
              createCelebrationSparkles(counter);
            }
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, options);

  function createCounterSparkle(counter) {
    const rect = counter.getBoundingClientRect();
    const sparkle = document.createElement("div");
    sparkle.innerHTML = "✨";
    sparkle.style.position = "fixed";
    sparkle.style.left = rect.left + rect.width / 2 + "px";
    sparkle.style.top = rect.top - 10 + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "9999";
    sparkle.style.fontSize = "12px";
    sparkle.style.animation = "twinkle 0.6s ease-out forwards";
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 600);
  }

  function createCelebrationSparkles(counter) {
    const rect = counter.getBoundingClientRect();
    const sparkles = ["🎉", "✨", "🌟", "💫", "⭐"];

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = sparkles[i];
        sparkle.style.position = "fixed";
        sparkle.style.left = rect.left + Math.random() * rect.width + "px";
        sparkle.style.top = rect.top + Math.random() * rect.height + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "16px";
        sparkle.style.animation = "bounceIn 0.8s ease-out forwards";
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1200);
      }, i * 100);
    }
  }

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Enhanced animate elements on scroll with stagger effect
  const animateElements = document.querySelectorAll(
    ".magical-card-hover, .magical-special-card, .magical-feature, .magical-contact-item"
  );

  const animationObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = Array.from(animateElements).indexOf(element) * 100;

          setTimeout(() => {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
            element.classList.add("animate__animated", "animate__fadeInUp");

            // Add entrance sparkles (disabled for touch)
            if (!isTouchDevice) {
              createEntranceSparkles(element);
            }
          }, delay);
        }
      });
    },
    { threshold: 0.1 }
  );

  function createEntranceSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = "⭐";
        sparkle.style.position = "fixed";
        sparkle.style.left = rect.left + Math.random() * rect.width + "px";
        sparkle.style.top = rect.top + Math.random() * rect.height + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "12px";
        sparkle.style.animation = "twinkle 1s ease-out forwards";
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }, i * 200);
    }
  }

  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    animationObserver.observe(element);
  });

  // Enhanced contact form handling with magical effects
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const parentName = document.getElementById("parentName").value;
    const childName = document.getElementById("childName").value;
    const email = document.getElementById("email").value;
    const childAge = document.getElementById("childAge").value;

    // Basic validation
    if (!parentName || !childName || !email || !childAge) {
      showMagicalNotification("🚨 必須項目を入力してください。", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showMagicalNotification(
        "📧 有効なメールアドレスを入力してください。",
        "error"
      );
      return;
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "🚀 送信中...";
    submitButton.disabled = true;

    // Add loading sparkles (disabled for touch)
    if (!isTouchDevice) {
      const loadingInterval = setInterval(() => {
        createButtonSparkles(submitButton);
      }, 200);
    }

    setTimeout(() => {
      // clearInterval(loadingInterval); // Removed since it's inside an if block now
      showMagicalNotification(
        "🎉 お問い合わせありがとうございます！2営業日以内にご連絡いたします。✨",
        "success"
      );
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      // Success celebration
      createSuccessCelebration();
    }, 2000);
  });

  function createSuccessCelebration() {
    const celebrationEmojis = ["🎉", "🎊", "✨", "🌟", "💫", "🎈", "🦄", "🌈"];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = document.createElement("div");
        emoji.innerHTML =
          celebrationEmojis[
            Math.floor(Math.random() * celebrationEmojis.length)
          ];
        emoji.style.position = "fixed";
        emoji.style.left = Math.random() * window.innerWidth + "px";
        emoji.style.top = "-50px";
        emoji.style.pointerevents = "none";
        emoji.style.zIndex = "9999";
        emoji.style.fontSize = 16 + Math.random() * 16 + "px";
        emoji.style.animation = `fall ${
          2 + Math.random() * 3
        }s linear forwards`;
        document.body.appendChild(emoji);

        setTimeout(() => {
          emoji.remove();
        }, 5000);
      }, i * 100);
    }
  }

  // Add fall animation for celebration
  style.textContent += `
        @keyframes fall {
            to {
                transform: translateY(${
                  window.innerHeight + 100
                }px) rotate(360deg);
                opacity: 0;
            }
        }
    `;

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Enhanced magical notification function
  function showMagicalNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type} magical-notification`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle"
                    : "fa-exclamation-circle"
                } notification-icon"></i>
                <span>${message}</span>
                <button class="notification-close">✖️</button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${
              type === "success"
                ? "linear-gradient(135deg, #d4edda, #c3e6cb)"
                : "linear-gradient(135deg, #f8d7da, #f5c6cb)"
            };
            color: ${type === "success" ? "#155724" : "#721c24"};
            border: 3px solid ${type === "success" ? "#28a745" : "#dc3545"};
            border-radius: 15px;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            min-width: 300px;
            animation: magicalSlideIn 0.5s ease;
            backdrop-filter: blur(10px);
        `;

    // Add to document
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification) {
        notification.style.animation = "magicalSlideOut 0.5s ease";
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 500);
      }
    }, 5000);

    // Close button functionality
    const closeButton = notification.querySelector(".notification-close");
    closeButton.addEventListener("click", () => {
      notification.style.animation = "magicalSlideOut 0.5s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    });
  }

  // Add CSS for enhanced notification animations
  style.textContent += `
        @keyframes magicalSlideIn {
            from {
                opacity: 0;
                transform: translateX(100%) scale(0.8) rotate(10deg);
            }
            to {
                opacity: 1;
                transform: translateX(0) scale(1) rotate(0deg);
            }
        }
        
        @keyframes magicalSlideOut {
            from {
                opacity: 1;
                transform: translateX(0) scale(1) rotate(0deg);
            }
            to {
                opacity: 0;
                transform: translateX(100%) scale(0.8) rotate(-10deg);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-icon {
            animation: bounce 1s infinite;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.3s ease;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .notification-close:hover {
            opacity: 1;
            transform: scale(1.1) rotate(90deg);
            background: rgba(255,255,255,0.2);
        }
    `;

  // Enhanced interactive program cards
  const programCards = document.querySelectorAll(".magical-card-hover");
  programCards.forEach((card) => {
    // Removed mouseenter and mouseleave listeners for mobile stability
  });

  function createCardHoverSparkles(card) {
    const rect = card.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = ["✨", "⭐", "🌟"][i];
        sparkle.style.position = "fixed";
        sparkle.style.left = rect.left + Math.random() * rect.width + "px";
        sparkle.style.top = rect.top + Math.random() * rect.height + "px";
        sparkle.style.pointerevents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "12px";
        sparkle.style.animation = "twinkle 1s ease-out forwards";
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1000);
      }, i * 100);
    }
  }

  // Enhanced auto-play carousel with magical effects
  const carousel = document.querySelector("#testimonialCarousel");
  if (carousel) {
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 6000,
      ride: "carousel",
    });

    carousel.addEventListener("mouseenter", () => {
      bsCarousel.pause();
    });

    carousel.addEventListener("mouseleave", () => {
      bsCarousel.cycle();
    });

    // Add event listener to update indicators
    const indicators = document.querySelectorAll(".magical-indicators button");
    carousel.addEventListener("slid.bs.carousel", function (event) {
      const activeIndex = event.to;
      indicators.forEach((indicator) => {
        indicator.classList.remove("active");
      });
      indicators[activeIndex].classList.add("active");
    });

    // Enhanced arrow button effects (simplified)
    const carouselButtons = document.querySelectorAll(".magical-carousel-btn");
    carouselButtons.forEach((button) => {
      // Removed mouseenter and mouseleave listeners for mobile stability
      button.addEventListener("click", function () {
        // Simplified click effect
        createClickBurst(
          this,
          this.getBoundingClientRect().left + this.offsetWidth / 2,
          this.getBoundingClientRect().top + this.offsetHeight / 2
        );
      });
    });
  }

  function createArrowSparkles(button) {
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = ["⭐", "✨", "💫", "🌟", "💥"][i];
        sparkle.style.position = "fixed";
        sparkle.style.left =
          rect.left + rect.width / 2 + (Math.random() - 0.5) * 40 + "px";
        sparkle.style.top =
          rect.top + rect.height / 2 + (Math.random() - 0.5) * 40 + "px";
        sparkle.style.pointerevents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "14px";
        sparkle.style.animation = `arrow-sparkle-${i} 1.2s ease-out forwards`;
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1200);
      }, i * 80);
    }
  }

  function createArrowClickEffect(button) {
    const rect = button.getBoundingClientRect();
    const effects = ["🌟", "✨", "💫", "🎉", "💥", "⚡", "🔥"];

    effects.forEach((effect, index) => {
      setTimeout(() => {
        const element = document.createElement("div");
        element.innerHTML = effect;
        element.style.position = "fixed";
        element.style.left = rect.left + rect.width / 2 + "px";
        element.style.top = rect.top + rect.height / 2 + "px";
        element.style.pointerevents = "none";
        element.style.zIndex = "9999";
        element.style.fontSize = "18px";
        element.style.animation = `arrow-click-burst-${index} 1s ease-out forwards`;
        document.body.appendChild(element);

        setTimeout(() => {
          element.remove();
        }, 1000);
      }, index * 30);
    });
  }

  function createSlideChangeSparkles() {
    const sparkles = ["🌟", "✨", "💫", "🎊", "🎉"];
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement("div");
        sparkle.innerHTML = sparkles[i];
        sparkle.style.position = "fixed";
        sparkle.style.left = window.innerWidth / 2 + (i - 2) * 60 + "px";
        sparkle.style.top = "50%";
        sparkle.style.pointerevents = "none";
        sparkle.style.zIndex = "9999";
        sparkle.style.fontSize = "24px";
        sparkle.style.animation = "bounceIn 1s ease-out forwards";
        document.body.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 1500);
      }, i * 150);
    }
  }

  // Add enhanced sparkle burst animations
  style.textContent += `
        @keyframes arrow-sparkle-0 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-30px, -30px) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes arrow-sparkle-1 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(30px, -30px) scale(0) rotate(-180deg); opacity: 0; }
        }
        @keyframes arrow-sparkle-2 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(0, -40px) scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes arrow-sparkle-3 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-20px, 20px) scale(0) rotate(270deg); opacity: 0; }
        }
        @keyframes arrow-sparkle-4 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(20px, 20px) scale(0) rotate(-270deg); opacity: 0; }
        }
        
        @keyframes arrow-click-burst-0 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-40px, -40px) scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes arrow-click-burst-1 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(40px, -40px) scale(0) rotate(-360deg); opacity: 0; }
        }
        @keyframes arrow-click-burst-2 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(0, -50px) scale(0) rotate(720deg); opacity: 0; }
        }
        @keyframes arrow-click-burst-3 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-30px, 30px) scale(0) rotate(540deg); opacity: 0; }
        }
        @keyframes arrow-click-burst-4 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(30px, 30px) scale(0) rotate(-540deg); opacity: 0; }
        }
        @keyframes arrow-click-burst-5 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(-50px, 0) scale(0) rotate(180deg); opacity: 0; }
        }
        @keyframes arrow-click-burst-6 {
            0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
            100% { transform: translate(50px, 0) scale(0) rotate(-180deg); opacity: 0; }
        }
    `;

  // Enhanced page load animation
  document.body.style.opacity = "0";
  window.addEventListener("load", function () {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";

    // Welcome sparkles
    setTimeout(() => {
      createWelcomeSparkles();
    }, 500);
  });

  function createWelcomeSparkles() {
    const welcomeEmojis = ["🌟", "✨", "🎉", "🦄", "🌈", "💫", "🎊", "🎈"];
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const emoji = document.createElement("div");
        emoji.innerHTML =
          welcomeEmojis[Math.floor(Math.random() * welcomeEmojis.length)];
        emoji.style.position = "fixed";
        emoji.style.left = Math.random() * window.innerWidth + "px";
        emoji.style.top = "-50px";
        emoji.style.pointerevents = "none";
        emoji.style.zIndex = "9999";
        emoji.style.fontSize = 14 + Math.random() * 10 + "px";
        emoji.style.animation = `welcome-fall ${
          3 + Math.random() * 2
        }s linear forwards`;
        document.body.appendChild(emoji);

        setTimeout(() => {
          emoji.remove();
        }, 6000);
      }, i * 150);
    }
  }

  // Add welcome fall animation
  style.textContent += `
        @keyframes welcome-fall {
            0% {
                transform: translateY(-50px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(${
                  window.innerHeight + 100
                }px) rotate(720deg);
                opacity: 0;
            }
        }
    `;

  // Add all styles to document
  document.head.appendChild(style);

  console.log(
    "🌟✨ こども学習センター magical website loaded successfully! ✨🌟"
  );
});

// Enhanced scroll to top functionality
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    if (!document.querySelector(".scroll-to-top")) {
      const scrollButton = document.createElement("button");
      scrollButton.className = "scroll-to-top magical-scroll-btn";
      scrollButton.innerHTML = "🚀";
      scrollButton.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #FF6B9D, #4ECDC4);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 8px 25px rgba(255, 107, 157, 0.4);
                transition: all 0.3s ease;
                z-index: 1000;
                animation: bounceIn 0.5s ease;
                font-size: 1.2rem;
                border: 3px solid rgba(255,255,255,0.3);
            `;

      scrollButton.addEventListener("click", function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      scrollButton.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.1) rotate(10deg)";
        this.style.boxShadow = "0 12px 35px rgba(255, 107, 157, 0.6)";
        this.style.animation = "bounce 0.6s ease-in-out infinite";
      });

      scrollButton.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1) rotate(0deg)";
        this.style.boxShadow = "0 8px 25px rgba(255, 107, 157, 0.4)";
        this.style.animation = "";
      });

      document.body.appendChild(scrollButton);
    }
  } else {
    const scrollButton = document.querySelector(".scroll-to-top");
    if (scrollButton) {
      scrollButton.style.animation = "fadeOutDown 0.5s ease";
      setTimeout(() => {
        if (scrollButton.parentNode) {
          scrollButton.parentNode.removeChild(scrollButton);
        }
      }, 500);
    }
  }
});

// New function to close the menu on outside click
document.addEventListener("click", function (e) {
  const navbarCollapse = document.getElementById("navbarNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // Check if the menu is open and the clicked element is not inside the menu or the toggler button
  if (
    navbarCollapse.classList.contains("show") &&
    !navbarCollapse.contains(e.target) &&
    e.target !== navbarToggler &&
    !navbarToggler.contains(e.target)
  ) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  }
});
