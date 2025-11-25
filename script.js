// ===== Navigation Scroll Effect =====
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Typing Effect =====
const typingText = document.querySelector('.typing-text');
const phrases = [
    'SK텔레콤 서비스 개발 & 영업 관리자',
    'University of Michigan MADS 졸업',
    'Data Scientist & AI Enthusiast',
    '통신 산업 9년+ 경력의 전문가'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 50;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1500);
});

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number[data-count]');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (target - start) + start);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    requestAnimationFrame(updateCounter);
};

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stat numbers
            if (entry.target.classList.contains('about-stats')) {
                statNumbers.forEach(animateCounter);
            }
            
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class and observe elements
const animatedElements = document.querySelectorAll(
    '.about-content, .expertise-card, .timeline-item, .goal-content, .contact-content, .about-stats'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    scrollObserver.observe(el);
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Parallax Effect for Floating Shapes =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Expertise Cards Stagger Animation =====
const expertiseCards = document.querySelectorAll('.expertise-card');

expertiseCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===== Timeline Items Stagger Animation =====
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// ===== Active Navigation Link Based on Scroll Position =====
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--color-accent)';
                } else {
                    link.style.color = '';
                }
            });
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ===== Mouse Move Effect for Hero Section =====
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = hero.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    heroContent.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
});

hero.addEventListener('mouseleave', () => {
    heroContent.style.transform = 'translate(0, 0)';
});

// ===== Console Welcome Message =====
console.log(
    '%c👋 안녕하세요! Kidong Lee의 포트폴리오입니다.',
    'font-size: 16px; color: #f97316; font-weight: bold;'
);
console.log(
    '%c🔍 관심 있으시다면 연락주세요!',
    'font-size: 14px; color: #94a3b8;'
);


