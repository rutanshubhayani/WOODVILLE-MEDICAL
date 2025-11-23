// Main Script

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements (will be initialized in initializeCart)
let cartSidebar;
let cartOverlay;
let cartItemsContainer;
let cartTotalEl;
let cartCountEl;
let closeCartBtn;

// Product Modal Elements
let productModal;
let productModalOverlay;
let closeModalBtn;
let modalImage;
let modalName;
let modalRating;
let modalPrice;
let modalDescription;
let modalQuantityInput;
let modalAddToCartBtn;
let currentModalProduct = null;

// Checkout Elements
let checkoutOrderList;
let checkoutSubtotal;
let checkoutTotal;
let checkoutForm;
let cartPageItemsContainer;
let cartPageSubtotalEl;
let cartPageTotalEl;
let cartPageCountEl;

// Product Catalog used across shop and product detail pages
const productCatalog = [
    {
        id: '1',
        name: 'N95 Face Mask',
        price: 18.00,
        oldPrice: 25.00,
        category: 'masks',
        rating: 4.5,
        reviews: 128,
        sku: 'MED-001',
        image: 'assets/images/product_mask.png',
        images: [
            'assets/images/product_mask.png',
            'assets/images/product 1.jpg',
            'assets/images/product 2.jpg'
        ],
        description: 'Premium N95 respirator that offers superior protection with adjustable nose clip and soft ear loops for long wear comfort.'
    },
    {
        id: '2',
        name: 'Hand Sanitizer (500ml)',
        price: 12.00,
        oldPrice: 16.00,
        category: 'sanitizers',
        rating: 4.0,
        reviews: 96,
        sku: 'MED-002',
        image: 'assets/images/product_sanitizer.png',
        images: [
            'assets/images/product_sanitizer.png',
            'assets/images/product 3.jpeg',
            'assets/images/product_sanitizer.png'
        ],
        description: 'Professional-grade sanitizer with 70% alcohol and skin-friendly moisturizers to keep hands protected and hydrated.'
    },
    {
        id: '3',
        name: 'Surgical Mask (Pack of 50)',
        price: 35.00,
        category: 'masks',
        rating: 5.0,
        reviews: 180,
        sku: 'MED-003',
        image: 'assets/images/product_mask.png',
        images: [
            'assets/images/product_mask.png',
            'assets/images/product 2.jpg',
            'assets/images/product 1.jpg'
        ],
        description: 'Disposable three-layer surgical masks with melt-blown filter core and comfortable elastic bands for everyday use.'
    },
    {
        id: '4',
        name: 'Disinfectant Spray',
        price: 10.00,
        oldPrice: 15.00,
        category: 'sanitizers',
        rating: 3.5,
        reviews: 64,
        sku: 'MED-004',
        image: 'assets/images/product_sanitizer.png',
        images: [
            'assets/images/product_sanitizer.png',
            'assets/images/product 3.jpeg',
            'assets/images/product_sanitizer.png'
        ],
        description: 'Multi-surface disinfectant spray that kills 99.9% of viruses and bacteria while leaving a light, fresh fragrance.'
    },
    {
        id: '5',
        name: 'Digital Thermometer',
        price: 25.00,
        category: 'equipment',
        rating: 4.6,
        reviews: 88,
        sku: 'MED-005',
        image: 'assets/images/product 1.jpg',
        images: [
            'assets/images/product 1.jpg',
            'assets/images/product 2.jpg',
            'assets/images/product 3.jpeg'
        ],
        description: 'Fast and accurate digital thermometer with flexible tip and fever alert tones for home or clinical settings.'
    },
    {
        id: '6',
        name: 'Pulse Oximeter',
        price: 45.00,
        category: 'equipment',
        rating: 4.8,
        reviews: 102,
        sku: 'MED-006',
        image: 'assets/images/product 2.jpg',
        images: [
            'assets/images/product 2.jpg',
            'assets/images/product 1.jpg',
            'assets/images/product 3.jpeg'
        ],
        description: 'Compact pulse oximeter with bright OLED screen, showing SpO2 and heart rate in seconds.'
    },
    {
        id: '7',
        name: 'KN95 Face Mask (Pack of 20)',
        price: 22.00,
        category: 'masks',
        rating: 4.3,
        reviews: 75,
        sku: 'MED-007',
        image: 'assets/images/product_mask.png',
        images: [
            'assets/images/product_mask.png',
            'assets/images/product 1.jpg',
            'assets/images/product 2.jpg'
        ],
        description: 'Certified KN95 respirators with five protective layers and adjustable ear straps for a secure seal.'
    },
    {
        id: '8',
        name: 'Alcohol Wipes (100 Pack)',
        price: 8.00,
        category: 'sanitizers',
        rating: 4.0,
        reviews: 58,
        sku: 'MED-008',
        image: 'assets/images/product_sanitizer.png',
        images: [
            'assets/images/product_sanitizer.png',
            'assets/images/product 3.jpeg',
            'assets/images/product_sanitizer.png'
        ],
        description: 'Pre-moistened alcohol wipes ideal for quick surface cleaning and sanitizing medical equipment.'
    },
    {
        id: '9',
        name: 'Blood Pressure Monitor',
        price: 55.00,
        category: 'equipment',
        rating: 4.7,
        reviews: 142,
        sku: 'MED-009',
        image: 'assets/images/product 3.jpeg',
        images: [
            'assets/images/product 3.jpeg',
            'assets/images/product 2.jpg',
            'assets/images/product 1.jpg'
        ],
        description: 'Automatic upper-arm blood pressure monitor with large display and memory for 60 readings.'
    },
    {
        id: '10',
        name: 'Disposable Gloves (Box of 100)',
        price: 15.00,
        category: 'equipment',
        rating: 4.2,
        reviews: 84,
        sku: 'MED-010',
        image: 'assets/images/product 1.jpg',
        images: [
            'assets/images/product 1.jpg',
            'assets/images/product 2.jpg',
            'assets/images/product_mask.png'
        ],
        description: 'Latex-free disposable gloves offering tactile sensitivity and reliable grip for medical procedures.'
    },
    {
        id: '11',
        name: 'Face Shield',
        price: 12.00,
        category: 'masks',
        rating: 4.0,
        reviews: 61,
        sku: 'MED-011',
        image: 'assets/images/product_mask.png',
        images: [
            'assets/images/product_mask.png',
            'assets/images/product 1.jpg',
            'assets/images/product 2.jpg'
        ],
        description: 'Reusable face shield with anti-fog coating, providing full-face protection for clinical environments.'
    },
    {
        id: '12',
        name: 'First Aid Kit',
        price: 30.00,
        category: 'equipment',
        rating: 4.6,
        reviews: 110,
        sku: 'MED-012',
        image: 'assets/images/product_sanitizer.png',
        images: [
            'assets/images/product_sanitizer.png',
            'assets/images/product 1.jpg',
            'assets/images/product 2.jpg'
        ],
        description: 'Comprehensive first aid kit with organized compartments for trauma pads, bandages, and essential tools.'
    }
];

// Initialize Cart Function (called by components.js after loading components)
window.initializeCart = function () {
    console.log('Initializing Cart, Modals and Checkout...');

    // Select Cart Elements
    cartSidebar = document.querySelector('.cart-sidebar');
    cartOverlay = document.querySelector('.cart-sidebar-overlay');
    cartItemsContainer = document.querySelector('.cart-items');
    cartTotalEl = document.querySelector('.total-amount');
    cartCountEl = document.querySelector('.cart-action .badge');
    closeCartBtn = document.querySelector('.close-cart');
    const cartIcon = document.querySelector('.cart-action');

    // Select Product Modal Elements
    productModal = document.querySelector('.product-modal');
    productModalOverlay = document.querySelector('.product-modal-overlay');
    closeModalBtn = document.querySelector('.close-modal');
    modalImage = document.querySelector('.modal-image img');
    modalName = document.querySelector('.modal-product-name');
    modalRating = document.querySelector('.modal-rating');
    modalPrice = document.querySelector('.modal-new-price');
    modalDescription = document.querySelector('.modal-description');
    modalQuantityInput = document.querySelector('.modal-actions .quantity-input');
    modalAddToCartBtn = document.querySelector('.btn-add-to-cart');

    // Select Checkout Elements
    checkoutOrderList = document.getElementById('checkout-order-list');
    checkoutSubtotal = document.getElementById('checkout-subtotal');
    checkoutTotal = document.getElementById('checkout-total');
    checkoutForm = document.getElementById('checkout-form');
    const btnCheckout = document.querySelector('.btn-checkout');
    cartPageItemsContainer = document.getElementById('cart-page-items');
    cartPageSubtotalEl = document.getElementById('cart-page-subtotal');
    cartPageTotalEl = document.getElementById('cart-page-total');
    cartPageCountEl = document.getElementById('cart-page-count');

    // Update UI
    updateCartUI();
    renderCartSidebar();
    renderCheckoutSummary();
    renderCartPage();

    // Cart Event Listeners
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openCartSidebar();
        });
    }

    if (btnCheckout) {
        btnCheckout.addEventListener('click', (e) => {
            if (cart.length === 0) {
                e.preventDefault();
                showToast('Your cart is empty!', 'info');
            }
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCartSidebar);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }

    // Product Modal Event Listeners
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeProductModal);
    }

    if (productModalOverlay) {
        productModalOverlay.addEventListener('click', closeProductModal);
    }

    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', () => {
            if (currentModalProduct) {
                const quantity = parseInt(modalQuantityInput.value) || 1;
                addToCartFromModal(currentModalProduct, quantity);
                closeProductModal();
            }
        });
    }

    // Modal Quantity Controls
    const modalMinusBtn = document.querySelector('.modal-actions .minus-btn');
    const modalPlusBtn = document.querySelector('.modal-actions .plus-btn');

    if (modalMinusBtn) {
        modalMinusBtn.addEventListener('click', () => {
            let val = parseInt(modalQuantityInput.value) || 1;
            if (val > 1) modalQuantityInput.value = val - 1;
        });
    }

    if (modalPlusBtn) {
        modalPlusBtn.addEventListener('click', () => {
            let val = parseInt(modalQuantityInput.value) || 1;
            modalQuantityInput.value = val + 1;
        });
    }

    // Checkout Form Listener
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleCheckoutSubmission();
        });
    }

    // Cart Item Actions (Delegation)
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const cartItem = target.closest('.cart-item');

            if (!cartItem) return;

            const id = cartItem.dataset.id;

            // Remove Item
            if (target.closest('.remove-item')) {
                removeFromCart(id);
            }

            // Increase Quantity
            if (target.closest('.plus-btn')) {
                updateQuantity(id, 1);
            }

            // Decrease Quantity
            if (target.closest('.minus-btn')) {
                updateQuantity(id, -1);
            }
        });

        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const id = e.target.closest('.cart-item').dataset.id;
                const newQty = parseInt(e.target.value);
                if (newQty > 0) {
                    setQuantity(id, newQty);
                } else {
                    e.target.value = 1; // Reset to 1 if invalid
                    setQuantity(id, 1);
                }
            }
        });
    }

    if (cartPageItemsContainer) {
        cartPageItemsContainer.addEventListener('click', (e) => {
            const target = e.target;
            const cartItem = target.closest('.cart-page-item');
            if (!cartItem) return;
            const id = cartItem.dataset.id;

            if (target.closest('.remove-item')) {
                removeFromCart(id);
            }

            if (target.closest('.plus-btn')) {
                updateQuantity(id, 1);
            }

            if (target.closest('.minus-btn')) {
                updateQuantity(id, -1);
            }
        });

        cartPageItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const row = e.target.closest('.cart-page-item');
                const id = row ? row.dataset.id : null;
                const newQty = parseInt(e.target.value);
                if (id) {
                    if (newQty > 0) {
                        setQuantity(id, newQty);
                    } else {
                        e.target.value = 1;
                        setQuantity(id, 1);
                    }
                }
            }
        });
    }
};

// Function definitions (must be before DOMContentLoaded to be available to event handlers)
function navigateToProductDetails(productId) {
    console.log('navigateToProductDetails called with ID:', productId);
    if (!productId) {
        console.error('No product ID provided');
        return;
    }
    
    // Fix path resolution based on current location
    let url;
    if (window.location.pathname.includes('/assets/pages/')) {
        // Already in assets/pages directory (e.g., shop.html)
        url = `product-details.html?id=${productId}`;
    } else {
        // In root directory (e.g., index.html)
        url = `assets/pages/product-details.html?id=${productId}`;
    }
    
    console.log('Navigating to:', url);
    window.location.href = url;
}

function addToCart(card) {
    const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: parseFloat(card.dataset.price),
        image: card.querySelector('img').src,
        quantity: 1
    };

    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
        showToast(`${product.name} quantity updated!`);
    } else {
        cart.push(product);
        showToast(`${product.name} added to cart!`);
    }

    saveCart();
    updateCartUI();
    renderCartSidebar();
    renderCheckoutSummary();
    renderCartPage();
    openCartSidebar();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Medical Equipment Website Loaded');

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'slide',
            once: true
        });
    }

    // Event Listeners for Products (Delegation)
    document.body.addEventListener('click', (e) => {
        const btnCart = e.target.closest('.btn-cart');
        const btnView = e.target.closest('.btn-view');
        const productCard = e.target.closest('.product-card');

        if (btnCart) {
            e.preventDefault();
            e.stopPropagation();
            const card = btnCart.closest('.product-card');
            addToCart(card);
            return;
        }

        if (btnView) {
            e.preventDefault();
            e.stopPropagation();
            const card = btnView.closest('.product-card');
            console.log('Eye icon clicked, opening product modal');
            if (card) {
                openProductModal(card);
            }
            return;
        }

        // Navigate to product details when clicking on product card (but not on action buttons)
        if (productCard) {
            const isActionButton = e.target.closest('.product-actions');
            if (!isActionButton) {
                e.preventDefault();
                e.stopPropagation();
                const productId = productCard.dataset.id;
                console.log('Product card clicked, product ID:', productId);
                if (productId) {
                    navigateToProductDetails(productId);
                }
            }
        }
    });

    // Initialize Product Details Page
    if (window.location.pathname.includes('product-details.html')) {
        initializeProductDetails();
    }

    // Initialize Search
    initializeSearch();

    // Initialize Shop Page
    if (window.location.pathname.includes('shop.html')) {
        initializeShopPage();
        // Apply search from URL if present
        applySearchFromURL();
    }

    // Product Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Remove active class from all buttons and panels
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    });
});

// Additional utility functions
function addToCartFromModal(product, quantity) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
        showToast(`${product.name} quantity updated!`);
    } else {
        product.quantity = quantity;
        cart.push(product);
        showToast(`${product.name} added to cart!`);
    }

    saveCart();
    updateCartUI();
    renderCartSidebar();
    renderCheckoutSummary();
    renderCartPage();
    openCartSidebar();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
    renderCartSidebar();
    renderCheckoutSummary(); // Update checkout summary if on checkout page
    renderCartPage();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            updateCartUI();
            renderCartSidebar();
            renderCheckoutSummary(); // Update checkout summary if on checkout page
            renderCartPage();
        }
    }
}

function setQuantity(id, qty) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = qty;
        saveCart();
        updateCartUI();
        renderCartSidebar();
        renderCheckoutSummary(); // Update checkout summary if on checkout page
        renderCartPage();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (!cartCountEl) cartCountEl = document.querySelector('.cart-action .badge');

    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }

    const sidebarCount = document.querySelector('.cart-header .cart-count');
    if (sidebarCount) {
        sidebarCount.textContent = `(${totalItems})`;
    }
}

function openCartSidebar() {
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartSidebar() {
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openProductModal(card) {
    if (!productModal || !productModalOverlay) return;

    // Extract Data
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    const imageSrc = card.querySelector('img').src;
    const ratingHtml = card.querySelector('.rating').innerHTML;

    // Get product details from catalog
    const productData = productCatalog.find(p => p.id === id);
    const description = productData ? productData.description : 'High-quality medical equipment for professional use.';

    // Store current product data
    currentModalProduct = {
        id,
        name,
        price,
        image: imageSrc
    };

    // Populate Modal
    modalImage.src = imageSrc;
    modalName.textContent = name;
    modalPrice.textContent = `$${price.toFixed(2)}`;
    modalRating.innerHTML = ratingHtml;
    modalQuantityInput.value = 1;
    
    // Set description if modal has description element
    if (modalDescription) {
        modalDescription.textContent = description;
    }

    // Show Modal
    productModal.classList.add('active');
    productModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    if (productModal && productModalOverlay) {
        productModal.classList.remove('active');
        productModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function renderCartSidebar() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="closeCartSidebar()">Start Shopping</button>
            </div>
        `;
        if (cartTotalEl) cartTotalEl.textContent = '$0.00';
        return;
    }

    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus-btn"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                            <button class="quantity-btn plus-btn"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <button class="remove-item"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

function renderCartPage() {
    if (!cartPageItemsContainer) return;

    const basePath = window.location.pathname.includes('/assets/pages/') ? '' : 'assets/pages/';

    if (cart.length === 0) {
        cartPageItemsContainer.innerHTML = `
            <div class="cart-page-empty">
                <i class="fa-solid fa-cart-arrow-down"></i>
                <p>Your cart is currently empty.</p>
                <a href="${basePath}shop.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartPageSubtotalEl) cartPageSubtotalEl.textContent = '$0.00';
        if (cartPageTotalEl) cartPageTotalEl.textContent = '$0.00';
        if (cartPageCountEl) cartPageCountEl.textContent = '0';
        return;
    }

    let subtotal = 0;
    cartPageItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        return `
            <div class="cart-page-item" data-id="${item.id}">
                <div class="cart-page-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
                <div class="cart-page-price">$${item.price.toFixed(2)}</div>
                <div class="cart-page-quantity">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus-btn"><i class="fa-solid fa-minus"></i></button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn plus-btn"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="cart-page-subtotal">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    if (cartPageSubtotalEl) cartPageSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartPageTotalEl) cartPageTotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartPageCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartPageCountEl.textContent = totalItems;
    }
}

function renderCheckoutSummary() {
    if (!checkoutOrderList) return;

    if (cart.length === 0) {
        checkoutOrderList.innerHTML = '<p>Your cart is empty.</p>';
        if (checkoutSubtotal) checkoutSubtotal.textContent = '$0.00';
        if (checkoutTotal) checkoutTotal.textContent = '$0.00';
        return;
    }

    let total = 0;
    checkoutOrderList.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
            <div class="order-product-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');

    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${total.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function handleCheckoutSubmission() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'info');
        return;
    }

    // Simulate processing
    const btn = document.querySelector('.btn-place-order');
    const originalText = btn.textContent;
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
        showToast('Order placed successfully!');
        cart = [];
        saveCart();
        updateCartUI();
        renderCartSidebar();
        renderCheckoutSummary();
        renderCartPage();

        btn.textContent = originalText;
        btn.disabled = false;

        // Reset form
        if (checkoutForm) checkoutForm.reset();

        // Redirect to home after delay
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 2000);
    }, 1500);
}

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Product Details Page Functions
function initializeProductDetails() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        console.error('No product ID provided');
        return;
    }

    const product = productCatalog.find(item => item.id === productId);

    if (!product) {
        console.error('Product not found');
        return;
    }

    let resolvedImage = resolveAssetPath(product.image);
    const productImageEl = document.getElementById('product-detail-image');

    // Populate product details
    document.getElementById('product-page-title').textContent = product.name;
    document.getElementById('product-breadcrumb').textContent = product.name;
    productImageEl.src = resolvedImage;
    productImageEl.alt = product.name;
    document.getElementById('product-detail-name').textContent = product.name;
    document.getElementById('product-detail-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-detail-description').textContent = product.description;
    document.getElementById('product-sku').textContent = product.sku;

    // Update rating
    const ratingContainer = document.getElementById('product-detail-rating');
    const stars = generateStarRating(product.rating);
    const reviewCount = product.reviews || 0;
    ratingContainer.innerHTML = `${stars}<span class="rating-count">(${reviewCount} reviews)</span>`;

    // Load product images
    const galleryImages = (product.images && product.images.length > 0)
        ? product.images
        : [product.image];
    if (galleryImages.length > 0) {
        resolvedImage = resolveAssetPath(galleryImages[0]);
        productImageEl.src = resolvedImage;
    }
    loadProductImages(galleryImages);
    const cartImage = new URL(resolvedImage, window.location.href).href;

    // Initialize review form
    initializeReviewForm();

    // Handle quantity controls
    const minusBtn = document.querySelector('.product-actions-section .minus-btn');
    const plusBtn = document.querySelector('.product-actions-section .plus-btn');
    const quantityInput = document.getElementById('detail-quantity');

    if (minusBtn) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(quantityInput.value) || 1;
            if (val > 1) quantityInput.value = val - 1;
        });
    }

    if (plusBtn) {
        plusBtn.addEventListener('click', () => {
            let val = parseInt(quantityInput.value) || 1;
            quantityInput.value = val + 1;
        });
    }

    // Handle Add to Cart
    const addToCartBtn = document.querySelector('.btn-add-to-cart-detail');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const productData = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: cartImage,
                quantity: quantity
            };
            addToCartFromProductDetails(productData);
        });
    }

    // Handle Buy Now
    const buyNowBtn = document.querySelector('.btn-buy-now-detail');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value) || 1;
            const productData = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: cartImage,
                quantity: quantity
            };

            const existingItem = cart.find(item => item.id === productData.id);
            if (existingItem) {
                existingItem.quantity += productData.quantity;
            } else {
                cart.push(productData);
            }
            saveCart();
            updateCartUI();
            renderCartSidebar();
            renderCheckoutSummary();
            renderCartPage();

            const basePath = window.location.pathname.includes('/assets/pages/') ? '' : 'assets/pages/';
            window.location.href = `${basePath}checkout.html`;
        });
    }

    // Load related products
    loadRelatedProducts(product);
}

function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fa-solid fa-star"></i>';
    }

    if (hasHalfStar) {
        stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="fa-regular fa-star"></i>';
    }

    return stars;
}

function resolveAssetPath(path = '') {
    if (!path ||
        path.startsWith('http') ||
        path.startsWith('data:') ||
        path.startsWith('/') ||
        path.startsWith('../')) {
        return path;
    }

    const needsParentPrefix = window.location.pathname.includes('/assets/pages/');
    return needsParentPrefix ? `../../${path}` : path;
}

function addToCartFromProductDetails(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += product.quantity;
        showToast(`${product.name} quantity updated!`);
    } else {
        cart.push(product);
        showToast(`${product.name} added to cart!`);
    }

    saveCart();
    updateCartUI();
    renderCartSidebar();
    renderCheckoutSummary();
    renderCartPage();
    openCartSidebar();
}

function loadRelatedProducts(currentProduct) {
    const relatedProductsGrid = document.getElementById('related-products-grid');
    if (!relatedProductsGrid) return;

    const relatedProducts = productCatalog
        .filter(p => {
            if (!currentProduct) return true;
            if (p.id === currentProduct.id) return false;
            if (!currentProduct.category) return true;
            return p.category === currentProduct.category;
        })
        .slice(0, 3);

    relatedProductsGrid.innerHTML = relatedProducts.map(product => `
        <div class="product-card" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
            <div class="product-image">
                <img src="${resolveAssetPath(product.image)}" alt="${product.name}">
                <div class="product-actions">
                    <a href="#" class="btn-cart"><i class="fa-solid fa-cart-shopping"></i></a>
                    <a href="#" class="btn-view"><i class="fa-regular fa-eye"></i></a>
                </div>
            </div>
            <div class="product-info">
                <h4><a href="#">${product.name}</a></h4>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                </div>
                <div class="price">
                    <span class="new-price">$${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Image Gallery Functions
function loadProductImages(images) {
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    const mainImage = document.getElementById('product-detail-image');

    if (!thumbnailsContainer || !images || images.length === 0) return;

    const resolvedImages = images.map(img => resolveAssetPath(img));

    if (mainImage && resolvedImages[0]) {
        mainImage.src = resolvedImages[0];
    }

    thumbnailsContainer.innerHTML = resolvedImages.map((img, index) => `
        <div class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
            <img src="${img}" alt="Product Image ${index + 1}">
        </div>
    `).join('');

    // Add click handlers to thumbnails
    thumbnailsContainer.querySelectorAll('.product-thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function () {
            const imageSrc = this.dataset.image;
            mainImage.src = imageSrc;

            // Update active state
            thumbnailsContainer.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Review Form Functions
function initializeReviewForm() {
    const reviewForm = document.getElementById('review-form');
    const starInputs = document.querySelectorAll('.star-rating-input i');
    const ratingInput = document.getElementById('review-rating');
    let selectedRating = 0;

    // Star rating interaction
    starInputs.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = parseInt(this.dataset.rating);
            ratingInput.value = selectedRating;

            // Update star display
            starInputs.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.remove('fa-regular');
                    s.classList.add('fa-solid', 'active');
                } else {
                    s.classList.remove('fa-solid', 'active');
                    s.classList.add('fa-regular');
                }
            });
        });

        // Hover effect
        star.addEventListener('mouseenter', function () {
            const hoverRating = parseInt(this.dataset.rating);
            starInputs.forEach((s, index) => {
                if (index < hoverRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    // Reset on mouse leave
    const starContainer = document.querySelector('.star-rating-input');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', function () {
            starInputs.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    }

    // Form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!ratingInput.value) {
                showToast('Please select a rating!', 'info');
                return;
            }

            const formData = {
                name: document.getElementById('review-name').value,
                email: document.getElementById('review-email').value,
                rating: ratingInput.value,
                review: document.getElementById('review-text').value
            };

            // Simulate review submission
            showToast('Thank you for your review! It will be published after moderation.');

            // Reset form
            reviewForm.reset();
            selectedRating = 0;
            starInputs.forEach(s => {
                s.classList.remove('fa-solid', 'active');
                s.classList.add('fa-regular');
            });

            // In a real app, you would send this to a server
            console.log('Review submitted:', formData);
        });
    }
}

// Shop Page Functions
let allShopProducts = [];
let filteredProducts = [];

function initializeShopPage() {
    // Use shared product catalog so shop and detail pages stay in sync
    allShopProducts = productCatalog.map(product => ({ ...product }));

    filteredProducts = [...allShopProducts];
    renderShopProducts(filteredProducts);
    updateResultsCount();

    // Category filter
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const category = link.dataset.category;
            filterProducts({ category });
        });
    });

    // Price range filter
    const priceRange = document.getElementById('price-range');
    const maxPriceDisplay = document.getElementById('max-price');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            const maxPrice = parseInt(e.target.value);
            maxPriceDisplay.textContent = `$${maxPrice}`;
            filterProducts({ maxPrice });
        });
    }

    // Rating filter
    const ratingCheckboxes = document.querySelectorAll('.rating-filter input[type="checkbox"]');
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const selectedRatings = Array.from(ratingCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => parseInt(cb.value));
            filterProducts({ ratings: selectedRatings });
        });
    });

    // Sort by
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }

    // Reset filters
    const resetBtn = document.querySelector('.btn-reset-filters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset category
            categoryLinks.forEach(l => l.classList.remove('active'));
            categoryLinks[0].classList.add('active');

            // Reset price
            if (priceRange) {
                priceRange.value = 100;
                maxPriceDisplay.textContent = '$100';
            }

            // Reset ratings
            ratingCheckboxes.forEach(cb => cb.checked = false);

            // Reset sort
            if (sortSelect) sortSelect.value = 'default';

            filteredProducts = [...allShopProducts];
            renderShopProducts(filteredProducts);
            updateResultsCount();
        });
    }
}

function filterProducts(filters = {}) {
    let products = [...allShopProducts];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
        products = products.filter(p => p.category === filters.category);
    }

    // Filter by price
    if (filters.maxPrice !== undefined) {
        products = products.filter(p => p.price <= filters.maxPrice);
    }

    // Filter by rating
    if (filters.ratings && filters.ratings.length > 0) {
        const minRating = Math.min(...filters.ratings);
        products = products.filter(p => p.rating >= minRating);
    }

    filteredProducts = products;
    renderShopProducts(filteredProducts);
    updateResultsCount();
}

function sortProducts(sortBy) {
    let products = [...filteredProducts];

    switch (sortBy) {
        case 'price-low':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            products.sort((a, b) => b.rating - a.rating);
            break;
        default:
            products = [...filteredProducts];
    }

    renderShopProducts(products);
}

function renderShopProducts(products) {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products"><p>No products found matching your criteria.</p></div>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
            <div class="product-image">
                <img src="${resolveAssetPath(product.image)}" alt="${product.name}">
                <div class="product-actions">
                    <a href="#" class="btn-cart"><i class="fa-solid fa-cart-shopping"></i></a>
                    <a href="#" class="btn-view"><i class="fa-regular fa-eye"></i></a>
                </div>
            </div>
            <div class="product-info">
                <h4><a href="#">${product.name}</a></h4>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                </div>
                <div class="price">
                    <span class="new-price">$${product.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function updateResultsCount() {
    const showingCount = document.getElementById('showing-count');
    const totalCount = document.getElementById('total-count');

    if (showingCount) showingCount.textContent = filteredProducts.length;
    if (totalCount) totalCount.textContent = allShopProducts.length;
}

// Search Functionality
function initializeSearch() {
    const searchForm = document.getElementById('search-form');

    if (searchForm) {
        if (searchForm.dataset.initialized === 'true') return;
        searchForm.dataset.initialized = 'true';

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const searchInput = document.getElementById('search-input');
            const searchCategory = document.getElementById('search-category');

            const query = searchInput ? searchInput.value.trim() : '';
            const category = searchCategory ? searchCategory.value : 'all';


            if (query || category !== 'all') {
                // Redirect to shop page with search parameters
                const basePath = window.location.pathname.includes('/assets/pages/') ? '' : 'assets/pages/';
                let url = `${basePath}shop.html?`;

                if (query) url += `search=${encodeURIComponent(query)}`;
                if (category !== 'all') {
                    url += (query ? '&' : '') + `category=${category}`;
                }

                window.location.href = url;
            } else {
                // Just go to shop page
                const basePath = window.location.pathname.includes('/assets/pages/') ? '' : 'assets/pages/';
                window.location.href = `${basePath}shop.html`;
            }
        });
    }
}

// Apply search filters from URL parameters
function applySearchFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryFilter = urlParams.get('category');

    let products = [...allShopProducts];

    // Apply search query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        // Update search input to show the query
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = searchQuery;
    }

    // Apply category filter
    if (categoryFilter && categoryFilter !== 'all') {
        products = products.filter(p => p.category === categoryFilter);

        // Update category select
        const categorySelect = document.getElementById('search-category');
        if (categorySelect) categorySelect.value = categoryFilter;

        // Update sidebar category
        const categoryLinks = document.querySelectorAll('.category-list a');
        categoryLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.category === categoryFilter) {
                link.classList.add('active');
            }
        });
    }

    filteredProducts = products;
    renderShopProducts(filteredProducts);
    updateResultsCount();
}

// Animated Counter for Stats
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                // Add + or % suffix if needed
                if (counter.parentElement.querySelector('.stat-text').textContent.includes('Rate')) {
                    counter.textContent = target + '%';
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Newsletter Form Handler
function initializeNewsletter() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            // Show success message
            showToast('Thank you for subscribing! Check your email for confirmation.', 'success');
            
            // Reset form
            form.reset();
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code...
    
    // Add new initializations
    animateCounter();
    initializeNewsletter();
});
