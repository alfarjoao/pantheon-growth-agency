// ============================================
// INTRO ANIMATION → SOPHISTICATED TRANSITION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const header = document.getElementById('header');
    const mainContent = document.getElementById('mainContent');
    
    // Lock scroll during intro
    document.body.style.overflow = 'hidden';
    
    // Sophisticated fade out timing
    setTimeout(() => {
        // Start fade out
        introScreen.classList.add('hidden');
        
        // Delay header/content appearance slightly for smoother transition
        setTimeout(() => {
            header.classList.add('visible');
            mainContent.classList.add('visible');
            document.body.style.overflow = 'auto';
        }, 400); // Header appears 400ms into intro fade
        
        // Remove intro from DOM after complete fade
        setTimeout(() => {
            if (introScreen && introScreen.parentNode) {
                introScreen.remove();
            }
        }, 1200); // Match CSS transition duration
        
        // Initialize particles after intro starts fading
        setTimeout(() => {
            createFloatingParticles();
        }, 600);
        
    }, 2400); // Total intro display time
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

// Accordion functionality for case studies
document.addEventListener('DOMContentLoaded', function() {
    const accordionTriggers = document.querySelectorAll('[data-accordion-trigger]');
    
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const panelId = this.getAttribute('data-accordion-trigger');
            const panel = document.getElementById(panelId);
            const isActive = panel.classList.contains('active');
            
            // Close all panels
            document.querySelectorAll('.accordion-panel').forEach(p => {
                p.classList.remove('active');
            });
            document.querySelectorAll('.case-header').forEach(h => {
                h.classList.remove('active');
            });
            
            // Open clicked panel if it wasn't active
            if (!isActive) {
                panel.classList.add('active');
                this.classList.add('active');
                
                // Smooth scroll to panel
                setTimeout(() => {
                    const rect = this.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const headerOffset = 100;
                    
                    if (rect.top < headerOffset) {
                        window.scrollTo({
                            top: scrollTop + rect.top - headerOffset,
                            behavior: 'smooth'
                        });
                    }
                }, 400);
            }
        });
    });
});

/* ========================================
   SECTION 9: PRICING / INVESTMENT TIERS
   Complete JavaScript Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ===== PACK DATA (3 TIERS COM LOGOS) =====
    const packData = {
        foundation: {
            name: 'FOUNDATION',
            price: '$15K–$25K',
            description: 'Your first integrated revenue system. Website, SEO, paid media, and content—built as one architecture to start generating predictable growth.',
            features: [
                'Conversion-optimized website (10–15 pages)',
                'Technical SEO infrastructure',
                'Paid media funnel architecture (Meta, Google)',
                'Content strategy framework',
                'Analytics & tracking setup (GA4, GTM)',
                '90-day optimization roadmap'
            ],
            supportBadge: '8–10 WEEKS BUILD',
            // Logo de fundo (lado direito)
            symbol: `<img src="assets/images/logo/foundation-logo.png" alt="Foundation" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.08; filter: grayscale(0.5);">`
        },
        
        growth: {
            name: 'GROWTH',
            price: '$25K–$40K',
            description: 'Advanced revenue architecture for businesses ready to scale aggressively. Deeper systems, tighter feedback loops, exponential results.',
            features: [
                'Everything in Foundation',
                'Advanced funnel optimization (A/B testing)',
                'Local SEO + reputation management',
                'Omnichannel paid media strategy',
                'Customer journey automation (CRM integration)',
                'Conversion rate optimization (CRO)',
                '6-month performance optimization included'
            ],
            supportBadge: '10–14 WEEKS BUILD',
            // Logo de fundo (lado direito)
            symbol: `<img src="assets/images/logo/growth-logo.png" alt="Growth" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.08; filter: grayscale(0.5);">`
        },
        
        dominance: {
            name: 'DOMINANCE',
            price: '$40K–$50K+',
            description: 'Enterprise-level revenue engineering. Custom systems, proprietary frameworks, market-leading execution. Built for businesses ready to own their market.',
            features: [
                'Everything in Growth',
                'Custom proprietary tech stack',
                'Multi-location/multi-brand architecture',
                'Advanced attribution modeling',
                'Predictive analytics & forecasting',
                'Dedicated performance strategist (12 months)',
                'Quarterly deep-dive audits + strategic pivots'
            ],
            supportBadge: '14–18 WEEKS BUILD',
            // Logo Pantheon Growth de fundo (lado direito)
            symbol: `<img src="assets/images/logo/pantheon-growth-logo.png" alt="Pantheon Growth" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.08; filter: grayscale(0.5);">`
        }
    };

    // ===== 8 OVERVIEW CARDS DATA =====
    const overviewCards = [
        {
            title: 'Website Design',
            description: '10 to 12 pages',
            badge: 'all',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>`,
            details: {
                foundation: { text: '10–15 pages', included: true },
                growth: { text: '10–15 pages + advanced', included: true },
                dominance: { text: '10–12 pages + blog', included: true }
            }
        },
        {
            title: 'SEO',
            description: 'Technical to advanced',
            badge: 'all',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
            </svg>`,
            details: {
                foundation: { text: 'Technical SEO foundation', included: true },
                growth: { text: 'Advanced local SEO + GMB', included: true },
                dominance: { text: 'Advanced + competitor analysis', included: true }
            }
        },
        {
            title: 'Paid Media',
            description: 'Meta & Google Ads',
            badge: 'all',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>`,
            details: {
                foundation: { text: 'Funnel architecture', included: true },
                growth: { text: 'Omnichannel strategy', included: true },
                dominance: { text: 'Omnichannel + attribution', included: true }
            }
        },
        {
            title: 'Content',
            description: 'Strategy to automation',
            badge: 'all',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>`,
            details: {
                foundation: { text: 'Content strategy framework', included: true },
                growth: { text: 'Content + customer journey', included: true },
                dominance: { text: 'Full content + storytelling', included: true }
            }
        },
        {
            title: 'CRO',
            description: 'A/B testing',
            badge: 'growth-dom',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>`,
            details: {
                foundation: { text: 'Not included', included: false },
                growth: { text: 'CRO optimization', included: true },
                dominance: { text: 'Advanced CRO + A/B testing', included: true }
            }
        },
        {
            title: 'Analytics',
            description: 'GA4 + dashboards',
            badge: 'all',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>`,
            details: {
                foundation: { text: 'GA4 + GTM setup', included: true },
                growth: { text: 'Full analytics + reports', included: true },
                dominance: { text: 'Predictive analytics', included: true }
            }
        },
        {
            title: 'Automation',
            description: 'CRM to journeys',
            badge: 'growth-dom',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m5.66 5.66l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m5.66-5.66l4.24-4.24"/>
            </svg>`,
            details: {
                foundation: { text: 'Not included', included: false },
                growth: { text: 'Customer journey automation', included: true },
                dominance: { text: 'Full automation + CRM', included: true }
            }
        },
        {
            title: 'Support',
            description: '90-day priority',
            badge: 'all',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#C4A86A" stroke-width="1.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>`,
            details: {
                foundation: { text: '90-day support', included: true },
                growth: { text: '6-month optimization', included: true },
                dominance: { text: '12-month strategist', included: true }
            }
        }
    ];

    // ===== UPDATE OVERVIEW CARDS (8 CARDS NO TOPO) =====
    function updateOverviewCards(packName) {
        const container = document.getElementById('features-overview');
        
        if (!container) {
            console.error('Element #features-overview not found');
            return;
        }
        
        container.innerHTML = overviewCards.map(card => {
            const isIncluded = card.details[packName].included;
            const disabledClass = isIncluded ? '' : 'disabled';
            
            return `
                <div class="overview-card ${disabledClass}">
                    <div class="overview-icon">${card.icon}</div>
                    <h4 class="overview-title">${card.title}</h4>
                    <p class="overview-description">${card.details[packName].text}</p>
                    <span class="overview-badge ${card.badge}">${card.badge === 'all' ? 'ALL' : 'GROWTH + DOM'}</span>
                </div>
            `;
        }).join('');
    }

    // ===== UPDATE PACK DETAILS (COLUNA DIREITA) =====
    function updatePackDetails(packName) {
        const detailsContainer = document.getElementById('pack-details');
        
        if (!detailsContainer) {
            console.error('Element #pack-details not found');
            return;
        }
        
        const pack = packData[packName];
        
        // Add fading transition
        detailsContainer.classList.add('fading');
        
        setTimeout(() => {
            detailsContainer.innerHTML = `
                <div class="pack-symbol-bg">${pack.symbol}</div>
                <div class="details-header">
                    <h3 class="details-name">${pack.name}</h3>
                    <div class="details-price">${pack.price} <span>one-time investment</span></div>
                    <p class="details-description">${pack.description}</p>
                </div>
                <ul class="details-features">
                    ${pack.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <div class="support-badge">${pack.supportBadge}</div>
            `;
            
            detailsContainer.classList.remove('fading');
            
            // Update overview cards
            updateOverviewCards(packName);
        }, 300);
    }

    // ===== PACK SELECTOR CLICK HANDLER =====
    const packOptions = document.querySelectorAll('.pack-option');
    
    if (packOptions.length === 0) {
        console.error('No .pack-option elements found');
        return;
    }
    
    packOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            packOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update logo styles (remove need for stroke attribute change)
            document.querySelectorAll('.pack-logo').forEach(logo => {
                logo.style.opacity = '0.7';
                logo.style.filter = 'grayscale(0.3) brightness(0.9)';
            });
            
            const activeLogo = this.querySelector('.pack-logo');
            if (activeLogo) {
                activeLogo.style.opacity = '1';
                activeLogo.style.filter = 'grayscale(0) brightness(1.2) drop-shadow(0 2px 8px rgba(196, 168, 106, 0.4))';
            }
            
            // Update pack details
            const packName = this.dataset.pack;
            if (packName && packData[packName]) {
                updatePackDetails(packName);
            } else {
                console.error('Invalid pack name:', packName);
            }
        });
    });

    // ===== INITIALIZE WITH GROWTH TIER =====
    // Set initial active state
    const growthOption = document.querySelector('.pack-option[data-pack="growth"]');
    if (growthOption) {
        growthOption.classList.add('active');
        const growthLogo = growthOption.querySelector('.pack-logo');
        if (growthLogo) {
            growthLogo.style.opacity = '1';
            growthLogo.style.filter = 'grayscale(0) brightness(1.2) drop-shadow(0 2px 8px rgba(196, 168, 106, 0.4))';
        }
    }
    
    // Load initial content
    updatePackDetails('growth');
    
    console.log('✅ Pricing section initialized successfully');

}); // End DOMContentLoaded

console.log('%cTeam Section Loaded', 'font-size: 12px; color: #C4A86A;');
