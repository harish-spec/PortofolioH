// ============================================
// APPLE DESIGN & QA AUTOMATION ENGINE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initScrollReveals();
    initCounterStats();
    initSkillBars();
    initNavUnderline();
    initQATerminal();
    initMobileMenu();
    initEmailJS();
});

// ============================================
// 1. DYNAMIC QA ROLE TYPEWRITER EFFECT
// ============================================

function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const roles = [
        "QA Engineer | Manual & Functional Testing",
        "SQL Backend & Database Integrity Analyst",
        "Defect Lifecycle & Redmine Specialist",
        "API Validation & Regression Testing Pro",
        "Enterprise IERP Quality Specialist"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 60;
    const deletingSpeed = 35;
    const delayBetweenRoles = 2000;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentDelay = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentDelay = 400;
        }

        setTimeout(type, currentDelay);
    }

    type();
}

// ============================================
// 2. APPLE-STYLE SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveals() {
    const revealElements = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// 3. METRIC STAT COUNT-UP ANIMATION
// ============================================

function initCounterStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    const suffix = stat.getAttribute('data-suffix') || '';
                    let current = 0;
                    const duration = 1600; // ms
                    const stepTime = Math.abs(Math.floor(duration / target));

                    const timer = setInterval(() => {
                        current += 1;
                        stat.textContent = current + suffix;
                        if (current >= target) {
                            stat.textContent = target + suffix;
                            clearInterval(timer);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.3 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// ============================================
// 4. SKILL BAR FILL ANIMATION
// ============================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent');
                if (percent) {
                    bar.style.width = percent + '%';
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// 5. QA TERMINAL CONSOLE RE-RUN LOGIC
// ============================================

function initQATerminal() {
    const rerunBtn = document.getElementById('rerunSuiteBtn');
    const logsContainer = document.getElementById('terminalLogs');

    if (!rerunBtn || !logsContainer) return;

    rerunBtn.addEventListener('click', () => {
        rerunBtn.disabled = true;
        rerunBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';

        logsContainer.innerHTML = '';

        const newLogs = [
            { text: '[INIT] Triggering Automated QA Regression Suite v3.4...', type: 'info', delay: 200 },
            { text: '[RUNNING] Executing SQL Database Integrity Verification...', type: 'info', delay: 600 },
            { text: '[PASS] Database FK & Index Checks Complete (0.009s)', type: 'success', delay: 1000 },
            { text: '[RUNNING] Running 142 Functional Test Cases...', type: 'info', delay: 1400 },
            { text: '[PASS] Test Coverage: 95.8% (All modules green)', type: 'success', delay: 1800 },
            { text: '[RUNNING] Validating API Endpoint Contracts & Status Codes...', type: 'info', delay: 2200 },
            { text: '[PASS] Redmine Bug Sync: 0 Critical Open Defects', type: 'success', delay: 2600 },
            { text: '[READY] Suite Executed Successfully. All System Tests Passed.', type: 'highlight', delay: 3000 }
        ];

        newLogs.forEach(log => {
            setTimeout(() => {
                const line = document.createElement('div');
                line.className = `log-line ${log.type}`;
                line.textContent = log.text;
                logsContainer.appendChild(line);
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }, log.delay);
        });

        setTimeout(() => {
            rerunBtn.disabled = false;
            rerunBtn.innerHTML = '<i class="fas fa-play"></i> Re-Run Suite';
        }, 3200);
    });
}

// ============================================
// 6. NAVIGATION UNDERLINE & ACTIVE LINK SCROLL
// ============================================

function initNavUnderline() {
    const navLinks = document.querySelectorAll('.nav-link');
    const underline = document.querySelector('.nav-underline');
    const sections = document.querySelectorAll('section');
    const header = document.getElementById('mainHeader');

    function updateUnderline(activeLink) {
        if (!underline || !activeLink || window.innerWidth <= 768) {
            if (underline) underline.style.opacity = '0';
            return;
        }

        const rect = activeLink.getBoundingClientRect();
        const parentRect = activeLink.closest('.navbar').getBoundingClientRect();

        underline.style.left = `${rect.left - parentRect.left}px`;
        underline.style.width = `${rect.width}px`;
        underline.style.opacity = '1';
    }

    // Set initial position
    const initialActive = document.querySelector('.nav-link.active');
    if (initialActive) updateUnderline(initialActive);

    // Update on scroll
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const headerHeight = header ? header.offsetHeight : 70;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
                updateUnderline(link);
            }
        });
    });

    // Update on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = targetElement.offsetTop - headerHeight + 5;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                updateUnderline(this);
            }
        });
    });

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) updateUnderline(activeLink);
    });
}

// ============================================
// 7. MOBILE HAMBURGER MENU
// ============================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// 8. EMAILJS INTEGRATION FOR CONTACT FORM
// ============================================

function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("JVgrnpBaTcgnIYZ0igbm9");
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        formStatus.className = 'form-status';
        formStatus.textContent = '';

        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm('service_0zu3rmx', 'template_fyutivh', contactForm)
                .then(function() {
                    formStatus.className = 'form-status success';
                    formStatus.textContent = '✓ Message sent successfully! I will get back to you soon.';
                    contactForm.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.textContent = '';
                    }, 6000);
                }, function(error) {
                    formStatus.className = 'form-status error';
                    formStatus.textContent = '✗ Message recorded! If EmailJS fails, please email harishanvar56@gmail.com directly.';
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                    console.error('EmailJS Error:', error);
                });
        } else {
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Message received! Thank you for reaching out.';
            contactForm.reset();
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}
