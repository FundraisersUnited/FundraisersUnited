// Fundraisers United - Mobile JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menuItems = document.querySelectorAll('.menu-items a');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');
    const profileToggle = document.querySelector('.profile-highlights-toggle');
    const profileHighlights = document.querySelector('.profile-highlights');
    
    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close menu functions
    const closeMenuFunction = () => {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    };
    
    closeMenu.addEventListener('click', closeMenuFunction);
    menuOverlay.addEventListener('click', closeMenuFunction);
    menuItems.forEach(item => item.addEventListener('click', closeMenuFunction));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.mobile-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Update active nav based on scroll position
        updateActiveNavOnScroll();
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update active bottom nav item based on scroll position
    const updateActiveNavOnScroll = () => {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update bottom nav active state
        bottomNavItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href').substring(1); // Remove # from href
            
            if (href === currentSectionId) {
                item.classList.add('active');
            }
        });
    };
    
    // Toggle leadership profile details
    if (profileToggle && profileHighlights) {
        profileToggle.addEventListener('click', () => {
            profileHighlights.style.display = profileHighlights.style.display === 'block' ? 'none' : 'block';
            profileToggle.classList.toggle('active');
            
            // Change text based on state
            const toggleText = profileToggle.querySelector('span');
            toggleText.textContent = profileHighlights.style.display === 'block' ? 'Read less' : 'Read more';
        });
    }
    
    // Add fade-in animations on scroll
    const animateElements = () => {
        const elementsToAnimate = document.querySelectorAll('.service-card, .approach-item, .dignity-benefit-item, .stat-item');
        
        elementsToAnimate.forEach(element => {
            if (!element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
            }
            
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run animation check on load and scroll
    animateElements();
    window.addEventListener('scroll', animateElements);
    
    // Form handling with touch-friendly focus states
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        // Handle focus/blur events for form inputs
        formInputs.forEach(input => {
            // Check initial state
            if (input.value !== '') {
                input.classList.add('has-value');
                input.parentElement.classList.add('focused');
            }
            
            // Focus events
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
                // Ensure the label is fully visible
                const label = input.parentElement.querySelector('label');
                if (label) {
                    label.style.color = 'var(--text-light)';
                    label.style.opacity = '1';
                }
            });
            
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                } else {
                    input.parentElement.classList.add('focused');
                    input.classList.add('has-value');
                }
            });
            
            // For select elements, ensure the options are visible
            if (input.tagName.toLowerCase() === 'select') {
                input.style.color = 'var(--text-light)';
                input.style.opacity = '1';
                
                // Also ensure options have good contrast
                const options = input.querySelectorAll('option');
                options.forEach(option => {
                    option.style.color = '#333';
                    option.style.backgroundColor = '#fff';
                });
            }
        });
        
        // Ensure all labels are visible
        const labels = contactForm.querySelectorAll('label');
        labels.forEach(label => {
            label.style.color = 'var(--text-light)';
            label.style.opacity = '1';
        });
        
        // Handle form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Use FormSubmit service for form handling
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
                // Show success message
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
                
                // Insert error message after the button
                submitBtn.parentNode.insertBefore(errorMessage, submitBtn.nextSibling);
                
                console.error('Error:', error);
            });
        });
    }
    
    // Animate stat numbers on scroll into view
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const startTime = performance.now();
        
        // Convert string with possible suffix to number and suffix
        const targetText = element.textContent;
        const targetNum = parseFloat(targetText.replace(/[^\d.-]/g, ''));
        const suffix = targetText.replace(/[\d.-]/g, '');
        
        const step = (timestamp) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            // Calculate current value
            const current = start + (targetNum - start) * easedProgress;
            
            // Update display with appropriate formatting
            element.textContent = targetText.includes('.') 
                ? current.toFixed(2) + suffix 
                : Math.floor(current) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    };
    
    // Initialize counter animation when stats section comes into view
    const statsSection = document.querySelector('#stats');
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    animateCounter(stat, stat.textContent);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Add touch feedback to buttons and cards
    const addTouchFeedback = (elements) => {
        elements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });
            
            const endTouch = () => element.classList.remove('touch-active');
            
            element.addEventListener('touchend', endTouch, { passive: true });
            element.addEventListener('touchcancel', endTouch, { passive: true });
        });
    };
    
    // Apply touch feedback to interactive elements
    addTouchFeedback(document.querySelectorAll('.btn-primary, .btn-secondary, .btn-mobile, .service-card, .approach-item, .dignity-benefit-item'));
    
    // Initialize the active bottom nav item on page load
    updateActiveNavOnScroll();
    
    // Fix for contact form in mobile view to ensure labels and inputs are visible
    const fixContactForm = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            // Ensure form elements have sufficient contrast
            const formElements = contactSection.querySelectorAll('input, textarea, select');
            formElements.forEach(element => {
                element.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                element.style.border = '1px solid rgba(255, 255, 255, 0.3)';
                element.style.color = 'white';
                
                // Ensure placeholder text is visible
                element.setAttribute('placeholder', element.getAttribute('placeholder') || '');
            });
            
            // Make sure labels are visible
            const labels = contactSection.querySelectorAll('label');
            labels.forEach(label => {
                label.style.color = 'white';
                label.style.opacity = '1';
                label.style.fontWeight = '500';
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
    
    // Form display and functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Ensure contact form fields are visible
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            const formElements = contactForm.querySelectorAll('input, select, textarea');
            formElements.forEach(el => {
                // Ensure proper styling for form elements
                el.style.display = 'block';
                el.style.width = '100%';
                el.style.boxSizing = 'border-box';
                
                // Force select elements to show properly
                if (el.tagName === 'SELECT') {
                    el.style.appearance = 'auto';
                    el.style.webkitAppearance = 'menulist';
                    el.style.mozAppearance = 'menulist';
                }
            });
        }
    });
}); 