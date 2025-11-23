// Function to get base path
function getBasePath() {
    if (window.location.pathname.includes('/assets/pages/')) {
        return '../../';
    }
    return '';
}

// Function to load component
async function loadComponent(selector, path) {
    try {
        const response = await fetch(path);
        if (response.ok) {
            let html = await response.text();

            // Rewrite relative paths if we are in a subdirectory
            const basePath = getBasePath();
            if (basePath) {
                // Create a temporary element to parse HTML
                const temp = document.createElement('div');
                temp.innerHTML = html;

                // Fix links (a tags)
                const links = temp.querySelectorAll('a');
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
                        link.setAttribute('href', basePath + href);
                    }
                });

                // Fix images (img tags)
                const images = temp.querySelectorAll('img');
                images.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                        img.setAttribute('src', basePath + src);
                    }
                });

                html = temp.innerHTML;
            }

            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = html;
            }
        } else {
            console.error(`Failed to load component from ${path}`);
        }
    } catch (error) {
        console.error(`Error loading component from ${path}:`, error);
    }
}

// Function to set active navigation
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if href matches current page (handling relative paths)
        const href = link.getAttribute('href');
        if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
            link.classList.add('active');
        }
    });
}

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', async function () {
    const basePath = getBasePath();

    await loadComponent('#header-placeholder', basePath + 'assets/components/header.html');
    if (typeof initializeSearch === 'function') {
        initializeSearch();
    }
    await loadComponent('#footer-placeholder', basePath + 'assets/components/footer.html');
    await loadComponent('#cart-sidebar-placeholder', basePath + 'assets/components/cart-sidebar.html');
    await loadComponent('#product-modal-placeholder', basePath + 'assets/components/product-modal.html');

    // Set active navigation after header is loaded
    setTimeout(setActiveNav, 100);

    // Initialize page-specific functionality
    initializePage();

    // Initialize any existing cart functionality
    if (typeof initializeCart === 'function') {
        initializeCart();
    }
});

// Initialize page-specific functionality
function initializePage() {
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.subject || !data.message) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}
