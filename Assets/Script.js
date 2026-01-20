// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// SKILL BARS ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
});

// ============================================
// EMAILJS INTEGRATION FOR CONTACT FORM
// ============================================

// Initialize EmailJS
(function() {
    emailjs.init("JVgrnpBaTcgnIYZ0igbm9"); // Your EmailJS public key
})();

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Clear previous status messages
        formStatus.className = '';
        formStatus.textContent = '';
        
        // Send email using EmailJS
        emailjs.sendForm('service_0zu3rmx', 'template_fyutivh', contactForm)
            .then(function(response) {
                // Success message
                formStatus.className = 'form-status success';
                formStatus.textContent = '✓ Message sent successfully! I will get back to you soon.';
                
                // Reset form
                contactForm.reset();
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Restore button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.className = '';
                    formStatus.textContent = '';
                }, 5000);
            }, function(error) {
                // Error message
                formStatus.className = 'form-status error';
                formStatus.textContent = '✗ Failed to send message. Please try again or contact me directly.';
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Restore button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                console.error('EmailJS Error:', error);
            });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FORM INPUT VALIDATION
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ddd';
        } else {
            this.style.borderColor = '#3498db';
        }
    });
});

// ============================================
// RESPONSIVE HEADER ON SCROLL
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
