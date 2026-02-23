// ============================================
// INTRO ANIMATION → HEADER TRANSITION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const header = document.getElementById('header');
    const mainContent = document.getElementById('mainContent');
    
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        introScreen.classList.add('hidden');
        header.classList.add('visible');
        mainContent.classList.add('visible');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            if (introScreen && introScreen.parentNode) {
                introScreen.remove();
            }
        }, 800);
        
        createFloatingParticles();
        
    }, 2500);
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('scrollProgressBar');
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// ============================================
// FLOATING PARTICLES (Gold)
// ============================================

function createFloatingParticles() {
    const container = document.getElementById('floatingParticles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0';
        
        // Animation
        const duration = 20 + Math.random() * 20;
        particle.style.animationDuration = duration + 's';
        const delay = Math.random() * 10;
        particle.style.animationDelay = delay + 's';
        const drift = (Math.random() - 0.5) * 150;
        particle.style.setProperty('--drift', drift + 'px');
        
        container.appendChild(particle);
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#!') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 40;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER (Scroll Animations)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.observe').forEach(el => {
    observer.observe(el);
});

// ============================================
// REVENUE ARCHITECTURE LABEL (Show after intro)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Show label after intro animation
    setTimeout(() => {
        const architectureLabel = document.getElementById('revenueArchitectureLabel');
        if (architectureLabel) {
            architectureLabel.classList.add('visible');
        }
    }, 3000); // Same timing as intro screen removal
});

// ============================================
// AGENCY NAME VISIBILITY (Hide on Scroll)
// ============================================

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const agencyName = document.getElementById('headerAgencyName');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        if (agencyName) {
            agencyName.style.opacity = '0';
            agencyName.style.transform = 'translateY(-10px)';
            agencyName.style.maxHeight = '0';
        }
    } else {
        header.classList.remove('scrolled');
        if (agencyName) {
            agencyName.style.opacity = '1';
            agencyName.style.transform = 'translateY(0)';
            agencyName.style.maxHeight = '20px';
        }
    }
});
