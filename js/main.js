document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change hamburger icon to X when menu is open
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
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
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add fixed navigation on scroll
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('fixed-nav');
            } else {
                nav.classList.remove('fixed-nav');
            }
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type === 'email' && formElements[i].value.trim()) {
                    // Simple email validation
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(formElements[i].value.trim())) {
                        isValid = false;
                        formElements[i].classList.add('error');
                    } else {
                        formElements[i].classList.remove('error');
                    }
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // In a real implementation, you would send the form data to a server
                // For now, we'll just show a success message
                const formWrapper = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i><p>Thank you for your message! We will get back to you soon.</p>';
                
                formWrapper.innerHTML = '';
                formWrapper.appendChild(successMessage);
            }
        });
    }
    
    // Add animation on scroll
    const animateElements = document.querySelectorAll('.service-card, .approach-item, .stat-item');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on initial load
}); 