// ============================================
// LIQUID GLASS & QA AUTOMATION ENGINE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initScrollReveals();
    initCounterStats();
    initSkillBars();
    initCoveragePyramid();
    initNavUnderline();
    initSkillFilters();
    initInteractiveTilt();
    initLiquidRipples();
    initMobileMenu();
    initContactActions();
    initContactForm();
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
        "Google Gemini & AI-Assisted QA Engineer",
        "Enterprise IERP Quality Specialist"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 55;
    const deletingSpeed = 30;
    const delayBetweenRoles = 2200;

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
// 2. LIQUID SCROLL REVEAL ANIMATIONS
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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
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
                    const stepTime = Math.max(Math.floor(duration / target), 20);

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
// 5. CORE SKILLS CATEGORY FILTERING
// ============================================

function initSkillFilters() {
    const filterChips = document.querySelectorAll('.filter-chip');
    const skillCards = document.querySelectorAll('.core-skill-card');

    if (!filterChips.length || !skillCards.length) return;

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const filterValue = chip.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('is-hidden');
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
}

// ============================================
// 6. INTERACTIVE 3D GLASS TILT EFFECT
// ============================================

function initInteractiveTilt() {
    // Only enable on desktop/laptops with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

// ============================================
// 7. LIQUID BUTTON RIPPLE EFFECT
// ============================================

function initLiquidRipples() {
    const buttons = document.querySelectorAll('.btn, .btn-rerun, .filter-chip');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            const rect = button.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('liquid-ripple');

            const existing = button.querySelector('.liquid-ripple');
            if (existing) existing.remove();

            button.appendChild(circle);
        });
    });
}

// ============================================
// 8. NAVIGATION UNDERLINE & SMOOTH SCROLL SHORTCUTS
// ============================================

function initNavUnderline() {
    const navLinks = document.querySelectorAll('.nav-link');
    const underline = document.querySelector('.nav-underline');
    const sections = document.querySelectorAll('section');
    const header = document.getElementById('mainHeader');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    let isProgrammaticScroll = false;
    let scrollReleaseTimer = null;
    let scrollRaf = null;

    function updateUnderline(activeLink) {
        if (!underline) return;
        if (!activeLink || window.innerWidth <= 768) {
            underline.style.opacity = '0';
            return;
        }

        const rect = activeLink.getBoundingClientRect();
        const navbar = activeLink.closest('.navbar');
        if (!navbar) return;
        const parentRect = navbar.getBoundingClientRect();

        underline.style.left = `${rect.left - parentRect.left}px`;
        underline.style.width = `${rect.width}px`;
        underline.style.opacity = '1';
    }

    // Set initial position
    const initialActive = document.querySelector('.nav-link.active') || navLinks[0];
    if (initialActive) {
        initialActive.classList.add('active');
        requestAnimationFrame(() => updateUnderline(initialActive));
    }

    function determineActiveSection() {
        if (isProgrammaticScroll) return;

        const headerHeight = header ? header.offsetHeight : 68;
        const scrollPosition = window.scrollY + headerHeight + 80;

        // Check if user scrolled to bottom of page
        if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
            const lastLink = document.querySelector('.nav-link[href="#contact"]');
            if (lastLink && !lastLink.classList.contains('active')) {
                navLinks.forEach(l => l.classList.remove('active'));
                lastLink.classList.add('active');
                updateUnderline(lastLink);
            }
            return;
        }

        let currentId = '';
        for (let i = 0; i < sections.length; i++) {
            const sec = sections[i];
            const secTop = sec.offsetTop;
            const secHeight = sec.offsetHeight;
            if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
                currentId = sec.getAttribute('id');
                break;
            }
        }

        if (!currentId && sections.length > 0 && window.scrollY < 200) {
            currentId = sections[0].getAttribute('id');
        }

        if (currentId) {
            const targetLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
            if (targetLink && !targetLink.classList.contains('active')) {
                navLinks.forEach(l => l.classList.remove('active'));
                targetLink.classList.add('active');
                updateUnderline(targetLink);
            }
        }
    }

    // Throttled scroll listener
    window.addEventListener('scroll', () => {
        if (isProgrammaticScroll) return;
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(determineActiveSection);
    }, { passive: true });

    // Click handler for silky smooth navigation shortcuts
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            const targetSection = document.querySelector(href);
            if (!targetSection) return;

            e.preventDefault();

            // Close mobile hamburger menu immediately if open
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }

            // Immediately set active and animate underline smoothly
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateUnderline(this);

            // Lock scroll listener during animated transit
            isProgrammaticScroll = true;
            clearTimeout(scrollReleaseTimer);

            const headerHeight = header ? header.offsetHeight : 68;
            const targetOffset = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight + 2;

            window.scrollTo({
                top: Math.max(0, Math.round(targetOffset)),
                behavior: 'smooth'
            });

            // Unlock after smooth scroll completes
            scrollReleaseTimer = setTimeout(() => {
                isProgrammaticScroll = false;
                determineActiveSection();
            }, 850);
        });
    });

    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) updateUnderline(activeLink);
    });
}

// ============================================
// 10. MOBILE HAMBURGER MENU
// ============================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// 11. CONTACT FORM & DIRECT EMAIL INTEGRATION
// ============================================

const TARGET_EMAIL = 'harishanvar56@gmail.com';

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function initContactActions() {
    // Quick Copy Email functionality
    const copyBtn = document.getElementById('copyEmailBtn');
    const copyText = document.getElementById('copyBtnText');

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(TARGET_EMAIL);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = TARGET_EMAIL;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                if (copyText) copyText.textContent = 'Copied!';
                copyBtn.classList.add('copied');

                setTimeout(() => {
                    if (copyText) copyText.textContent = 'Copy';
                    copyBtn.classList.remove('copied');
                }, 2200);
            } catch (err) {
                console.warn('Clipboard copy fallback:', err);
            }
        });
    }

    // Direct Send via Gmail button
    const directGmailBtn = document.getElementById('directGmailBtn');
    if (directGmailBtn) {
        directGmailBtn.addEventListener('click', () => {
            const name = document.getElementById('contactName')?.value.trim() || '';
            const email = document.getElementById('contactEmail')?.value.trim() || '';
            const subject = document.getElementById('contactSubject')?.value.trim() || 'Portfolio Inquiry';
            const message = document.getElementById('contactMessage')?.value.trim() || '';

            const bodyContent = `Hi Harish,\n\n${message || '[Your message here]'}\n\nBest regards,\n${name || '[Your Name]'}\n${email ? 'Reply to: ' + email : ''}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

            window.open(gmailUrl, '_blank', 'noopener,noreferrer');
        });
    }
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('contactSubmitBtn');

    if (!contactForm || !formStatus) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const subjectInput = document.getElementById('contactSubject');
        const messageInput = document.getElementById('contactMessage');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
            formStatus.className = 'form-status active';
            formStatus.innerHTML = `
                <div class="form-status-inner error">
                    <div class="status-title"><i class="fas fa-exclamation-circle"></i> Missing Information</div>
                    <p>Please provide your name, email address, and message before sending.</p>
                </div>
            `;
            return;
        }

        // Show sending state
        const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '<i class="fas fa-paper-plane"></i> Send Message';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        formStatus.className = 'form-status active';
        formStatus.innerHTML = `
            <div class="form-status-inner loading">
                <i class="fas fa-circle-notch fa-spin"></i>
                <span>Routing message directly to <strong>${escapeHtml(TARGET_EMAIL)}</strong>...</span>
            </div>
        `;

        const mailBody = `Hi Harish,\n\n${message}\n\nSender Details:\nName: ${name}\nEmail: ${email}`;
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        const mailtoUrl = `mailto:${encodeURIComponent(TARGET_EMAIL)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

        let success = false;
        let responseData = null;

        // Step 1: Try server API route first
        try {
            const serverRes = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });

            if (serverRes.ok) {
                responseData = await serverRes.json();
                success = true;
            }
        } catch (serverErr) {
            console.warn('Server contact route attempt failed, trying direct endpoint:', serverErr);
        }

        // Step 2: Fallback to direct FormSubmit AJAX if server route failed
        if (!success) {
            try {
                const directRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _replyto: email,
                        subject: `[Portfolio] ${subject} - from ${name}`,
                        message: message,
                        _captcha: 'false',
                        _template: 'table'
                    })
                });

                if (directRes.ok) {
                    responseData = await directRes.json();
                    success = true;
                }
            } catch (directErr) {
                console.warn('Direct endpoint attempt failed:', directErr);
            }
        }

        // Function to explicitly wipe and refresh all input fields
        function refreshFormFields() {
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (subjectInput) subjectInput.value = '';
            if (messageInput) messageInput.value = '';
            contactForm.reset();
        }

        // Handle outcomes
        if (success) {
            // Immediately refresh all form fields
            refreshFormFields();

            const isActivation = responseData && typeof responseData.message === 'string' && responseData.message.toLowerCase().includes('activation');

            if (isActivation) {
                formStatus.innerHTML = `
                    <div class="form-status-inner info">
                        <div class="status-title"><i class="fas fa-circle-check"></i> Message Captured!</div>
                        <p>Thank you, <strong>${escapeHtml(name)}</strong>. FormSubmit has dispatched an initial confirmation to <strong>${escapeHtml(TARGET_EMAIL)}</strong>. (Form fields have been refreshed). You can also send directly via Gmail below:</p>
                        <div class="status-quick-buttons">
                            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn-status-action">
                                <i class="fab fa-google"></i> Open in Gmail
                            </a>
                            <a href="${mailtoUrl}" class="btn-status-action">
                                <i class="fas fa-envelope"></i> Open Mail App
                            </a>
                            <button type="button" class="btn-status-action" id="resetContactFormBtn">
                                <i class="fas fa-rotate-right"></i> Send Another Message
                            </button>
                        </div>
                    </div>
                `;
            } else {
                formStatus.innerHTML = `
                    <div class="form-status-inner success">
                        <div class="status-title"><i class="fas fa-circle-check"></i> Message Delivered Successfully!</div>
                        <p>Thank you, <strong>${escapeHtml(name)}</strong>! Your message was delivered directly to <strong>${escapeHtml(TARGET_EMAIL)}</strong>. All fields have been refreshed. I will reply to <code>${escapeHtml(email)}</code> shortly.</p>
                        <div class="status-quick-buttons">
                            <button type="button" class="btn-status-action" id="resetContactFormBtn">
                                <i class="fas fa-rotate-right"></i> Send Another Message
                            </button>
                        </div>
                    </div>
                `;
            }

            const resetBtn = document.getElementById('resetContactFormBtn');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    formStatus.innerHTML = '';
                    formStatus.classList.remove('active');
                    refreshFormFields();
                    if (nameInput) nameInput.focus();
                });
            }
        } else {
            // Seamless zero-cost fallback: provide 1-click Gmail & Mail App dispatch
            formStatus.innerHTML = `
                <div class="form-status-inner info">
                    <div class="status-title"><i class="fas fa-envelope-open-text"></i> Message Ready to Send!</div>
                    <p>Your message has been pre-formatted for <strong>${escapeHtml(TARGET_EMAIL)}</strong>. Click below to deliver it via Gmail or your mail application:</p>
                    <div class="status-quick-buttons">
                        <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn-status-action">
                            <i class="fab fa-google"></i> Send via Gmail
                        </a>
                        <a href="${mailtoUrl}" class="btn-status-action">
                            <i class="fas fa-envelope"></i> Send via Mail App
                        </a>
                        <button type="button" class="btn-status-action" id="clearFallbackBtn">
                            <i class="fas fa-rotate-left"></i> Refresh Fields
                        </button>
                    </div>
                </div>
            `;

            const clearBtn = document.getElementById('clearFallbackBtn');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    formStatus.innerHTML = '';
                    formStatus.classList.remove('active');
                    refreshFormFields();
                    if (nameInput) nameInput.focus();
                });
            }
        }

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    });
}

// ============================================
// 12. VISUAL TEST AUTOMATION & COVERAGE PYRAMID
// ============================================

function initCoveragePyramid() {
    const pyramidStack = document.getElementById('pyramidStack');
    if (!pyramidStack) return;

    const tierButtons = document.querySelectorAll('.pyramid-tier');
    const detailPanel = document.getElementById('pyramidDetailPanel');
    const tierBadge = document.getElementById('detailTierBadge');
    const roleTag = document.getElementById('detailRoleTag');
    const titleElem = document.getElementById('detailTitle');
    const descElem = document.getElementById('detailDesc');
    const coverageLabel = document.getElementById('detailCoverageLabel');
    const coveragePercent = document.getElementById('detailCoveragePercent');
    const coverageFill = document.getElementById('detailCoverageFill');
    const checksList = document.getElementById('detailChecksList');
    const toolsTags = document.getElementById('detailToolsTags');
    const cycleBtn = document.getElementById('tierCycleBtn');

    const TIERS_DATA = {
        e2e: {
            id: 'e2e',
            tierNum: 'Tier 1 • Apex Layer',
            icon: 'fas fa-user-check',
            accentClass: 'tier-accent-indigo',
            fillClass: 'fill-indigo',
            title: 'E2E, Manual & Exploratory QA',
            roleTag: 'User Experience & Business Logic Validation',
            coverageLabel: 'Critical Path & Acceptance Coverage',
            coveragePercent: 98,
            desc: 'Rigorous manual and exploratory testing focused on enterprise IERP workflows, user journeys, edge scenarios, and defect lifecycle traceability from discovery to resolution.',
            checks: [
                'Boundary Value Analysis & Equivalence Partitioning across complex inputs',
                'Cross-role ERP permission checks & multi-tier authorization matrix',
                'Regression defect verification and sign-off before release deployment',
                'Visual & usability glitch identification across desktop & mobile environments'
            ],
            tools: ['Manual Testing', 'Test Matrices', 'Redmine Defect Tracker', 'IERP Web Apps', 'Chrome DevTools']
        },
        api: {
            id: 'api',
            tierNum: 'Tier 2 • Integration Layer',
            icon: 'fas fa-network-wired',
            accentClass: 'tier-accent-blue',
            fillClass: 'fill-blue',
            title: 'API, Contract & Microservices',
            roleTag: 'Headless Service Integrity & Contract Assertions',
            coverageLabel: 'REST Endpoint Verification & Contract Coverage',
            coveragePercent: 92,
            desc: 'Systematic API inspection using Postman workspaces to certify status codes, response payloads, authentication headers, schema compliance, and system boundary conditions.',
            checks: [
                'HTTP status code validation (200 OK, 201 Created, 400 Bad Request, 401/403 Auth)',
                'JSON Schema assertion and nested property type consistency',
                'Authentication bearer token life-cycle and payload boundary stress',
                'Endpoint latency benchmarks maintaining sub-150ms verification gates'
            ],
            tools: ['Postman', 'RESTful APIs', 'JSON Schema Validator', 'cURL', 'Swagger / OpenAPI']
        },
        db: {
            id: 'db',
            tierNum: 'Tier 3 • Persistence Layer',
            icon: 'fas fa-database',
            accentClass: 'tier-accent-emerald',
            fillClass: 'fill-emerald',
            title: 'Database Integrity & SQL Testing',
            roleTag: 'Data Consistency, Transactions & Relational Rules',
            coverageLabel: 'Relational Schema & Query Integrity',
            coveragePercent: 95,
            desc: 'Deep database integrity testing executing structured SQL queries in PostgreSQL and MySQL, auditing ACID compliance, complex JOIN accuracy, and preventing data corruption.',
            checks: [
                'Referential integrity enforcement & foreign key cascade audit',
                'Complex multi-table SQL JOIN queries for accurate report generation',
                'Stored procedure logic, edge-value triggers & transaction rollbacks',
                'Zero orphan record validation following record deletion and update cycles'
            ],
            tools: ['PostgreSQL', 'MySQL', 'DBeaver', 'SQL Query Analyzer', 'pgAdmin']
        },
        unit: {
            id: 'unit',
            tierNum: 'Tier 4 • Foundation Base Layer',
            icon: 'fas fa-microchip',
            accentClass: 'tier-accent-amber',
            fillClass: 'fill-amber',
            title: 'Logic Validation & AI Automation',
            roleTag: 'Fast-Feedback Base & AI-Assisted Test Synthesis',
            coverageLabel: 'Logic & Fast Feedback Coverage',
            coveragePercent: 88,
            desc: 'Foundation testing utilizing modern AI developer tooling (Google Gemini, Antigravity) to accelerate edge-case synthesis, generate comprehensive test data, and automate repetitive verification routines.',
            checks: [
                'AI-accelerated edge case generation using Google Gemini',
                'Antigravity workflow integration for rapid QA scripting & scenario drafting',
                'Automated CI/CD smoke test gates on Git commits and pull requests',
                'Synthetic test data generator for high-volume database stress tests'
            ],
            tools: ['Google Gemini', 'Antigravity', 'Git / GitHub CI', 'JavaScript', 'Runner Scripts']
        }
    };

    const tierKeys = ['e2e', 'api', 'db', 'unit'];
    let currentKeyIndex = 0;

    function renderTier(tierKey, animate = true) {
        const data = TIERS_DATA[tierKey];
        if (!data) return;

        currentKeyIndex = tierKeys.indexOf(tierKey);

        // Update active class on tier buttons
        tierButtons.forEach(btn => {
            const isMatch = btn.dataset.tier === tierKey;
            btn.classList.toggle('active', isMatch);
            btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });

        if (detailPanel) {
            detailPanel.setAttribute('aria-labelledby', `tierBtn-${tierKey}`);
        }

        // Animate panel update
        if (detailPanel && animate) {
            detailPanel.style.opacity = '0.35';
            detailPanel.style.transform = 'translateY(4px)';
        }

        setTimeout(() => {
            if (tierBadge) {
                tierBadge.className = `detail-tier-badge ${data.accentClass}`;
                tierBadge.innerHTML = `<i class="${data.icon}"></i> ${data.tierNum}`;
            }

            if (roleTag) {
                roleTag.textContent = data.roleTag;
            }

            if (titleElem) {
                titleElem.textContent = data.title;
            }

            if (descElem) {
                descElem.textContent = data.desc;
            }

            if (coverageLabel) {
                coverageLabel.textContent = data.coverageLabel;
            }

            if (coveragePercent) {
                coveragePercent.textContent = `${data.coveragePercent}%`;
            }

            if (coverageFill) {
                coverageFill.className = `coverage-bar-fill ${data.fillClass}`;
                coverageFill.style.width = '0%';
                requestAnimationFrame(() => {
                    coverageFill.style.width = `${data.coveragePercent}%`;
                });
            }

            if (checksList) {
                checksList.innerHTML = data.checks.map(check => `
                    <li><i class="fas fa-check-circle"></i> ${escapeHtml(check)}</li>
                `).join('');
            }

            if (toolsTags) {
                toolsTags.innerHTML = data.tools.map(tool => `
                    <span class="tool-tag">${escapeHtml(tool)}</span>
                `).join('');
            }

            if (detailPanel && animate) {
                detailPanel.style.opacity = '1';
                detailPanel.style.transform = 'translateY(0)';
            }
        }, animate ? 140 : 0);
    }

    // Attach click listeners to all pyramid tier buttons
    tierButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tier = btn.dataset.tier;
            if (tier) renderTier(tier, true);
        });
    });

    // Cycle Next button
    if (cycleBtn) {
        cycleBtn.addEventListener('click', () => {
            const nextIndex = (currentKeyIndex + 1) % tierKeys.length;
            renderTier(tierKeys[nextIndex], true);
        });
    }
}

