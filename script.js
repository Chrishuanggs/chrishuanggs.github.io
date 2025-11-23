// ===================================
// Language Switcher
// ===================================
const languageToggle = document.getElementById('languageToggle');
const langButtons = document.querySelectorAll('.lang-btn');
let currentLang = 'es';

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    switchLanguage(savedLang);
});

// Language button click handlers
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        switchLanguage(lang);
    });
});

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-es]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-es-placeholder]').forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    
    // Add navbar shadow on scroll
    const navbar = document.getElementById('mainNav');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Download CV Functionality
// ===================================
const downloadCVBtn = document.getElementById('downloadCV');

downloadCVBtn.addEventListener('click', async () => {
    // Get the correct CV based on language
    const cvFilename = currentLang === 'es' ? 'CV_Chris_Huang_ESP.pdf' : 'CV_Chris_Huang_EN.pdf';
    
    try {
        // Create a link element
        const link = document.createElement('a');
        link.href = cvFilename;
        link.download = cvFilename;
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showNotification(
            currentLang === 'es' 
                ? '¡CV descargado exitosamente!' 
                : 'CV downloaded successfully!',
            'success'
        );
    } catch (error) {
        console.error('Error downloading CV:', error);
        showNotification(
            currentLang === 'es' 
                ? 'Error al descargar el CV. Por favor intenta nuevamente.' 
                : 'Error downloading CV. Please try again.',
            'error'
        );
    }
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Validate form
    if (!validateForm(formData)) {
        showFormMessage(
            currentLang === 'es' 
                ? 'Por favor completa todos los campos correctamente.' 
                : 'Please fill in all fields correctly.',
            'error'
        );
        return;
    }
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin me-2"></i>${currentLang === 'es' ? 'Enviando...' : 'Sending...'}`;
    
    try {
        // Simulate form submission (replace with actual API call)
        await simulateFormSubmission(formData);
        
        // Show success message
        showFormMessage(
            currentLang === 'es' 
                ? '¡Mensaje enviado exitosamente! Te contactaré pronto.' 
                : 'Message sent successfully! I will contact you soon.',
            'success'
        );
        
        // Reset form
        contactForm.reset();
        
        // Send notification
        showNotification(
            currentLang === 'es' 
                ? '¡Gracias por contactarme!' 
                : 'Thank you for contacting me!',
            'success'
        );
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage(
            currentLang === 'es' 
                ? 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente o contáctame directamente por email.' 
                : 'There was an error sending the message. Please try again or contact me directly via email.',
            'error'
        );
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

function validateForm(data) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check all fields are filled
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    
    // Validate email format
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Check minimum lengths
    if (data.name.length < 2 || data.subject.length < 3 || data.message.length < 10) {
        return false;
    }
    
    return true;
}

async function simulateFormSubmission(data) {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form Data:', data);
            // In production, this would be an actual API call:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            resolve();
        }, 1500);
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '16px 24px',
        background: type === 'success' ? 'rgba(39, 201, 63, 0.95)' : 'rgba(255, 95, 86, 0.95)',
        color: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '500',
        animation: 'slideInRight 0.3s ease',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Intersection Observer for Animations
// ===================================
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

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Typing Effect for Hero Section
// ===================================
const roles = {
    es: [
        'Ingeniero de Software',
        'Desarrollador Full Stack',
        'Creador de Soluciones',
        'Innovador Tecnológico'
    ],
    en: [
        'Software Engineer',
        'Full Stack Developer',
        'Solution Creator',
        'Tech Innovator'
    ]
};

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroSubtitle = document.querySelector('.hero-subtitle');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
    const currentRoles = roles[currentLang];
    const currentRole = currentRoles[roleIndex];
    
    if (isDeleting) {
        heroSubtitle.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroSubtitle.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseTime);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % currentRoles.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeEffect, speed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// ===================================
// Project Gallery Interactive Features
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// Skills Animation on Hover
// ===================================
document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.addEventListener('click', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// ===================================
// Copy Email to Clipboard
// ===================================
document.querySelectorAll('.contact-text a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const email = this.textContent;
        
        navigator.clipboard.writeText(email).then(() => {
            showNotification(
                currentLang === 'es' 
                    ? '¡Email copiado al portapapeles!' 
                    : 'Email copied to clipboard!',
                'success'
            );
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
});

// ===================================
// Preloader (Optional Enhancement)
// ===================================
window.addEventListener('load', () => {
    document.body.style.overflow = 'visible';
    
    // Add entrance animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'fadeInUp 0.8s ease forwards';
            }, index * 100);
        });
    }, 100);
});

// ===================================
// Mobile Menu Close on Outside Click
// ===================================
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (navbar.classList.contains('show') && 
        !navbar.contains(e.target) && 
        !toggler.contains(e.target)) {
        navbar.classList.remove('show');
    }
});

// ===================================
// Accessibility Enhancements
// ===================================
// Keyboard navigation for custom elements
document.querySelectorAll('.project-link, .social-links a, .contact-social a').forEach(element => {
    element.setAttribute('tabindex', '0');
    
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            element.click();
        }
    });
});

// Focus visible for better accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// Performance Optimization
// ===================================
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Console Easter Egg
// ===================================
console.log('%c¡Hola Developer! 👋', 'color: #6c5ce7; font-size: 20px; font-weight: bold;');
console.log('%cBuilding the future, one line at a time 🚀', 'color: #fd79a8; font-size: 14px;');
console.log('%c¿Interesado en colaborar? Contáctame: chrishuang060@gmail.com', 'color: #adb5bd; font-size: 12px;');

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Log error for debugging but don't show to user
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===================================
// Service Worker Registration (Optional PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

console.log('Portfolio loaded successfully! 🎉');