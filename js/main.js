document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle with improved behavior
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
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
            
            // Ensure nav links are visible when active
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
            } else {
                setTimeout(() => {
                    navLinks.style.display = '';
                }, 300); // Match transition duration
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInside = navLinks.contains(e.target) || navToggle.contains(e.target);
            
            if (!isClickInside && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                setTimeout(() => {
                    navLinks.style.display = '';
                }, 300);
            }
        });
    }
    
    // FIXED NAV: Force the fixed navigation to show immediately when page loads if scrolled
    function forceShowFixedNav() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (header && nav) {
            const scrollHeight = window.pageYOffset;
            const headerHeight = header.offsetHeight;
            
            if (scrollHeight > 100) { // Simplified condition
                nav.classList.add('fixed-nav');
                document.body.classList.add('scrolled');
                header.classList.add('scrolled');
                document.body.style.paddingTop = nav.offsetHeight + 'px';
                
                // Force display properties
                nav.style.display = 'flex';
                nav.style.visibility = 'visible';
                nav.style.opacity = '1';
                
                // Logo elements
                const logoElement = nav.querySelector('.logo');
                const logoLink = nav.querySelector('.logo a');
                const logoImg = nav.querySelector('.logo img');
                
                if (logoElement) {
                    logoElement.style.display = 'flex';
                    logoElement.style.visibility = 'visible';
                    logoElement.style.opacity = '1';
                }
                
                if (logoLink) {
                    logoLink.style.display = 'flex';
                    logoLink.style.visibility = 'visible';
                    logoLink.style.opacity = '1';
                }
                
                if (logoImg) {
                    logoImg.style.display = 'block';
                    logoImg.style.visibility = 'visible';
                    logoImg.style.opacity = '1';
                }
                
                // Slogan container
                const sloganContainer = nav.querySelector('.slogan-container');
                if (sloganContainer) {
                    sloganContainer.style.display = 'flex';
                    sloganContainer.style.visibility = 'visible';
                    sloganContainer.style.opacity = '1';
                }
                
                // Links
                const navLinksElement = nav.querySelector('.nav-links');
                if (navLinksElement) {
                    navLinksElement.style.display = 'flex';
                    navLinksElement.style.visibility = 'visible';
                    navLinksElement.style.opacity = '1';
                }
            }
        }
    }
    
    // Run immediately and after a short delay to ensure it catches
    forceShowFixedNav();
    setTimeout(forceShowFixedNav, 100);
    setTimeout(forceShowFixedNav, 500);
    setTimeout(forceShowFixedNav, 1000);
    
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
    
    // Enhanced smooth scrolling for anchor links with easing
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
                
                // Smooth scroll with easing
                scrollToSmoothly(offsetPosition, 1000);
            }
        });
    });
    
    // Custom smooth scroll function with easing
    function scrollToSmoothly(position, duration) {
        const startPosition = window.pageYOffset;
        const distance = position - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const scrollY = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, scrollY);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        // Easing function for smoother animation
        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Add fixed navigation on scroll with animation - completely revised
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const logo = document.querySelector('.logo img');
    
    if (header && nav) {
        // Simplified and more reliable scroll check function
        function checkScroll() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const isMobile = window.innerWidth <= 767;
            
            if (scrollPosition > 100) { // Fixed threshold instead of dynamic
                // Apply fixed nav
                nav.classList.add('fixed-nav');
                document.body.classList.add('scrolled');
                header.classList.add('scrolled');
                
                // Only adjust padding top on desktop
                if (!isMobile) {
                    document.body.style.paddingTop = nav.offsetHeight + 'px';
                    
                    // Force display properties inline for desktop only
                    nav.style.display = 'flex';
                    nav.style.visibility = 'visible';
                    nav.style.opacity = '1';
                    nav.style.zIndex = '9999';
                    
                    // Logo elements
                    const logoElement = nav.querySelector('.logo');
                    const logoLink = nav.querySelector('.logo a');
                    const logoImg = nav.querySelector('.logo img');
                    
                    if (logoElement) {
                        logoElement.style.display = 'flex';
                        logoElement.style.visibility = 'visible';
                        logoElement.style.opacity = '1';
                    }
                    
                    if (logoLink) {
                        logoLink.style.display = 'flex';
                        logoLink.style.visibility = 'visible';
                        logoLink.style.opacity = '1';
                    }
                    
                    if (logoImg) {
                        logoImg.style.display = 'block';
                        logoImg.style.visibility = 'visible';
                        logoImg.style.opacity = '1';
                    }
                    
                    // Slogan container
                    const sloganContainer = nav.querySelector('.slogan-container');
                    if (sloganContainer) {
                        sloganContainer.style.display = 'flex';
                        sloganContainer.style.visibility = 'visible';
                        sloganContainer.style.opacity = '1';
                    }
                    
                    // Nav links
                    const navLinksElement = nav.querySelector('.nav-links');
                    if (navLinksElement) {
                        navLinksElement.style.display = 'flex';
                        navLinksElement.style.visibility = 'visible';
                        navLinksElement.style.opacity = '1';
                    }
                } else {
                    // On mobile, hide header elements to prevent duplication
                    const brandTitle = document.querySelector('.brand-title');
                    const tagline = document.querySelector('header .tagline');
                    
                    if (brandTitle) brandTitle.style.display = 'none';
                    if (tagline) tagline.style.display = 'none';
                }
            } else {
                // Reset to default
                nav.classList.remove('fixed-nav');
                document.body.classList.remove('scrolled');
                header.classList.remove('scrolled');
                document.body.style.paddingTop = '0';
                
                // Reset inline styles
                nav.style.display = '';
                nav.style.visibility = '';
                nav.style.opacity = '';
                
                const logoElement = nav.querySelector('.logo');
                if (logoElement) {
                    logoElement.style.display = '';
                    logoElement.style.visibility = '';
                    logoElement.style.opacity = '';
                }
                
                const logoLink = nav.querySelector('.logo a');
                if (logoLink) {
                    logoLink.style.display = '';
                    logoLink.style.visibility = '';
                    logoLink.style.opacity = '';
                }
                
                if (logo) {
                    logo.style.display = '';
                    logo.style.visibility = '';
                    logo.style.opacity = '';
                }
                
                // Reset slogan container
                const sloganContainer = nav.querySelector('.slogan-container');
                if (sloganContainer) {
                    sloganContainer.style.display = '';
                    sloganContainer.style.visibility = '';
                    sloganContainer.style.opacity = '';
                }
                
                const navLinksElement = nav.querySelector('.nav-links');
                if (navLinksElement) {
                    navLinksElement.style.display = '';
                    navLinksElement.style.visibility = '';
                    navLinksElement.style.opacity = '';
                }
                
                // Show mobile elements again when scrolled back to top
                if (window.innerWidth <= 767) {
                    const brandTitle = document.querySelector('.brand-title');
                    const tagline = document.querySelector('header .tagline');
                    
                    if (brandTitle) brandTitle.style.display = 'flex';
                    if (tagline) tagline.style.display = 'block';
                }
            }
        }
        
        // Check initial scroll position
        checkScroll();
        
        // Add scroll listener with throttling to improve performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    checkScroll();
                    scrollTimeout = null;
                }, 10); // Small delay to throttle
            }
        });
        
        // Also check on window resize and load
        window.addEventListener('resize', checkScroll);
        window.addEventListener('load', checkScroll);
        
        // Create synthetic scroll events to force the check
        setTimeout(function() {
            window.dispatchEvent(new Event('scroll'));
        }, 200);
        
        setTimeout(function() {
            window.dispatchEvent(new Event('scroll'));
        }, 1000);
    }
    
    // Enhanced form validation with visual feedback
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        // Add focus effects to form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Add focus class when input is focused
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            // Remove focus class when input loses focus
            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.parentElement.classList.remove('focused');
                }
                
                // Validate input when user leaves the field
                validateInput(input);
            });
            
            // Check if the input already has a value (e.g. on page reload)
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Enhanced validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (!validateInput(formElements[i])) {
                    isValid = false;
                }
            }
            
            if (isValid) {
                // Add loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Form data to send
                const formData = new FormData(contactForm);
                
                // Send the form data using FormSubmit service
                fetch('https://formsubmit.co/Admin@fundraisersunited.com.au', {
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
                    const formWrapper = contactForm.parentElement;
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message animate-fade-in';
                    successMessage.innerHTML = '<i class="fas fa-check-circle"></i><p>Thank you for your message! We will get back to you soon.</p>';
                    
                    // Add animation
                    formWrapper.classList.add('animate-fade-out');
                    
                    setTimeout(() => {
                        formWrapper.innerHTML = '';
                        formWrapper.appendChild(successMessage);
                        formWrapper.classList.remove('animate-fade-out');
                    }, 300);
                })
                .catch(error => {
                    // Handle errors
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'There was a problem sending your message. Please try again later.';
                    contactForm.appendChild(errorMessage);
                    
                    // Scroll to error message
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    console.error('Error:', error);
                });
            }
        });
        
        function validateInput(input) {
            if (!input.hasAttribute('required') || input.type === 'submit') {
                return true;
            }
            
            let isValid = true;
            const errorMessage = input.parentElement.querySelector('.error-message') || document.createElement('div');
            errorMessage.className = 'error-message';
            
            if (!input.value.trim()) {
                isValid = false;
                errorMessage.textContent = 'This field is required';
                input.classList.add('error');
            } else if (input.type === 'email' && !validateEmail(input.value.trim())) {
                isValid = false;
                errorMessage.textContent = 'Please enter a valid email address';
                input.classList.add('error');
            } else {
                input.classList.remove('error');
                if (errorMessage.parentNode) {
                    errorMessage.parentNode.removeChild(errorMessage);
                }
                return true;
            }
            
            if (!errorMessage.parentNode) {
                input.parentElement.appendChild(errorMessage);
            }
            
            return isValid;
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
    
    // Advanced scroll animations for elements
    const animateElements = () => {
        // Animate elements when they come into view
        const elements = document.querySelectorAll('.service-card, .approach-item, .stat-item, .testimonial, .about-content > div, .join-content > div, .charities-content > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('animate');
            }
        });
        
        // Animate elements with the animate-on-scroll class
        const scrollAnimElements = document.querySelectorAll('.animate-on-scroll');
        scrollAnimElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    };
    
    // Run animation check on load and scroll
    animateElements();
    window.addEventListener('scroll', animateElements);
    
    // Enhanced counter animation for stats with easing
    const statsSection = document.querySelector('#stats');
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let counted = false;
    
    const animateCounters = () => {
        if (counted) return;
        
        const windowHeight = window.innerHeight;
        const statsPosition = statsSection.getBoundingClientRect().top;
        
        if (statsPosition < windowHeight * 0.8) {
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.textContent);
                const suffix = stat.textContent.replace(/[0-9.]/g, '');
                let count = 0;
                const decimalPlaces = (stat.textContent.includes('.')) ? 
                    stat.textContent.split('.')[1].length : 0;
                
                // Use more natural easing for counter
                let startTime = null;
                const duration = 2000; // 2 seconds
                
                function updateCounter(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    
                    // Easing function for smooth counting
                    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
                    const easedProgress = easeOutQuart(Math.min(progress / duration, 1));
                    
                    count = easedProgress * target;
                    if (progress < duration) {
                        stat.textContent = count.toFixed(decimalPlaces) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target.toFixed(decimalPlaces) + suffix;
                    }
                }
                
                requestAnimationFrame(updateCounter);
            });
            
            counted = true;
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    
    // Enhanced parallax effect for header with depth
    const parallaxElements = document.querySelectorAll('.hero h1, .hero p, .hero-buttons');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            // Create varying parallax speeds based on element index
            const speed = 0.2 - (index * 0.05);
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Mouse-movement parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            parallaxElements.forEach((element, index) => {
                // Create varying parallax speeds based on element index
                const depth = (index + 1) * 20;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                
                // Apply subtle movement based on mouse position
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        // Reset positions when mouse leaves
        hero.addEventListener('mouseleave', () => {
            parallaxElements.forEach(element => {
                element.style.transform = 'translate(0px, 0px)';
            });
        });
    }
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.service-card, .approach-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                    c.style.transform = 'scale(0.98)';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            cards.forEach(c => {
                c.style.opacity = '1';
                c.style.transform = '';
            });
        });
    });
    
    // Animated back to top button with progress indicator
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        button.style.position = 'fixed';
        button.style.bottom = '30px';
        button.style.right = '30px';
        button.style.borderRadius = '50%';
        button.style.width = '60px';
        button.style.height = '60px';
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.display = 'none';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        button.style.cursor = 'pointer';
        button.style.boxShadow = 'var(--shadow-md)';
        button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        button.style.zIndex = '99';
        button.style.overflow = 'hidden'; // Prevent content from overflowing
        button.style.fontSize = '20px'; // Control icon size
        button.style.textIndent = '0'; // Reset any text indent
        
        // Create SVG progress indicator
        const svgProgress = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgProgress.setAttribute('class', 'progress-ring');
        svgProgress.setAttribute('width', '60');
        svgProgress.setAttribute('height', '60');
        svgProgress.style.position = 'absolute';
        svgProgress.style.top = '0';
        svgProgress.style.left = '0';
        svgProgress.style.transform = 'rotate(-90deg)';
        svgProgress.style.overflow = 'visible'; // Ensure SVG is visible
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const radius = 28;
        const circumference = radius * 2 * Math.PI;
        
        circle.setAttribute('class', 'progress-ring__circle');
        circle.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('fill', 'transparent');
        circle.setAttribute('r', radius);
        circle.setAttribute('cx', '30');
        circle.setAttribute('cy', '30');
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        svgProgress.appendChild(circle);
        
        // Add button and progress indicator to the DOM
        document.body.appendChild(button);
        button.appendChild(svgProgress);
        
        // Update progress indicator based on scroll position
        window.addEventListener('scroll', () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = window.pageYOffset / scrollTotal;
            
            if (window.pageYOffset > 300) {
                button.style.display = 'flex';
                button.style.opacity = '1';
                
                // Update progress ring
                const offset = circumference - scrollProgress * circumference;
                circle.style.strokeDashoffset = offset;
            } else {
                button.style.opacity = '0';
                setTimeout(() => {
                    if (window.pageYOffset <= 300) {
                        button.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Smooth scroll to top with easing
        button.addEventListener('click', () => {
            scrollToSmoothly(0, 1000);
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = 'var(--shadow-lg)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = 'var(--shadow-md)';
        });
    };
    
    createBackToTopButton();
    
    // Add floating animation to certain elements
    const floatElements = document.querySelectorAll('.service-card i, .about-values h3, .join-image, .charities-image');
    floatElements.forEach(element => {
        element.classList.add('animate-float');
    });
    
    // Add "animate-on-scroll" class to elements that should animate on scroll
    const scrollElements = document.querySelectorAll('.about-content > div, .join-content > div, .charities-content > div, .approach-item, .contact-form, .contact-info');
    scrollElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Initialize animations on page load
    animateElements();
    
    // Update mobile navigation active state on scroll
    function updateMobileNavActiveState() {
        const sections = document.querySelectorAll('section');
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        
        let currentSectionId = '';
        
        // Find the current section based on scroll position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 200 && 
                window.pageYOffset < sectionTop + sectionHeight - 200) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Update active state on mobile nav items
        mobileNavItems.forEach(item => {
            // Remove active class from all items
            item.classList.remove('active');
            
            // Get the href attribute and extract the section id
            const href = item.getAttribute('href');
            const itemSectionId = href.substring(1); // Remove the # character
            
            // Add active class if this item points to the current section
            if (itemSectionId === currentSectionId) {
                item.classList.add('active');
            }
        });
    }
    
    // Run the function on scroll and page load
    window.addEventListener('scroll', updateMobileNavActiveState);
    window.addEventListener('load', updateMobileNavActiveState);
    
    // Fix hero section layout for both desktop and mobile
    function setupResponsiveLayout() {
        const hero = document.querySelector('.hero');
        const header = document.querySelector('header');
        const tagline = document.querySelector('header .tagline');
        const brandTitle = document.querySelector('.brand-title');
        const isMobile = window.innerWidth <= 768;
        
        if (hero && header) {
            // Make hero visible
            hero.style.display = 'flex';
            
            // Apply appropriate positioning based on device
            if (isMobile) {
                // Mobile view
                hero.style.position = 'relative';
                hero.style.alignItems = 'center';
                hero.style.textAlign = 'center';
                header.style.minHeight = '550px';
                
                // Ensure proper spacing between brand title and tagline
                if (brandTitle && tagline) {
                    // Properly position tagline below the red line
                    tagline.style.marginTop = '35px';
                    tagline.style.display = 'block';
                    
                    // Fix scrolling issues by hiding duplicates
                    // This is now handled in the checkScroll function
                }
            } else {
                // Desktop view
                hero.style.position = 'absolute';
                hero.style.alignItems = 'center'; 
                hero.style.textAlign = 'center';
                hero.style.width = '100%';
                hero.style.height = '100%';
                
                // Reset any mobile-specific styles
                if (tagline) {
                    tagline.style.marginTop = '';
                }
                
                // Ensure proper visibility of desktop elements
                const heroH1 = document.querySelector('.hero h1');
                const heroTagline = document.querySelector('.hero .tagline');
                const heroDescription = document.querySelector('.hero-description');
                
                if (heroH1) heroH1.style.display = 'block';
                if (heroTagline) heroTagline.style.display = 'block';
                if (heroDescription) heroDescription.style.display = 'block';
                
                // Hide mobile-specific elements
                if (brandTitle) brandTitle.style.display = 'none';
            }
        }
    }
    
    // Run layout fixes on page load and resize
    window.addEventListener('load', setupResponsiveLayout);
    window.addEventListener('resize', setupResponsiveLayout);
}); 