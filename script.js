// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  initNavigation()
  initHeroAnimations()
  initScrollAnimations()
  initGallery()
  initContactForm()
  initCounterAnimations()
  initLightbox()
  initSmoothScrolling()
})

// Navigation functionality
function initNavigation() {
  const navbar = document.getElementById("navbar")
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on links
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }
    })
  }

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Hero animations
function initHeroAnimations() {
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    heroContent.style.opacity = "0"
    heroContent.style.transform = "translateY(50px)"

    setTimeout(() => {
      heroContent.style.transition = "all 1s ease-out"
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
    }, 300)
  }

  // Parallax effect for hero background
  const heroBackground = document.querySelector(".hero-bg-img")
  if (heroBackground) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroBackground.style.transform = `translateY(${rate}px)`
    })
  }
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Stagger animation for grid items
        if (
          entry.target.classList.contains("course-category") ||
          entry.target.classList.contains("feature-card") ||
          entry.target.classList.contains("program-card")
        ) {
          const siblings = entry.target.parentElement.children
          const index = Array.from(siblings).indexOf(entry.target)
          entry.target.style.animationDelay = `${index * 0.1}s`
        }

        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(`
    .course-category,
    .feature-card,
    .program-card,
    .facility-card,
    .instructor-card,
    .contact-card,
    .gallery-item
  `)

  animateElements.forEach((el) => {
    // Set initial state but ensure visibility
    el.style.opacity = "1"
    el.style.transform = "translateY(0)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    
    // Only apply the hidden state if the element is not already in view
    if (!el.getBoundingClientRect().top < window.innerHeight) {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
    }
    
    observer.observe(el)
  })
}

// Gallery functionality
function initGallery() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter")

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Filter gallery items
      let anyVisible = false;
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category")
        if (filter === "all" || category === filter) {
          item.style.display = "block"
          item.style.animation = "fadeIn 0.5s ease-in"
          anyVisible = true;
        } else {
          item.style.display = "none"
        }
      })
      // If nothing is visible, show all
      if (!anyVisible) {
        galleryItems.forEach((item) => {
          item.style.display = "block"
        })
      }
    })
  })
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY") // You'll need to replace this with your actual EmailJS public key

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Get submit button
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.innerHTML

      // Show loading state
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitButton.disabled = true

      // Prepare email template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        program: data.program,
        message: data.message,
        to_email: 'info@flyingstudies.com' // Replace with your email
      }

      // Send email using EmailJS
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text)
          
          // Show success state
          submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
          submitButton.style.background = "#48bb78"

          // Show success notification
          showNotification("Thank you for your message! We'll get back to you soon.", "success")

          // Reset form
          contactForm.reset()
        }, function(error) {
          console.log('FAILED...', error)
          
          // Show error state
          submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send'
          submitButton.style.background = "#e53e3e"

          // Show error notification
          showNotification("Sorry, there was an error sending your message. Please try again.", "error")
        })
        .finally(function() {
          // Reset button after 3 seconds
          setTimeout(() => {
            submitButton.innerHTML = originalText
            submitButton.disabled = false
            submitButton.style.background = ""
          }, 3000)
        })
    })

    // Form validation
    const inputs = contactForm.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField)
      input.addEventListener("input", clearValidation)
    })
  }
}

// Field validation
function validateField(e) {
  const field = e.target
  const value = field.value.trim()

  // Remove existing validation
  clearValidation(e)

  let isValid = true
  let message = ""

  if (field.hasAttribute("required") && !value) {
    isValid = false
    message = "This field is required"
  } else if (field.type === "email" && value && !isValidEmail(value)) {
    isValid = false
    message = "Please enter a valid email address"
  } else if (field.type === "tel" && value && !isValidPhone(value)) {
    isValid = false
    message = "Please enter a valid phone number"
  }

  if (!isValid) {
    showFieldError(field, message)
  }
}

function clearValidation(e) {
  const field = e.target
  field.classList.remove("error")
  const errorMsg = field.parentElement.querySelector(".error-message")
  if (errorMsg) {
    errorMsg.remove()
  }
}

function showFieldError(field, message) {
  field.classList.add("error")

  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message
  errorDiv.style.color = "#e53e3e"
  errorDiv.style.fontSize = "0.8rem"
  errorDiv.style.marginTop = "0.25rem"

  field.parentElement.appendChild(errorDiv)
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ""))
}

// Counter animations
function initCounterAnimations() {
  const counters = document.querySelectorAll("[data-count]")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-count"))
          const duration = 2000 // 2 seconds
          const increment = target / (duration / 16) // 60fps

          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(timer)
            }
            counter.textContent = Math.floor(current)
          }, 16)

          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

// Lightbox functionality
function initLightbox() {
  const lightbox = document.getElementById("lightbox")
  const lightboxImg = document.getElementById("lightbox-img")
  const lightboxCaption = document.getElementById("lightbox-caption")
  const lightboxClose = document.querySelector(".lightbox-close")

  if (lightbox) {
    // Open lightbox
    document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        const img = trigger.closest(".gallery-item").querySelector("img")
        const caption = trigger.closest(".gallery-item").querySelector("h4")

        lightboxImg.src = img.src
        lightboxCaption.textContent = caption ? caption.textContent : ""
        lightbox.style.display = "block"
        document.body.style.overflow = "hidden"
      })
    })

    // Close lightbox
    function closeLightbox() {
      lightbox.style.display = "none"
      document.body.style.overflow = "auto"
    }

    lightboxClose.addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.style.display === "block") {
        closeLightbox()
      }
    })
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">&times;</button>
  `

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#48bb78" : "#3182ce"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 400px;
  `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  })

  // Auto close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 300)
    }
  }, 5000)
}

// Course filter functionality
const filterButtons = document.querySelectorAll(".filter-btn")
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const filter = this.dataset.filter
    const courses = document.querySelectorAll(".course-category")

    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    this.classList.add("active")

    let anyVisible = false;
    courses.forEach((course) => {
      if (filter === "all" || course.dataset.level === filter) {
        course.style.display = "block"
        course.style.animation = "fadeIn 0.5s ease-in"
        anyVisible = true;
      } else {
        course.style.display = "none"
      }
    })
    // If nothing is visible, show all
    if (!anyVisible) {
      courses.forEach((course) => {
        course.style.display = "block"
      })
    }
  })
})

// Curriculum accordion
const moduleHeaders = document.querySelectorAll(".module-header")
moduleHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    const content = this.nextElementSibling
    const isOpen = content.style.display === "block"

    // Close all modules
    document.querySelectorAll(".module-content").forEach((module) => {
      module.style.display = "none"
    })

    // Open clicked module if it wasn't open
    if (!isOpen) {
      content.style.display = "block"
    }
  })
})

// Course card hover effects
const courseCards = document.querySelectorAll(".course-card, .category-card")
courseCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px)"
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
    this.style.boxShadow = ""
  })
})

// Search functionality (if search input exists)
const searchInput = document.querySelector(".search-input")
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const courseCards = document.querySelectorAll(".course-card")

    courseCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase()
      const description = card.querySelector("p").textContent.toLowerCase()

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
}

// Back to top button
const backToTop = document.createElement("button")
backToTop.innerHTML = "↑"
backToTop.className = "back-to-top"
backToTop.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
`

document.body.appendChild(backToTop)

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.opacity = "1"
  } else {
    backToTop.style.opacity = "0"
  }
})

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Add custom CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  
  .slide-in {
    animation: slideIn 0.5s ease-out;
  }
  
  .pulse {
    animation: pulse 2s infinite;
  }
`
document.head.appendChild(style)
