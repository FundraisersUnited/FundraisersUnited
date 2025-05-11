// Fundraisers United - Desktop JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const navContainer = document.querySelector('.nav-container');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navContainer.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navigation background change on scroll
        if (scrollTop > 50) {
            navContainer.style.background = 'rgba(30, 30, 44, 0.98)';
            navContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
        } else {
            navContainer.style.background = 'rgba(30, 30, 44, 0.95)';
            navContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
        
        // Active link highlighting
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        lastScrollTop = scrollTop;
    });
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        // Add focus class to form inputs
        formInputs.forEach(input => {
            // Initial check for pre-filled inputs
            if (input.value !== '') {
                input.classList.add('has-value');
                input.parentElement.classList.add('focused');
            }
            
            // Focus events
            input.addEventListener('focus', () => {
                input.classList.add('focused');
                input.parentElement.classList.add('focused');
                
                // Ensure the label is visible
                const label = input.parentElement.querySelector('label');
                if (label) {
                    label.style.color = 'var(--text-light)';
                    label.style.opacity = '1';
                }
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.classList.remove('focused');
                    input.classList.remove('has-value');
                } else {
                    input.classList.add('has-value');
                }
            });
            
            // For select elements, ensure options are visible
            if (input.tagName.toLowerCase() === 'select') {
                input.style.color = 'var(--text-light)';
                
                // Set option colors for better visibility
                const options = input.querySelectorAll('option');
                options.forEach(option => {
                    option.style.backgroundColor = '#333';
                    option.style.color = 'white';
                });
            }
        });
        
        // Ensure all labels are visible
        const labels = contactForm.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = 'var(--text-light)';
            label.style.opacity = '1';
            label.style.fontWeight = '500';
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Use FormSubmit service for handling the form
            const formData = new FormData(contactForm);
            
            fetch(contactForm.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <p>Thank you for your message! We will get back to you soon.</p>
                    </div>
                `;
            })
            .catch(error => {
                // Error handling
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'There was a problem sending your message. Please try again later.';
                
                // Insert error after submit button
                submitBtn.parentNode.insertBefore(errorMessage, submitBtn.nextSibling);
                
                console.error('Error:', error);
            });
        });
    }
    
    // Scroll reveal animations
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.service-card, .approach-item, .dignity-benefit-item, .stat-item');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('scroll-up');
                
                // Add a slight delay to each item for a cascade effect
                const items = element.parentNode.children;
                const index = Array.from(items).indexOf(element);
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    };
    
    // Run animation check on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Counter animation for stats
    const animateCounters = () => {
        const statNumbers = document.querySelectorAll('.stat-item h3');
        
        statNumbers.forEach(stat => {
            // Extract numeric value and suffix
            const value = stat.textContent;
            const numericPart = parseFloat(value.replace(/[^\d.-]/g, ''));
            const suffix = value.replace(/[\d.-]/g, '');
            
            // Animation setup
            let startValue = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            // Animation function
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Easing function for smooth counting
                const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                // Calculate current value
                const currentValue = startValue + (numericPart - startValue) * easedProgress;
                
                // Update the counter value
                stat.textContent = currentValue.toFixed(value.includes('.') ? 2 : 0) + suffix;
                
                // Continue animation if not complete
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            // Start the animation
            requestAnimationFrame(updateCounter);
        });
    };
    
    // Initialize counter animation when stats section comes into view
    const statsSection = document.querySelector('#stats');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Add active class to navigation on page load based on URL hash
    const hash = window.location.hash;
    if (hash) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }

    // Fix for contact form in desktop view to ensure labels and inputs are visible
    const fixContactForm = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            // Ensure form elements have sufficient contrast
            const formElements = contactSection.querySelectorAll('input, textarea, select');
            formElements.forEach(element => {
                element.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                element.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                element.style.color = 'white';
            });
            
            // Make sure the submit button is clearly visible
            const submitButton = contactSection.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.style.backgroundColor = 'var(--primary)';
                submitButton.style.color = 'white';
                submitButton.style.fontWeight = 'bold';
                submitButton.style.padding = '16px';
            }
        }
    };
    
    // Run the fix on page load
    fixContactForm();
}); 