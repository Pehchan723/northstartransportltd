// Complete JavaScript for North Star Transport Ltd Website with Fixed Mobile Menu
document.addEventListener('DOMContentLoaded', initWebsite);

// The main initialization function - can be called at any point to reinitialize components
function initWebsite() {
    console.log('Initializing website components...');
    
    // Initialize core components
    initMobileMenu();
    initScrollEffects();
    initStickyHeader();
    initSmoothScroll();
    initScrollTopButton();
    initServiceCards();
    initTestimonialSlider();
    initContactForm();
    initFaqAccordion();
    initAnimations();
    initResponsiveAdjustments();
    
    // Add essential meta tag if missing
    addViewportMetaTag();
    
    // Add essential styles for animations and effects
    addEssentialStyles();
    
    console.log('Website JS initialization complete');
}

// ----- Core Functions -----

// Mobile Menu Initialization - Fixed to work across all pages
function initMobileMenu() {
    // Find menu toggle button (checking multiple possible class names)
    const menuToggle = document.querySelector('.hamburger') || 
                       document.querySelector('.navbar-toggler') || 
                       document.querySelector('#mobile-menu-toggle') || 
                       document.querySelector('header .menu-toggle');
    
    // Find mobile menu container
    const mobileMenu = document.querySelector('.nav-menu') || 
                       document.querySelector('.navbar-collapse') || 
                       document.querySelector('#mobile-menu') || 
                       document.querySelector('.mobile-nav') || 
                       document.querySelector('.main-menu');
                       
    console.log('Menu Button Found:', menuToggle ? true : false);
    console.log('Mobile Menu Found:', mobileMenu ? true : false);
    
    if (!menuToggle || !mobileMenu) {
        console.error('Mobile menu elements not found. Check your HTML classes.');
        return;
    }
    
    // Remove existing event listeners to prevent duplication
    const newMenuToggle = menuToggle.cloneNode(true);
    if (menuToggle.parentNode) {
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    }
    
    // Ensure the menu starts in a closed state on page load
    mobileMenu.classList.remove('active', 'show');
    newMenuToggle.classList.remove('active');
    
    // Add click event to toggle button
    newMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); // Stop event from bubbling
        
        // Toggle active classes
        mobileMenu.classList.toggle('active');
        mobileMenu.classList.toggle('show'); 
        newMenuToggle.classList.toggle('active');
        
        console.log('Menu toggle clicked - new state:', mobileMenu.classList.contains('active') ? 'open' : 'closed');
        
        // Toggle body scroll
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Handle clicks on navigation links using event delegation
    mobileMenu.addEventListener('click', function(e) {
        const linkClicked = e.target.tagName === 'A' || e.target.closest('a');
        
        if (linkClicked) {
            console.log('Nav link clicked, closing menu');
            
            // For hash links (page anchors), prevent default behavior and scroll programmatically
            const clickedLink = e.target.tagName === 'A' ? e.target : e.target.closest('a');
            const href = clickedLink.getAttribute('href');
            
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Close menu first
                    mobileMenu.classList.remove('active', 'show');
                    newMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Then scroll to target with a slight delay
                    setTimeout(() => {
                        const headerOffset = isMobile() ? 60 : 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            } else {
                // For normal page links, just close the menu
                mobileMenu.classList.remove('active', 'show');
                newMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !newMenuToggle.contains(e.target)) {
            
            mobileMenu.classList.remove('active', 'show');
            newMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Clicked outside menu - closing');
        }
    });
    
    // Inject essential mobile menu styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @media (max-width: 768px) {
            /* Make menu button visible and clickable */
            .hamburger, .navbar-toggler, #mobile-menu-toggle, header .menu-toggle {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                cursor: pointer;
                z-index: 1000;
                position: relative;
            }
            
            /* Mobile menu positioning */
            .nav-menu, .navbar-collapse, #mobile-menu, .mobile-nav, .main-menu {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                z-index: 999;
                transition: right 0.3s ease;
                padding-top: 60px;
                overflow-y: auto;
            }
            
            /* Active mobile menu - ensure this overrides any other styles */
            .nav-menu.active, .navbar-collapse.active, #mobile-menu.active, .mobile-nav.active, .main-menu.active,
            .nav-menu.show, .navbar-collapse.show, #mobile-menu.show, .mobile-nav.show, .main-menu.show {
                right: 0 !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            
            /* Menu items styling */
            .nav-menu a, .navbar-collapse a, #mobile-menu a, .mobile-nav a, .main-menu a {
                display: block;
                padding: 12px 20px;
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }
        }
    `;
    document.head.appendChild(styleElement);
}

// Helper function to detect mobile devices
function isMobile() {
    return window.innerWidth <= 768;
}

// Scroll effects - update active states based on scroll position
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .nav-menu a, .navbar-nav a, header nav a');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Update active nav link on scroll
        sections.forEach(section => {
            if (!section.id) return;
            
            const headerOffset = isMobile() ? 60 : 100;
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Sticky header initialization
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const headerOffset = isMobile() ? 60 : 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll to top button
function initScrollTopButton() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Adjust button size and position for mobile
    if (isMobile()) {
        scrollTopBtn.style.bottom = '15px';
        scrollTopBtn.style.right = '15px';
        scrollTopBtn.style.padding = '8px 10px';
    } else {
        scrollTopBtn.style.bottom = '30px';
        scrollTopBtn.style.right = '30px';
        scrollTopBtn.style.padding = '10px 15px';
    }
}

// Service cards effects
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    if (!serviceCards.length) return;
    
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
        
        // Adjust for mobile display
        if (isMobile()) {
            card.style.height = 'auto';
            card.style.margin = '0 0 20px 0';
        } else {
            card.style.height = '100%';
            card.style.margin = '0 15px';
        }
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (!testimonialSlider) return;
    
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-item');
    const totalSlides = slides.length;
    const dots = document.querySelector('.slider-dots');
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Skip if no slides found
    if (!totalSlides) return;
    
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
    if (totalSlides > 1 && dots) {
        // Clear existing dots first
        dots.innerHTML = '';
        
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
        const intervalId = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, slideInterval);
        
        // Clear interval when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(intervalId);
            } else {
                // Restart interval when page becomes visible again
                setInterval(() => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    goToSlide(currentSlide);
                }, slideInterval);
            }
        });
    }
    
    // Function to change slides
    function goToSlide(slideIndex) {
        // Update slides with better transition for mobile
        slides.forEach((slide, index) => {
            slide.style.transition = isMobile() ? 'transform 0.4s ease' : 'transform 0.5s ease';
            slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
        });
        
        // Update dots
        if (dots) {
            const allDots = dots.querySelectorAll('.slider-dot');
            allDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
        }
        
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
    
    // Adjust testimonial items for mobile
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    if (testimonialItems.length) {
        testimonialItems.forEach(item => {
            item.style.padding = isMobile() ? '15px' : '30px';
        });
    }
}

// Contact form handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form') || document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add animation to form inputs
    const formInputs = contactForm.querySelectorAll('.form-control, input, textarea, select');
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            const parent = this.parentElement;
            if (parent) {
                parent.classList.add('input-focused');
                const icon = parent.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#4a90e2';
                }
            }
        });
        
        input.addEventListener('blur', function() {
            const parent = this.parentElement;
            if (parent) {
                parent.classList.remove('input-focused');
                const icon = parent.querySelector('.input-icon');
                if (icon) {
                    icon.style.color = '#999';
                }
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
        const emailInput = contactForm.querySelector('[type="email"], #email');
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
        
        // If valid, show success message
        if (valid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn, [type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            
                // Simulate AJAX request
                setTimeout(() => {
                    // Create success message
                    const formResponse = document.getElementById('form-response') || document.createElement('div');
                    formResponse.id = 'form-response';
                    formResponse.className = 'success-message fadeIn';
                    formResponse.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <p>Your message has been sent successfully! We will contact you soon.</p>
                    `;
                    
                    // Add success message to page
                    if (!document.getElementById('form-response')) {
                        contactForm.parentNode.appendChild(formResponse);
                    }
                    
                    // Hide form if needed
                    if (document.getElementById('form-response')) {
                        contactForm.style.display = 'none';
                    }
                    
                    // Reset form
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        }
    });
    
    // Adjust contact form padding for mobile
    const contactFormEl = document.querySelector('.contact-form');
    if (contactFormEl) {
        contactFormEl.style.padding = isMobile() ? '20px 15px' : '40px';
    }
}

// FAQ accordion
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // Adjust padding on mobile
        if (question && isMobile()) {
            question.style.padding = '12px 15px';
            
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.padding = '0 15px 15px';
            }
        }
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        answer.style.maxHeight = null;
                    }
                }
            });
        }
    });
}

// Initialize animations
function initAnimations() {
    // Animate elements on scroll
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-img, .about-content, .contact-info, .contact-form');
    
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers that don't support IntersectionObserver
        elementsToAnimate.forEach(element => {
            element.classList.add('animated');
        });
        return;
    }
    
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
    
    // Initialize AOS if available
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
    
    // Initialize customers section animation
    const customersSection = document.getElementById('customers');
    if (customersSection) {
        setTimeout(function() {
            customersSection.classList.add('loaded');
        }, 300);
    }
}

// Responsive adjustments for different screen sizes
function initResponsiveAdjustments() {
    const sections = document.querySelectorAll('section');
    
    // Adjust sections for mobile
    sections.forEach(section => {
        section.style.minHeight = isMobile() ? 'auto' : '100vh';
        section.style.padding = isMobile() ? '60px 20px' : '80px 50px';
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize components that need to adjust for screen size
            initMobileMenu();
            sections.forEach(section => {
                section.style.minHeight = isMobile() ? 'auto' : '100vh';
                section.style.padding = isMobile() ? '60px 20px' : '80px 50px';
            });
        }, 250);
    });
}

// Add viewport meta tag if missing
function addViewportMetaTag() {
    if (!document.querySelector('meta[name="viewport"]')) {
        const metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(metaViewport);
    }
}

// Add essential styles for animations
function addEssentialStyles() {
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
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
        
        .fadeIn {
            animation: fadeIn 0.5s forwards;
        }
        
        .fadeInUp {
            opacity: 0;
            animation: fadeInUp 0.5s forwards;
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
        
        /* Mobile specific styles */
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
        
        /* Fix for page transitions */
        .page-transition {
            transition: opacity 0.3s ease;
        }
        
        /* Force menu visibility on all pages */
        @media (max-width: 768px) {
            header .hamburger,
            header .navbar-toggler,
            header #mobile-menu-toggle,
            header .menu-toggle {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative;
                z-index: 1001;
            }
        }
    `;
    document.head.appendChild(animationStyles);
}

// Call init on page refresh or back button press
window.addEventListener('pageshow', function(event) {
    // Check if the page is being loaded from cache
    if (event.persisted) {
        console.log('Page loaded from back/forward cache, reinitializing components');
        initWebsite();
    }
});

// Force reinit on hash change (for SPA compatibility)
window.addEventListener('hashchange', function() {
    console.log('Hash changed, reinitializing components');
    initWebsite();
});

// Make init function globally accessible for manual triggering if needed
window.initNorthStarWebsite = initWebsite;
