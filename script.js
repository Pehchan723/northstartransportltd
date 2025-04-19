// JavaScript for North Star Transport Ltd Website

// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.querySelector('.scroll-top');
const sections = document.querySelectorAll('section');
const serviceCards = document.querySelectorAll('.service-card');
const contactForm = document.querySelector('.contact-form form');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
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
        const sectionTop = section.offsetTop - 100;
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
    
    // Initialize AOS (Animate on Scroll)
    initAOS();
});

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        const headerOffset = 80;
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
            
            // Apply success styles
            successMessage.style.display = 'flex';
            successMessage.style.alignItems = 'center';
            successMessage.style.backgroundColor = '#d4edda';
            successMessage.style.color = '#155724';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.marginBottom = '20px';
            successMessage.style.animation = 'fadeIn 0.5s ease';
            
            successMessage.querySelector('i').style.fontSize = '1.5rem';
            successMessage.querySelector('i').style.marginRight = '15px';
            successMessage.querySelector('i').style.color = '#28a745';
            
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

// Animate Elements on Scroll
function animateOnScroll() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-img, .about-content, .contact-info, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Initialize AOS (Animate on Scroll) Library
function initAOS() {
    // Check if AOS is available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
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
}

// Service Cards Hover Effects
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover');
    });
});

// Testimonial Slider
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll('.testimonial-item');
    const totalSlides = slides.length;
    const dots = document.querySelector('.slider-dots');
    
    // Create navigation dots
    if (totalSlides > 1) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dots.appendChild(dot);
            
            // Add click event to dots
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }
        
        // Automatic slide change
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }, 5000);
    }
    
    // Function to change slides
    function goToSlide(slideIndex) {
        // Update slides
        slides.forEach((slide, index) => {
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
    });
}

// Load Google Maps API if map element exists
const mapElement = document.getElementById('contact-map');
if (mapElement) {
    function initMap() {
        // Replace with company coordinates
        const companyLocation = { lat: 40.7128, lng: -74.0060 };
        
        const map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: companyLocation,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f5f5f5" }]
                },
                // More map styles can be added here
            ]
        });
        
        const marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: 'North Star Transport Ltd',
            icon: {
                url: 'images/map-marker.png',
                scaledSize: new google.maps.Size(40, 40)
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

// FAQ Section Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
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

// Animation keyframes for page elements
document.head.insertAdjacentHTML('beforeend', `
<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    .animated {
        animation: fadeIn 0.8s ease forwards;
    }
</style>
`);