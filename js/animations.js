/**
 * Elite Arabia - Animation & Interactions Script
 * This file handles all animations, scroll effects, and interactive elements
 */

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when page loads
    initAnimations();
    
    // Handle scroll events for various effects
    window.addEventListener('scroll', handleScroll);
    
    // Initialize mobile menu functionality
    initMobileMenu();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize lightbox for gallery
    initLightbox();
    
    // Initialize property swiper
    initPropertySwiper();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize back-to-top button
    initBackToTop();
    
    // Initialize counter animations
    initCounters();
    
    // Add fluid shape elements to specified sections
    addFluidShapes();
});

/**
 * Initialize fade-in animations and visibility observer
 */
function initAnimations() {
    // Add visible class to initial elements that should animate in
    document.querySelectorAll('.fade-in').forEach(function(element) {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
    
    // Set up intersection observer for elements that should animate on scroll
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve element after it has appeared
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Handle scroll events for header, parallax effects, etc.
 */
function handleScroll() {
    // Header background on scroll
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Check for fade-in elements (fallback for browsers without IntersectionObserver)
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in:not(.visible)').forEach(function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links .nav-link');
    
    if (!menuToggle || !mobileMenu || !closeMenu) return;
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scrolling
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; // Allow body scrolling again
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
    
    menuToggle.addEventListener('click', openMobileMenu);
    closeMenu.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

/**
 * Initialize FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active class
            item.classList.toggle('active');
        });
    });
}

/**
 * Initialize lightbox for gallery images
 */
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxClose = document.createElement('span');
            lightboxClose.className = 'lightbox-close';
            lightboxClose.innerHTML = '&times;';
            
            const lightboxImage = document.createElement('img');
            lightboxImage.className = 'lightbox-image';
            lightboxImage.src = imgSrc;
            lightboxImage.alt = imgAlt;
            
            // Add loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin fa-3x"></i>';
            
            // Preload image
            const preloadImage = new Image();
            preloadImage.src = imgSrc;
            lightboxContent.appendChild(loadingIndicator);
            
            preloadImage.onload = function() {
                // Once image is loaded, add it to lightbox
                lightboxContent.removeChild(loadingIndicator);
                lightboxContent.appendChild(lightboxImage);
                
                // Add caption
                const lightboxCaption = document.createElement('div');
                lightboxCaption.className = 'lightbox-caption';
                lightboxCaption.textContent = imgAlt;
                lightboxContent.appendChild(lightboxCaption);
            };
            
            // Append elements
            lightboxContent.appendChild(lightboxClose);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Add class to trigger fade in
            requestAnimationFrame(() => {
                lightbox.classList.add('show');
            });
            
            // Prevent body scrolling
            document.body.style.overflow = 'hidden';
            
            // Close lightbox with animation
            function closeLightbox() {
                lightbox.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                    document.body.style.overflow = '';
                }, 300);
                
                // Remove event listeners when lightbox is closed
                document.removeEventListener('keydown', keyHandler);
                lightbox.removeEventListener('touchstart', handleTouchStart);
                lightbox.removeEventListener('touchmove', handleTouchMove);
                lightbox.removeEventListener('touchend', handleTouchEnd);
            }
            
            // Close lightbox events
            lightboxClose.addEventListener('click', closeLightbox);
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Keyboard navigation for lightbox
            function keyHandler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            }
            
            document.addEventListener('keydown', keyHandler);
            
            // Touch support for swiping to close
            let touchStartY = 0;
            let touchEndY = 0;
            let touchStartX = 0;
            let touchEndX = 0;
            
            function handleTouchStart(e) {
                touchStartY = e.touches[0].clientY;
                touchStartX = e.touches[0].clientX;
            }
            
            function handleTouchMove(e) {
                touchEndY = e.touches[0].clientY;
                touchEndX = e.touches[0].clientX;
                
                // Calculate vertical distance moved
                const yDiff = touchEndY - touchStartY;
                
                // If swiping down, apply transform to lightbox
                if (yDiff > 0 && e.target === lightbox) {
                    const opacity = Math.max(0.3, 1 - (yDiff / 300));
                    lightbox.style.opacity = opacity.toString();
                    lightboxContent.style.transform = `translateY(${yDiff}px)`;
                }
            }
            
            function handleTouchEnd(e) {
                const yDiff = touchEndY - touchStartY;
                const xDiff = touchEndX - touchStartX;
                
                // Reset styles regardless of action
                lightbox.style.opacity = '';
                lightboxContent.style.transform = '';
                
                // Check if swipe down distance is significant
                if ((yDiff > 100 && Math.abs(xDiff) < Math.abs(yDiff)) || yDiff > 150) {
                    closeLightbox();
                }
                
                // Reset values
                touchStartY = 0;
                touchEndY = 0;
                touchStartX = 0;
                touchEndX = 0;
            }
            
            // Add touch event listeners
            lightbox.addEventListener('touchstart', handleTouchStart, {passive: true});
            lightbox.addEventListener('touchmove', handleTouchMove, {passive: true});
            lightbox.addEventListener('touchend', handleTouchEnd);
        });
    });
}

/**
 * Initialize Swiper for property cards
 */
function initPropertySwiper() {
    if (typeof Swiper === 'undefined' || !document.querySelector('.properties-swiper')) return;
    
    const propertiesSwiper = new Swiper('.properties-swiper', {
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        preloadImages: true,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 2
        },
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.properties-pagination',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
        },
        navigation: {
            nextEl: '.properties-button-next',
            prevEl: '.properties-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            540: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1366: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        }
    });
    
    // Property Filtering
    const filterButtons = document.querySelectorAll('.properties-filter .filter-btn');
    const propertyItems = document.querySelectorAll('.properties-swiper .swiper-slide');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            propertyItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update swiper after filtering
            propertiesSwiper.update();
            propertiesSwiper.updateSize();
            propertiesSwiper.updateSlides();
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            
            e.preventDefault();
            
            window.scrollTo({
                top: target.offsetTop - 90, // Adjust for header height
                behavior: 'smooth'
            });
            });
        });
    }

/**
 * Initialize back-to-top button
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    // Initially hide the button
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize counter animations
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const speed = 200;
    
    function animateCounter() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounter, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when in viewport
    const counterSection = counters[0].closest('section');
    if (!counterSection) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    counterObserver.observe(counterSection);
}

/**
 * Add fluid shape elements to specified sections
 */
function addFluidShapes() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            // Add fluid shape to even sections
            const shape1 = document.createElement('div');
            shape1.className = 'fluid-shape fluid-shape-1';
            section.appendChild(shape1);
        } else {
            // Add fluid shape to odd sections
            const shape2 = document.createElement('div');
            shape2.className = 'fluid-shape fluid-shape-2';
            section.appendChild(shape2);
        }
    });
}

/**
 * Check if an element is in the viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
    );
}
