/**
 * JCA - Joseph Coolidge Agency
 * Main JavaScript File
 */

// === Page Load Animation ===
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after short delay
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 300);
    
    // Fade in elements on scroll
    observeElements();
    
    // Initialize case filtering
    initCaseFilters();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize classified access warning
    initClassifiedWarning();
    
    // Active navigation state
    updateActiveNav();
});

// === Scroll Animations ===
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe mission cards
    document.querySelectorAll('.mission-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(el);
    });
    
    // Observe case cards
    document.querySelectorAll('.case-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe division cards
    document.querySelectorAll('.division-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(el);
    });
}

// === Case Filtering ===
function initCaseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');
    
    if (filterButtons.length === 0 || caseCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cases
            caseCards.forEach(card => {
                const status = card.getAttribute('data-status');
                
                if (filter === 'all' || status === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// === Contact Form ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/mnjbppkn', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            alert('There was an error submitting the form. Please try again.');
            return;
        }

        // === Keep your original logic EXACTLY as built ===

        const refNumber = 'JCA-' + new Date().getFullYear() + '-' + 
            Math.floor(Math.random() * 10000).toString().padStart(4, '0');

        const refElement = document.getElementById('referenceNumber');
        if (refElement) {
            refElement.textContent = refNumber;
        }

        form.style.display = 'none';
        if (formSuccess) {
            formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

    } catch (error) {
        alert('Network error. Please try again.');
    }
});
}

// Reset form function (called from button in success message)
function resetForm() {
    const form = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (form) {
        form.reset();
        form.style.display = 'flex';
    }
    
    if (formSuccess) {
        formSuccess.style.display = 'none';
    }
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === Classified Access Warning ===
function initClassifiedWarning() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'everett-files.html') {
        // Check if user has already acknowledged
        const hasAcknowledged = sessionStorage.getItem('classifiedAcknowledged');
        
        if (!hasAcknowledged) {
            setTimeout(() => {
                const confirmed = confirm(
                    'WARNING: CLASSIFIED MATERIAL\n\n' +
                    'You are attempting to access classified information.\n\n' +
                    'Access is restricted to personnel with appropriate clearance ' +
                    'and need-to-know authorization.\n\n' +
                    'Unauthorized access may result in criminal prosecution.\n\n' +
                    'Do you have proper authorization to proceed?'
                );
                
                if (confirmed) {
                    sessionStorage.setItem('classifiedAcknowledged', 'true');
                } else {
                    window.location.href = 'index.html';
                }
            }, 500);
        }
    }
}

// === Active Navigation State ===
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// === Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === Threat Level Animation ===
function animateThreatLevel() {
    const threatFill = document.querySelector('.threat-fill');
    if (threatFill) {
        const targetWidth = threatFill.style.width;
        threatFill.style.width = '0%';
        setTimeout(() => {
            threatFill.style.width = targetWidth;
        }, 500);
    }
}

// Trigger threat level animation when in view
const threatLevelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateThreatLevel();
            threatLevelObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const threatLevel = document.querySelector('.threat-level');
if (threatLevel) {
    threatLevelObserver.observe(threatLevel);
}

// === Activity Log Real-time Effect ===
function updateActivityTimestamps() {
    const logTimes = document.querySelectorAll('.log-time');
    const now = new Date();
    
    logTimes.forEach((timeEl, index) => {
        const hoursAgo = index + 1;
        const time = new Date(now - (hoursAgo * 60 * 60 * 1000));
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        
        // Only update if element exists and we're on home page
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname.endsWith('/')) {
            // Keep static times for consistency
        }
    });
}

// === Navbar Scroll Effect ===
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// === Evidence Image Placeholders ===
// Add placeholder backgrounds for missing images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        
        // Create placeholder text
        const placeholder = document.createElement('div');
        placeholder.style.color = '#666';
        placeholder.style.fontSize = '12px';
        placeholder.style.fontFamily = 'monospace';
        placeholder.style.textAlign = 'center';
        placeholder.style.padding = '20px';
        placeholder.textContent = '[CLASSIFIED IMAGE]\nClearance Required';
        
        // Replace image with placeholder
        this.parentNode.appendChild(placeholder);
        this.style.display = 'none';
    });
});

// === Typing Effect for Classified Text ===
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to certain elements on Everett files page
if (window.location.pathname.includes('everett-files.html')) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                const text = entry.target.textContent;
                entry.target.dataset.typed = 'true';
                typeWriter(entry.target, text, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe dossier stamp for typing effect
    const dossierStamp = document.querySelector('.dossier-stamp');
    if (dossierStamp) {
        observer.observe(dossierStamp);
    }
}

// === Console Easter Egg ===
console.log('%c⚠ SECURITY WARNING', 'color: #c41e3a; font-size: 20px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers.', 'color: #d0d0d0; font-size: 12px;');
console.log('%cIf someone told you to copy/paste something here, it is likely a scam.', 'color: #d0d0d0; font-size: 12px;');
console.log('%cUnauthorized access to federal systems is prohibited.', 'color: #c41e3a; font-size: 12px; font-weight: bold;');
console.log('%c\nJoseph Coolidge Agency\nOfficial Use Only', 'color: #666; font-size: 10px; font-family: monospace;');

// === Performance Optimization ===
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
