// Enhanced JavaScript for Coding Edge Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeNavbar();
    initializeHeroCarousel();
    initializeTestimonialCarousel();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeTypingEffect();
    initializeCounterAnimation();
    initializeFormValidation();
    initializeSmoothScrolling();
    initializeLoadingAnimations();
});

// Enhanced Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(59, 130, 246, 0.1)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile menu enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.background = 'rgba(13, 13, 13, 0.98)';
                    navbarCollapse.style.backdropFilter = 'blur(15px)';
                    navbarCollapse.style.borderRadius = '0 0 15px 15px';
                }
            }, 100);
        });
    }
}

// Enhanced Hero Carousel
function initializeHeroCarousel() {
    const carousel = document.querySelector('#heroCarousel');
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators button');
    
    if (!carousel) return;

    // Add entrance animations to slides
    slides.forEach((slide, index) => {
        const textWrapper = slide.querySelector('.hero-text-wrapper');
        if (textWrapper) {
            slide.addEventListener('slide.bs.carousel', function() {
                textWrapper.style.animation = 'none';
                setTimeout(() => {
                    textWrapper.style.animation = 'fadeInUp 1s ease-out';
                }, 100);
            });
        }
    });

    // Enhanced indicator animations
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            indicators.forEach(ind => {
                ind.style.transform = 'scale(1)';
                ind.style.background = 'transparent';
            });
            this.style.transform = 'scale(1.3)';
            this.style.background = '#3b82f6';
        });
    });

    // Auto-pause on hover
    carousel.addEventListener('mouseenter', function() {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) bsCarousel.pause();
    });

    carousel.addEventListener('mouseleave', function() {
        const bsCarousel = bootstrap.Carousel.getInstance(carousel);
        if (bsCarousel) bsCarousel.cycle();
    });
}

// Enhanced Testimonial Carousel
function initializeTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (!carousel || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length / 2; // Account for duplicates
    
    function updateCarousel() {
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex++;
        updateCarousel();
        
        if (currentIndex >= totalSlides) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = 0;
                carousel.style.transform = `translateX(0%)`;
            }, 600);
        }
    }

    // Auto-advance testimonials
    let testimonialInterval = setInterval(nextSlide, 4000);

    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonial-carousel-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });

        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextSlide, 4000);
        });
    }

    // Add touch/swipe support
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                currentIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
                updateCarousel();
            }
        }
    });
}

// Scroll-triggered animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on element type
                if (element.classList.contains('course-card')) {
                    element.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    element.style.animationDelay = `${Array.from(element.parentNode.children).indexOf(element) * 0.1}s`;
                } else if (element.classList.contains('stat-item')) {
                    element.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    element.style.animationDelay = `${Array.from(element.parentNode.children).indexOf(element) * 0.2}s`;
                } else if (element.classList.contains('row')) {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                } else {
                    element.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .row.g-0, .border-2, .testimonial-carousel-container, .enroll-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Parallax effects
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .enroll-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('hero-image')) {
                element.style.transform = `translateY(${rate}px)`;
            } else if (element.classList.contains('enroll-section')) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    element.style.backgroundPosition = `center ${50 + (scrolled - element.offsetTop) * 0.1}%`;
                }
            }
        });
    });
}

// Typing effect for hero titles
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.hero-title');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Counter animation for stats
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Enhanced form validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[type="email"], input[type="password"]');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fix the errors before submitting.', 'error');
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            isValid = false;
            message = 'Email is required';
        } else if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email';
        }
    } else if (type === 'password') {
        if (!value) {
            isValid = false;
            message = 'Password is required';
        } else if (value.length < 6) {
            isValid = false;
            message = 'Password must be at least 6 characters';
        }
    }
    
    // Add validation classes and feedback
    if (isValid) {
        field.classList.add('is-valid');
    } else {
        field.classList.add('is-invalid');
        showFieldError(field, message);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    let feedback = field.parentNode.querySelector('.invalid-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        field.parentNode.appendChild(feedback);
    }
    feedback.textContent = message;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} notification-toast`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading animations
function initializeLoadingAnimations() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 500);
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Enhanced button interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .btn-primary-custom, .btn-secondary-custom, .course-btn')) {
        createRippleEffect(e);
    }
});

function createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading * {
        animation-play-state: paused !important;
    }
    
    .loaded .hero-text-wrapper {
        animation: fadeInUp 1s ease-out;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .is-valid {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events for better performance
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent functions are already optimized above
}, 10));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);