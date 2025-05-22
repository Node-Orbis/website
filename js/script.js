document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const siteHeader = document.querySelector('.site-header');
    const preloader = document.querySelector('.preloader');
    const currentYearSpan = document.getElementById('currentYear');
    const currentYearFooterSpan = document.getElementById('currentYear_footer'); // For product page if IDs differ

    // Preloader
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => { // Ensure all content is loaded and give a bit of time for animation
                preloader.classList.add('loaded');
            }, 500); // Min display time for preloader
        });
    }
    
    // Mobile Navigation
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            navToggle.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Header Scroll Effect
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                 // Close mobile nav if open after click
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Update Current Year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (currentYearFooterSpan) { // For product page, if it has a different ID
        currentYearFooterSpan.textContent = new Date().getFullYear();
    }


    // Scroll-triggered Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation to save resources
                    // observer.unobserve(entry.target); 
                } else {
                    // Optional: re-hide if you want animation to repeat on scroll up/down
                    // entry.target.classList.remove('visible'); 
                }
            });
        }, { threshold: 0.1 }); // Trigger when 10% of element is visible

        animatedElements.forEach(el => {
            const animationType = el.dataset.animation;
            if (animationType) {
                el.classList.add(animationType); // Add class for initial transform state
            }
            observer.observe(el);
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const wasActive = question.classList.contains('active');
            
            // Close all other answers
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
                q.nextElementSibling.classList.remove('open');
                q.setAttribute('aria-expanded', 'false');
            });

            if (!wasActive) {
                question.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                 question.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Simple Newsletter Form Submission (prevents default for now)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Thank you for subscribing, ${email}! (This is a demo)`);
                newsletterForm.reset();
            } else {
                alert('Please enter a valid email address.');
            }
            // In a real app, you'd send this to a server using fetch/AJAX
        });
    }

    // Contact Form Submission (prevents default for now)
    const contactForm = document.querySelector('#contactForm'); // Assuming your contact form has id="contactForm"
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Basic validation example
            const name = contactForm.querySelector('#name').value; // Assuming id="name"
            const email = contactForm.querySelector('#email').value; // Assuming id="email"
            const message = contactForm.querySelector('#message').value; // Assuming id="message"
            
            if (name && email && message) {
                alert('Thank you for your message! We will get back to you soon. (This is a demo)');
                contactForm.reset();
            } else {
                alert('Please fill out all required fields.');
            }
            // In a real app, you'd send this to a server using fetch/AJAX
        });
    }

    // Text reveal animation (basic setup)
    const textRevealElements = document.querySelectorAll('.text-reveal');
    textRevealElements.forEach(el => {
        const text = el.textContent;
        const chars = text.split('').map((char, i) => 
            `<span style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        el.innerHTML = chars;
    });

    // Add Abhinit's portfolio link behavior if needed (already in HTML but JS could enhance)
    const abhinitPortfolioLink = document.querySelector('a[href="abhinit-omega.vercel.app"]');
    if (abhinitPortfolioLink) {
        // Example: console log or add a class on click
        abhinitPortfolioLink.addEventListener('click', () => {
            console.log("Visiting Abhinit's portfolio!");
        });
    }

}); // End DOMContentLoaded