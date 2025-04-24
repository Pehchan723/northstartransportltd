// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggling
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll to top button functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
        
        // Header scroll effects
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Activate animation when elements are in viewport
        activateAnimationsOnScroll();
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize animations for elements that should animate on scroll
    function activateAnimationsOnScroll() {
        const elements = document.querySelectorAll('.value-card, .choose-item, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 100) {
                if (!element.style.animationPlayState || element.style.animationPlayState === 'paused') {
                    element.style.animationPlayState = 'running';
                }
            }
        });
    }
    
    // Initialize animations when page loads
    setTimeout(() => {
        activateAnimationsOnScroll();
    }, 100);
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const value = stat.textContent;
            const numValue = parseFloat(value.replace(/,/g, '').replace(/\+/g, ''));
            let startValue = 0;
            let duration = 2000;
            let startTime = null;
            
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                let currentValue = Math.floor(progress * numValue);
                
                if (value.includes('+')) {
                    stat.textContent = currentValue + '+';
                } else {
                    // If number is a percentage
                    if (value.includes('%')) {
                        stat.textContent = currentValue + '%';
                    } else {
                        stat.textContent = currentValue.toLocaleString();
                    }
                }
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        window.requestAnimationFrame(step);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Run counter animation when stats are in view
    if (statNumbers.length > 0) {
        animateCounters();
    }
    
    // Add parallax effect to hero section
    const aboutHero = document.querySelector('.about-hero');
    if (aboutHero) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            aboutHero.style.backgroundPositionY = scrollY * 0.5 + 'px';
        });
    }
    
    // Add hover effects for grid items
    const gridItems = document.querySelectorAll('.value-card, .choose-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Image zoom effect on hover
    const zoomImages = document.querySelectorAll('.zoom-image');
    zoomImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.5s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                isValid = false;
            } else {
                nameInput.classList.remove('error');
            }
            
            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailInput.classList.add('error');
                isValid = false;
            } else {
                emailInput.classList.remove('error');
            }
            
            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                isValid = false;
            } else {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                // In a real application, you would submit the form data here
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you! Your message has been sent.';
                    contactForm.appendChild(successMessage);
                    
                    // Remove success message after 3 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Initialize AOS (Animate on Scroll) if it's included
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Initialize lightbox for gallery images if any
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = this.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', () => lightbox.remove());
                
                lightbox.appendChild(lightboxImg);
                lightbox.appendChild(closeBtn);
                document.body.appendChild(lightbox);
                
                // Close lightbox when clicking outside the image
                lightbox.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.remove();
                    }
                });
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slide-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Auto-advance slides
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Click on dots to change slides
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
});