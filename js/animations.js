/**
 * Elite Website Animations
 * Enhanced Animation System using GSAP
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP with more plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);
    
    // Preloader with fancy reveal
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const preloaderTl = gsap.timeline();
        preloaderTl.to('.preloader-progress', {
            width: '100%',
            duration: 1.5,
            ease: "power2.inOut"
        });
        preloaderTl.to('.preloader', {
            y: '-100%',
            duration: 0.8,
            ease: "power2.inOut"
        });
        
        // Start the main page animations after preloader
        preloaderTl.call(initPageAnimations);
    } else {
        // If no preloader, start animations immediately
        initPageAnimations();
    }
    
    function initPageAnimations() {
        // Enhanced navbar animation
        const navbarItems = document.querySelectorAll('.navbar-item');
        gsap.set(navbarItems, { opacity: 0, y: -20 });
        gsap.to(navbarItems, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.5)"
        });
        
        // Animate logo
        gsap.from('.logo', {
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // Enhanced hero animations
        const heroTl = gsap.timeline();
        
    heroTl.from('.hero-title', {
        opacity: 0,
        y: 50,
            duration: 1,
            ease: "power3.out"
    });
    
    heroTl.from('.hero-text', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");
    
        heroTl.from('.btn', {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.4");
        
        heroTl.from('.hero-image-container', {
        opacity: 0,
            scale: 0.9,
            duration: 1.2,
        ease: "power2.out"
        }, "-=1");
        
        heroTl.from('.hero-badge', {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5");
        
        // Animated particles with better randomization
        gsap.utils.toArray('.particle').forEach(particle => {
            // Random starting positions
            gsap.set(particle, {
                x: gsap.utils.random(-20, 20),
                y: gsap.utils.random(-20, 20)
            });
            
            // Continuous random movement animation
            gsap.to(particle, {
                x: `random(-50, 50)`,
                y: `random(-50, 50)`,
                duration: gsap.utils.random(3, 8),
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                repeatRefresh: true // New random values on each repeat
            });
        });
        
        // Enhanced floating animation for elements
        gsap.utils.toArray('.floating-element').forEach((element, index) => {
            // Staggered, slightly different animations for each element
            gsap.to(element, {
                y: index % 2 === 0 ? 15 : 10,
                rotation: gsap.utils.random(-3, 3),
                duration: gsap.utils.random(2, 3),
        repeat: -1,
        yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.2
            });
        });
        
        // Counter animation with visual bounce
        gsap.utils.toArray('.counter').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                onEnter: function() {
                    gsap.to(counter, {
                        innerHTML: target,
        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power2.out",
                        onUpdate: function() {
                            if (parseInt(counter.innerHTML) % 5 === 0) {
                                gsap.to(counter, {
                                    scale: 1.1,
                                    duration: 0.1,
                                    yoyo: true,
                                    repeat: 1
                                });
                            }
                        }
                    });
                }
            });
        });
        
        // Animate Arabic decorations
        gsap.utils.toArray('.arabic-decoration').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%"
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.5)"
            });
        });
        
        // Animate section separators
        gsap.utils.toArray('.section-separator').forEach(separator => {
            const topPart = separator.querySelector('.separator-top');
            const bottomPart = separator.querySelector('.separator-bottom');
            
            gsap.from(topPart, {
                scrollTrigger: {
                    trigger: separator,
                    start: "top 95%"
                },
                scaleX: 0,
                duration: 1.2,
                ease: "power3.out"
            });
            
            gsap.from(bottomPart, {
                scrollTrigger: {
                    trigger: separator,
                    start: "top 95%"
                },
                scaleX: 0,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.1
            });
        });
        
        // Vision cards animation
        gsap.utils.toArray('.vision-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: "back.out(1.2)"
            });
        });
        
        // Animate background shapes
        const heroBgShapes = document.querySelectorAll('.bg-shape');
        heroBgShapes.forEach((shape, index) => {
            gsap.to(shape, {
                x: gsap.utils.random(-30, 30),
                y: gsap.utils.random(-30, 30),
                scale: gsap.utils.random(0.9, 1.1),
                rotation: gsap.utils.random(-15, 15),
                duration: gsap.utils.random(20, 30),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 2
            });
        });
        
        // Add subtle continuous animations to hero elements
        gsap.to('.hero-image-container', {
            y: 15,
            rotation: 2,
            duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
        gsap.to('.hero-badge', {
            y: -15,
            rotation: -5,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1
        });
        
        // Add subtle text glow animation to hero title
        gsap.to('.hero-title', {
            textShadow: "0 0 15px rgba(248, 212, 88, 0.5)",
            color: "rgba(249, 248, 244, 1)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    // Enhanced section title animations with stagger effect
    gsap.utils.toArray('.section-title').forEach((title, index) => {
        // Set initial state
        gsap.set(title, {
            opacity: 0,
            y: 30,
            scale: 0.95
        });

        // Create the animation
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            onStart: () => {
                // Animate the decorative text shadow
                if (title.hasAttribute('data-text')) {
                    const shadow = title.querySelector('::after');
                    if (shadow) {
                        gsap.fromTo(shadow, {
                            opacity: 0,
                            scale: 1.2,
                            x: 20,
                            y: -20
                        }, {
                            opacity: 0.1,
                            scale: 1,
                            x: 0,
                            y: 0,
                            duration: 1.2,
                            ease: "power2.out"
                        });
                    }
                }
            }
        });

        // Add a subtle hover effect
        title.addEventListener('mouseenter', () => {
            gsap.to(title, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        title.addEventListener('mouseleave', () => {
            gsap.to(title, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Section headers reveal with staggered elements
    gsap.utils.toArray('.section-header').forEach(header => {
        const title = header.querySelector('.section-title');
        const divider = header.querySelector('.section-divider');
        const subtitle = header.querySelector('.section-subtitle');
        
        const headerTl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top 85%"
            }
        });
        
        headerTl.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
        
        headerTl.from(divider, {
            scaleX: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");
        
        headerTl.from(subtitle, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.2");
    });
    
    // Service cards scroll interaction
    const serviceContainer = document.querySelector('.service-cards-container');
    if (serviceContainer) {
        const serviceDots = document.querySelectorAll('.service-dot');
        const serviceCards = serviceContainer.querySelectorAll('.service-card');
        
        // Initialize cards animation
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: serviceContainer,
                start: "top 80%"
            },
            x: 100,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)"
        });
        
        // Setup dot navigation
        serviceDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update active dot
                serviceDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Scroll to card
                const cardWidth = serviceCards[0].offsetWidth + 16; // Width + gap
                serviceContainer.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });
        
        // Update dots on scroll
        serviceContainer.addEventListener('scroll', () => {
            const scrollPosition = serviceContainer.scrollLeft;
            const cardWidth = serviceCards[0].offsetWidth + 16;
            const activeIndex = Math.round(scrollPosition / cardWidth);
            
            serviceDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    }
    
    // Hover card animations
    document.querySelectorAll('.hover-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: "0 4px 6px rgba(47, 57, 75, 0.1)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            const offset = 80; // Navbar height offset
            
                gsap.to(window, {
                duration: 1,
                    scrollTo: {
                    y: target,
                    offsetY: offset
                    },
                    ease: "power3.inOut"
                });
                
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        // Initially hide
        gsap.set(backToTop, { opacity: 0, visibility: 'hidden' });
        
        // Show when scrolled down
        ScrollTrigger.create({
            start: 300,
            onEnter: () => {
                gsap.to(backToTop, { opacity: 1, visibility: 'visible', duration: 0.3 });
            },
            onLeaveBack: () => {
                gsap.to(backToTop, { opacity: 0, visibility: 'hidden', duration: 0.3 });
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" });
        });
    }
    
    // Add scroll progress indicator 
    function initScrollProgress() {
        // Create a progress bar element if it doesn't exist
        if (!document.querySelector('.scroll-progress')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            document.body.appendChild(progressBar);
            
            // Style the progress bar
            progressBar.style.position = 'fixed';
            progressBar.style.top = '0';
            progressBar.style.left = '0';
            progressBar.style.width = '0%';
            progressBar.style.height = '4px';
            progressBar.style.background = `linear-gradient(to right, ${getComputedStyle(document.documentElement).getPropertyValue('--primary-color')}, ${getComputedStyle(document.documentElement).getPropertyValue('--accent-color')})`;
            progressBar.style.zIndex = '9999';
            progressBar.style.transition = 'width 0.1s ease-out';
        }

        // Update progress bar on scroll
        window.addEventListener('scroll', () => {
            const scrollProgress = document.querySelector('.scroll-progress');
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.pageYOffset / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }

    // Initialize scroll progress
    initScrollProgress();
});
