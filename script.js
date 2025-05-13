
//    MAIN JAVASCRIPT FILE FOR BellaLuxury Wedding Floral  WEBSITE
   

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle menu icon between bars and times (X)
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle && menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            // Reset icon
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Testimonial Slider
    initTestimonialSlider();
    
    // Accordion (FAQ) Functionality
    initAccordion();
    
    // Gallery Filter Functionality
    initGalleryFilter();
    
    // Contact Form Validation and Submission
    initContactForm();
    
    // Add smooth scrolling for all anchor links
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
});

/* --- TESTIMONIAL SLIDER --- */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    if (testimonials.length === 0 || dots.length === 0) return;
    
    // Initialize dots click event
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });
    
    // Auto rotate testimonials every 6 seconds
    let sliderInterval = setInterval(nextTestimonial, 6000);
    
    // Reset interval on manual navigation
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', function() {
        clearInterval(sliderInterval);
    });
    
    document.querySelector('.testimonial-slider').addEventListener('mouseleave', function() {
        sliderInterval = setInterval(nextTestimonial, 6000);
    });
    
    function nextTestimonial() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }
    
    function showTestimonial(index) {
        // Hide all testimonials and deactivate all dots
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show selected testimonial and activate corresponding dot
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
}

// ACCORDION FUNCTIONALITY 
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length === 0) return;
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Toggle active class on the clicked item
            const isActive = item.classList.contains('active');
            
            // Close all items first (optional - remove this part for multiple open accordions)
            accordionItems.forEach(accordion => {
                accordion.classList.remove('active');
                const content = accordion.querySelector('.accordion-content');
                content.style.maxHeight = 0;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Open first accordion item by default (optional)
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
        const firstContent = accordionItems[0].querySelector('.accordion-content');
        if (firstContent) {
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }
    }
}

/* --- GALLERY FILTER --- */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-image');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Activate "All" filter by default
    const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilter) {
        allFilter.classList.add('active');
    }
}

/* --- CONTACT FORM VALIDATION & SUBMISSION --- */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset form messages
        hideFormMessages();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            simulateFormSubmission();
        }
    });
    
    function validateForm() {
        let valid = true;
        
        // Basic validation for required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                valid = false;
                emailField.classList.add('error');
                showErrorMessage('Please enter a valid email address.');
            }
        }
        
        // Phone validation (optional)
        const phoneField = contactForm.querySelector('input[name="phone"]');
        if (phoneField && phoneField.value.trim()) {
            // Simple validation - checks for at least 10 digits
            const phonePattern = /^\d{10,}$/;
            if (!phonePattern.test(phoneField.value.replace(/\D/g, ''))) {
                valid = false;
                phoneField.classList.add('error');
                showErrorMessage('Please enter a valid phone number.');
            }
        }
        
        if (!valid) {
            showErrorMessage('Please check the highlighted fields.');
        }
        
        return valid;
    }
    
    function simulateFormSubmission() {
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate server communication delay
        setTimeout(function() {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showSuccessMessage('Thank you! Your message has been sent successfully. We will contact you shortly.');
            
            // Reset form fields
            contactForm.reset();
        }, 1500);
    }
    
    function showSuccessMessage(message) {
        const successMessage = document.querySelector('.form-message.success');
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            // Auto hide after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function showErrorMessage(message) {
        const errorMessage = document.querySelector('.form-message.error');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }
    
    function hideFormMessages() {
        const messages = document.querySelectorAll('.form-message');
        messages.forEach(message => {
            message.style.display = 'none';
        });
    }
    
    // Add real-time validation feedback
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
            
            // Email validation on blur
            if (this.type === 'email' && this.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(this.value)) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            }
        });
    });
}

// SCROLL ANIMATIONS 
// Detect when elements come into view and add animation classes
window.addEventListener('scroll', debounce(checkScroll, 50));
window.addEventListener('resize', debounce(checkScroll, 50));

function checkScroll() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    animateElements.forEach(element => {
        if (isElementInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Helper function to limit expensive calculations
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

/* --- MOBILE MENU CSS --- */
// Add CSS for mobile menu that was missing in the original CSS
(function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu {
            transition: all 0.3s ease;
        }
        
        @media (max-width: 767px) {
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                padding: 1rem 0;
                display: none;
                flex-direction: column;
                z-index: 100;
            }
            
            .nav-menu.active {
                display: flex;
            }
            
            .nav-menu li {
                margin: 0.5rem 0;
            }
            
            .menu-toggle i {
                transition: all 0.3s ease;
            }
        }
        
        /* Style for form validation */
        input.error, select.error, textarea.error {
            border-color: #e74c3c;
        }
        
        /* Animation classes */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
})();

// Run initial check for scroll animations
checkScroll();