// JavaScript for North Star Transport Ltd Website - Mobile Responsive Version

// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.querySelector('.scroll-top');
const sections = document.querySelectorAll('section');
const serviceCards = document.querySelectorAll('.service-card');
const contactForm = document.querySelector('.contact-form form');

// Check for mobile viewport
function isMobile() {
  return window.innerWidth <= 768;
}

// Adjust elements based on screen size
function adjustForScreenSize() {
  const mobile = isMobile();
  
  // Adjust section heights for mobile
  sections.forEach(section => {
    section.style.minHeight = mobile ? 'auto' : '100vh';
    section.style.padding = mobile ? '60px 20px' : '80px 50px';
  });
  
  // Adjust service cards for mobile
  serviceCards.forEach(card => {
    card.style.height = mobile ? 'auto' : '100%';
    card.style.margin = mobile ? '0 0 20px 0' : '0 15px';
  });
  
  // Adjust testimonial slider for mobile
  const testimonialItems = document.querySelectorAll('.testimonial-item');
  if (testimonialItems.length) {
    testimonialItems.forEach(item => {
      item.style.padding = mobile ? '15px' : '30px';
    });
  }
  
  // Adjust contact form padding for mobile
  const contactFormEl = document.querySelector('.contact-form');
  if (contactFormEl) {
    contactFormEl.style.padding = mobile ? '20px 15px' : '40px';
  }
}

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Prevent scrolling when menu is open on mobile
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    });
});

// Sticky Header & Scroll to Top Button Visibility
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Header changes on scroll
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/hide scroll to top button
    if (scrollPosition > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
    
    // Active nav link on scroll
    updateActiveNavLink();
});

// Update Active Navigation Link on Scroll
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        // Adjust the offset for better accuracy on mobile
        const headerOffset = isMobile() ? 60 : 100;
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    animateOnScroll();
    adjustForScreenSize(); // Initial adjustment
    
    // Initialize AOS (Animate on Scroll)
    initAOS();
});

// Handle window resize events
window.addEventListener('resize', () => {
    // Debounce the resize event for better performance
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        adjustForScreenSize();
        updateActiveNavLink();
    }, 250);
    
    // Close mobile menu on resize
    if (!isMobile() && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
});

// Smooth Scroll for Internal Links with better mobile handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Different header offset for mobile vs desktop
        const headerOffset = isMobile() ? 60 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Contact Form Submission with Animation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission (replace with actual submission logic)
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Show success message
            const formGroups = this.querySelectorAll('.form-group');
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Your message has been sent successfully! We will contact you soon.</p>
            `;
            
            // Apply success styles (mobile-friendly)
            successMessage.style.display = 'flex';
            successMessage.style.alignItems = 'center'; 
            successMessage.style.backgroundColor = '#d4edda';
            successMessage.style.color = '#155724';
            successMessage.style.padding = isMobile() ? '10px' : '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginBottom = '20px';
            successMessage.style.animation = 'fadeIn 0.5s ease';
            successMessage.style.flexWrap = isMobile() ? 'wrap' : 'nowrap';
            successMessage.style.textAlign = isMobile() ? 'center' : 'left';
            
            successMessage.querySelector('i').style.fontSize = isMobile() ? '1.2rem' : '1.5rem';
            successMessage.querySelector('i').style.marginRight = isMobile() ? '8px' : '15px';
            successMessage.querySelector('i').style.color = '#28a745';
            
            if (isMobile()) {
                successMessage.querySelector('i').style.margin = '0 auto 10px';
                successMessage.querySelector('p').style.width = '100%';
                successMessage.querySelector('p').style.fontSize = '14px';
            }
            
            // Insert before the first form group
            this.insertBefore(successMessage, formGroups[0]);
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 5000);
        }, 2000);
    });
}

// Animate Elements on Scroll - Improved for mobile
function animateOnScroll() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-img, .about-content, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay animation slightly on mobile for better performance
                const delay = isMobile() ? 100 : 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: isMobile() ? 0.1 : 0.2, // Lower threshold on mobile
        rootMargin: isMobile() ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Initialize AOS (Animate on Scroll) Library with mobile optimizations
function initAOS() {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: isMobile() ? 600 : 800, // Faster animations on mobile
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: false, // Enable on all devices but with optimized settings
            offset: isMobile() ? 30 : 50
        });
    }
}

// Scroll to Top Button Functionality
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Adjust position on mobile devices
    scrollTopBtn.style.bottom = isMobile() ? '15px' : '30px';
    scrollTopBtn.style.right = isMobile() ? '15px' : '30px';
    scrollTopBtn.style.padding = isMobile() ? '8px 10px' : '10px 15px';
}

// Service Cards Hover Effects - Modified for touch devices
serviceCards.forEach(card => {
    // Use touchstart for mobile devices
    if ('ontouchstart' in window) {
        card.addEventListener('touchstart', () => {
            // Remove hover class from all other cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('hover');
                }
            });
            // Toggle hover class on current card
            card.classList.toggle('hover');
        });
    } else {
        // Use mouseenter/mouseleave for non-touch devices
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    }
});

// Testimonial Slider - Mobile optimized
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-item');
    const totalSlides = slides.length;
    const dots = document.querySelector('.slider-dots');
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Add touch swipe functionality for mobile
    testimonialSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        }
    }
    
    // Create navigation dots
    if (totalSlides > 1) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dots.appendChild(dot);
            
            // Make dots bigger on mobile for easier tapping
            if (isMobile()) {
                dot.style.width = '12px';
                dot.style.height = '12px';
                dot.style.margin = '0 8px';
            }
            
            // Add click event to dots
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }
        
        // Automatic slide change - slower on mobile
        const slideInterval = isMobile() ? 6000 : 5000;
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, slideInterval);
    }
    
    // Function to change slides
    function goToSlide(slideIndex) {
        // Update slides with better transition for mobile
        slides.forEach((slide, index) => {
            slide.style.transition = isMobile() ? 'transform 0.4s ease' : 'transform 0.5s ease';
            slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
        });
        
        // Update dots
        const allDots = dots.querySelectorAll('.slider-dot');
        allDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
        
        currentSlide = slideIndex;
    }
    
    // Initialize slides
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
        
        // Adjust padding for mobile
        if (isMobile()) {
            slide.style.padding = '20px 15px';
        }
    });
}

// Load Google Maps API if map element exists - with responsive sizing
const mapElement = document.getElementById('contact-map');
if (mapElement) {
    // Set responsive height
    mapElement.style.height = isMobile() ? '250px' : '400px';
    
    function initMap() {
        // Replace with company coordinates
        const companyLocation = { lat: 40.7128, lng: -74.0060 };
        
        const map = new google.maps.Map(mapElement, {
            zoom: isMobile() ? 14 : 15, // Slightly zoomed out on mobile
            center: companyLocation,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f5f5f5" }]
                },
                // More map styles can be added here
            ],
            // Disable some controls on mobile for better user experience
            zoomControl: !isMobile(),
            mapTypeControl: !isMobile(),
            fullscreenControl: !isMobile()
        });
        
        const marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: 'North Star Transport Ltd',
            icon: {
                url: 'images/map-marker.png',
                // Smaller marker on mobile
                scaledSize: new google.maps.Size(isMobile() ? 30 : 40, isMobile() ? 30 : 40)
            }
        });
    }
    
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
}

// FAQ Section Accordion - Mobile Optimized
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    // Adjust padding on mobile
    if (isMobile()) {
        question.style.padding = '12px 15px';
        item.querySelector('.faq-answer').style.padding = '0 15px 15px';
    }
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// Add smooth animation to page transitions
window.addEventListener('beforeunload', (event) => {
    document.body.classList.add('page-transition');
});

// Animation keyframes for page elements - differentiated for mobile
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(${isMobile() ? '10px' : '20px'}); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(${isMobile() ? '-10px' : '-20px'}); }
    }
    
    .animated {
        animation: fadeIn ${isMobile() ? '0.6s' : '0.8s'} ease forwards;
    }
    
    /* Mobile-specific styles */
    @media (max-width: 768px) {
        .animated {
            animation-duration: 0.6s;
        }
        
        /* Fix overflow issues on mobile */
        body, html {
            overflow-x: hidden;
            width: 100%;
        }
        
        /* Ensure sections don't overflow horizontally */
        section {
            width: 100%;
            box-sizing: border-box;
        }
    }
</style>
`);

// Add viewport meta tag if missing (critical for responsive design)
if (!document.querySelector('meta[name="viewport"]')) {
    const metaViewport = document.createElement('meta');
    metaViewport.name = 'viewport';
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(metaViewport);
}
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class after a slight delay for animation effect
    setTimeout(function() {
        document.getElementById('customers').classList.add('loaded');
    }, 300);
});
</script>
// Contact Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('form-response');
    
    if (contactForm) {
        // Add animation to form inputs
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
                const icon = this.parentElement.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#4a90e2';
                }
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
                const icon = this.parentElement.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#999';
                }
            });
        });
        
        // Form validation and submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('input-error');
                    
                    setTimeout(() => {
                        input.classList.remove('input-error');
                    }, 3000);
                }
            });
            
            // Email validation
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    valid = false;
                    emailInput.classList.add('input-error');
                    
                    setTimeout(() => {
                        emailInput.classList.remove('input-error');
                    }, 3000);
                }
            }
            
            // If valid, show success message (in a real application, you would send data to server)
            if (valid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate AJAX request
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formResponse.classList.remove('hidden');
                    formResponse.classList.add('fadeIn');
                    
                    // Reset form
                    contactForm.reset();
                }, 2000);
            }
        });
    }
    
    // Add animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards.length > 0) {
        infoCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fadeInUp');
        });
    }
});

// Add these animation classes to your CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .fadeIn {
        animation: fadeIn 0.5s forwards;
    }
    
    .fadeInUp {
        opacity: 0;
        animation: fadeInUp 0.5s forwards;
    }
    
    .input-focused {
        background-color: rgba(74, 144, 226, 0.03);
    }
    
    .input-error {
        border-color: #ff4d4d !important;
        box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.1) !important;
        animation: shake 0.3s forwards;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }
</style>
`);
