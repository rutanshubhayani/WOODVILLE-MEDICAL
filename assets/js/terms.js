/* ========================================
   TERMS & CONDITIONS PAGE SCRIPTS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            easing: 'ease-out-cubic',
            once: true
        });
    }

    // Table of Contents functionality
    initTableOfContents();
    
    // Back to top button functionality
    initBackToTopButton();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Reading progress indicator
    initReadingProgress();
});

function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.terms-section');
    
    // Handle TOC link clicks
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tocLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                tocLinks.forEach(link => link.classList.remove('active'));
                if (tocLinks[index]) {
                    tocLinks[index].classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Handle button click
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initSmoothScrolling() {
    // Handle all anchor links with smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initReadingProgress() {
    // Create reading progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(0, 212, 212, 0.1);
            z-index: 9999;
            transition: opacity 0.3s ease;
        }
        
        .reading-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-color), #00b8b8);
            width: 0%;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(0, 212, 212, 0.5);
        }
        
        .reading-progress.hidden {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    const progressFill = progressBar.querySelector('.reading-progress-fill');
    
    // Update progress on scroll
    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressFill.style.width = progress + '%';
        
        // Hide progress bar when at top
        if (scrollTop < 100) {
            progressBar.classList.add('hidden');
        } else {
            progressBar.classList.remove('hidden');
        }
    }
    
    // Throttled scroll event listener for progress
    let progressTicking = false;
    window.addEventListener('scroll', function() {
        if (!progressTicking) {
            requestAnimationFrame(function() {
                updateReadingProgress();
                progressTicking = false;
            });
            progressTicking = true;
        }
    });
    
    // Initial call
    updateReadingProgress();
}

// Add intersection observer for section animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('.terms-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate section elements
                const sectionIcon = entry.target.querySelector('.section-icon');
                const sectionContent = entry.target.querySelector('.section-content');
                
                if (sectionIcon) {
                    sectionIcon.style.animation = 'iconFloat 3s ease-in-out infinite';
                }
                
                if (sectionContent) {
                    sectionContent.style.animation = 'fadeInUp 0.6s ease-out';
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize section animations
initSectionAnimations();

// Add hover effects to interactive elements
function initHoverEffects() {
    // Service items hover effect
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Requirement items slide effect
    const requirementItems = document.querySelectorAll('.requirement-item');
    requirementItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Timeline items pulse effect
    const timelineIcons = document.querySelectorAll('.timeline-icon');
    timelineIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s ease-in-out infinite';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Add pulse animation for timeline
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 212, 212, 0.3);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(0, 212, 212, 0.6);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Initialize hover effects
initHoverEffects();

// Add copy link functionality to section headers
function initCopyLinkFeature() {
    const sectionHeaders = document.querySelectorAll('.terms-section h2');
    
    sectionHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.title = 'Click to copy link to this section';
        
        header.addEventListener('click', function() {
            const sectionId = this.closest('.terms-section').id;
            const currentUrl = window.location.href.split('#')[0];
            const sectionUrl = `${currentUrl}#${sectionId}`;
            
            // Copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(sectionUrl).then(() => {
                    showTooltip(this, 'Link copied!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = sectionUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showTooltip(this, 'Link copied!');
            }
        });
    });
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--secondary-color);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        transform: translateX(-50%);
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 40 + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}

// Initialize copy link feature
initCopyLinkFeature();
