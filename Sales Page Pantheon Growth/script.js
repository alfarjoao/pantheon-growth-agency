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

// ============================================
// VIDEO CASE STUDIES ACCORDION (SMOOTH + MÚLTIPLOS)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-accordion');
            const panel = document.getElementById(targetId);
            
            if (!panel) {
                console.warn(`Accordion panel with ID "${targetId}" not found`);
                return;
            }
            
            // Toggle active state
            const isActive = trigger.classList.contains('active');
            
            // (OPCIONAL) Fechar outros acordeões na mesma secção
            // Descomenta se quiseres que apenas 1 acordeão esteja aberto de cada vez
            /*
            const parentSection = trigger.closest('.team-section');
            if (parentSection) {
                parentSection.querySelectorAll('.accordion-trigger').forEach(otherTrigger => {
                    if (otherTrigger !== trigger) {
                        otherTrigger.classList.remove('active');
                        const otherPanelId = otherTrigger.getAttribute('data-accordion');
                        const otherPanel = document.getElementById(otherPanelId);
                        if (otherPanel) {
                            otherPanel.classList.remove('active');
                        }
                    }
                });
            }
            */
            
            // Toggle current accordion
            if (isActive) {
                trigger.classList.remove('active');
                panel.classList.remove('active');
            } else {
                trigger.classList.add('active');
                panel.classList.add('active');
                
                // Smooth scroll to accordion after opening (optional)
                setTimeout(() => {
                    const rect = trigger.getBoundingClientRect();
                    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isVisible) {
                        trigger.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'nearest' 
                        });
                    }
                }, 400); // Delay para coincidir com animação CSS (0.4s)
            }
        });
    });
});

// ============================================
// CONSOLE LOG (Debug)
// ============================================

console.log('%c🏛️ Pantheon Growth', 'font-size: 20px; font-weight: bold; color: #C4A86A;');
console.log('%cRevenue Architecture Ecosystem', 'font-size: 12px; color: #888;');

// ============================================
// TEAM SECTION - SCROLL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    const divisionExplainer = document.querySelector('.division-explainer');
    
    const teamObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, teamObserverOptions);
    
    teamMembers.forEach(member => {
        teamObserver.observe(member);
    });
    
    if (divisionExplainer) {
        // Animation for explainer (fade up with delay)
        divisionExplainer.style.opacity = '0';
        divisionExplainer.style.transform = 'translateY(40px)';
        divisionExplainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        teamObserver.observe(divisionExplainer);
        
        divisionExplainer.addEventListener('transitionend', function handler() {
            if (this.classList.contains('in-view')) {
                this.style.opacity = '1';
                this.style.transform = 'translateY(0)';
                this.removeEventListener('transitionend', handler);
            }
        });
    }
});

// ============================================
// PROFILE IMAGE PARALLAX EFFECT (Subtle)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const profileImages = document.querySelectorAll('.profile-image');
    
    window.addEventListener('scroll', () => {
        profileImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
            
            if (scrollPercent > 0 && scrollPercent < 1) {
                const translateY = (scrollPercent - 0.5) * 15; // Subtle parallax
                img.style.transform = `translateY(${translateY}px) scale(1)`;
            }
        });
    });
});

// ============================================
// ACCORDION TRIGGER TEXT ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    
    accordionTriggers.forEach(trigger => {
        const originalText = trigger.querySelector('.accordion-trigger-text').textContent;
        
        trigger.addEventListener('click', () => {
            const isActive = trigger.classList.contains('active');
            const textElement = trigger.querySelector('.accordion-trigger-text');
            
            // Optional: Change text when opened
            // if (isActive) {
            //     textElement.innerHTML = textElement.innerHTML.replace('Case Studies', 'Hide Case Studies');
            // } else {
            //     textElement.innerHTML = textElement.innerHTML.replace('Hide Case Studies', 'Case Studies');
            // }
        });
    });
});

// ============================================
// SPECIALTY TAGS HOVER EFFECT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const specialtyTags = document.querySelectorAll('.specialty-tag');
    
    specialtyTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // Add subtle animation to siblings
            const siblings = Array.from(this.parentElement.children).filter(child => child !== this);
            siblings.forEach(sibling => {
                sibling.style.opacity = '0.5';
                sibling.style.transform = 'scale(0.95)';
            });
        });
        
        tag.addEventListener('mouseleave', function() {
            const siblings = Array.from(this.parentElement.children).filter(child => child !== this);
            siblings.forEach(sibling => {
                sibling.style.opacity = '1';
                sibling.style.transform = 'scale(1)';
            });
        });
    });
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c🏛️ PANTHEON GROWTH', 'font-size: 24px; font-weight: 700; color: #C4A86A; text-shadow: 0 2px 4px rgba(0,0,0,0.3);');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #C4A86A;');
console.log('%cRevenue Architecture Ecosystem', 'font-size: 13px; color: #888; font-weight: 300;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #C4A86A;');
console.log('%cFoundation → Amplification → Compounding', 'font-size: 11px; color: #666; font-style: italic;');

// ============================================
// TEAM SECTION SCROLL ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const teamObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, teamObserverOptions);

    // Observe team header
    const teamHeader = document.querySelector('.team-header');
    if (teamHeader) {
        teamHeader.style.opacity = '0';
        teamHeader.style.transform = 'translateY(40px)';
        teamHeader.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        teamObserver.observe(teamHeader);
    }

    // Observe team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        member.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        teamObserver.observe(member);
    });

    // Observe profile cards
    document.querySelectorAll('.profile-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(20px)';
        card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        teamObserver.observe(card);
    });
});

// ============================================
// PROFILE BADGE ROTATION ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const badges = document.querySelectorAll('.profile-badge');
    const scrollPosition = window.scrollY;
    
    badges.forEach((badge, index) => {
        const rotation = (scrollPosition * 0.1) + (index * 90);
        badge.style.transform = `rotate(${rotation}deg)`;
    });
});

// ============================================
// SPECIALTY TAGS HOVER EFFECT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const specialtyTags = document.querySelectorAll('.specialty-tag');
    
    specialtyTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });
});

console.log('%cTeam Section Loaded', 'font-size: 12px; color: #C4A86A;');
