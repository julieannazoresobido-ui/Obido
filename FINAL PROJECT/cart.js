// Product Data
const products = [
    {
        id: 1,
        product_image: "🍰",
        product_name: "Cake",
        product_currency: "Php",
        product_price: 125.00,
        is_available: true,
    },
    {
        id: 2,
        product_image:"🥐",
        product_name: "Croissant",
        product_currency: "Php",
        product_price: 150.00,
        is_available: false,
    },
    {
        id: 3,
        product_image:"🧁",
        product_name: "Cupcake",
        product_currency: "Php",
        product_price: 45.00,
        is_available: true,
    },
    {
        id: 4,
        product_image: "🍞",
        product_name: "Loaf Bread",
        product_currency: "Php",
        product_price: 60.00,
        is_available: true
    },
    {
     id: 5,
        product_image: "🥪",
        product_name: "Sandwitch",
        product_currency: "Php",
        product_price: 50.00,
        is_available: true,
    },
    {
        id: 6,
        product_image: "🍪",
        product_name: "Cookie",
        product_currency: "Php",
        product_price: 35.00,
        is_available: true,
    }
];

// Cart Array
let cart = [];

// DOM Elements
const productListEl = document.getElementById('product-list');
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const cartTotalEl = document.getElementById('cart-total');
const cartCountEl = document.getElementById('cart-count');
const clearCartBtn = document.getElementById('clear-cart');

// Render Products
function renderProducts() {
    productListEl.innerHTML = "";
    products.forEach(product => {
        const itemInCart = cart.find(item => item.id === product.id);
        const disabled = itemInCart ? "disabled" : "";
        const btnText = itemInCart ? "Already in Cart" : "Add to Cart";

        const card = document.createElement('div');
        card.className = "product-card";
        card.innerHTML = `
            <div style="font-size:50px;">${product.product_image}</div>
            <h3>${product.product_name}</h3>
            <p class="price">${product.product_price} ${product.product_currency}</p>
            <button onclick="addToCart(${product.id})" ${disabled}>${btnText}</button>
        `;
        productListEl.appendChild(card);
    });
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const itemInCart = cart.find(item => item.id === id);

    if (itemInCart) {
        alert("Item already in cart!");
        return;
    }

    cart.push({
        ...product,
        quantity: 1
    });

    updateCartUI();
    renderProducts();
}

// Update Cart UI
function updateCartUI() {
    cartItemsEl.innerHTML = "";
    
    if (cart.length === 0) {
        cartEmptyEl.style.display = "block";
        cartTotalEl.textContent = "0.00";
        cartCountEl.textContent = "0";
        return;
    }

    cartEmptyEl.style.display = "none";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const subtotal = item.product_price * item.quantity;
        total += subtotal;
        count += item.quantity;

        const el = document.createElement('div');
        el.className = "cart-item";
        el.innerHTML = `
            <div class="item-details">
                <strong>${item.product_name}</strong><br>
                ${item.product_price} x ${item.quantity} = ${subtotal} ${item.product_currency}
            </div>
            <div class="qty-controls">
                <button onclick="changeQty(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})" style="background:#e74c3c;">Remove</button>
            </div>
        `;
        cartItemsEl.appendChild(el);
    });

    cartTotalEl.textContent = total.toFixed(2);
    cartCountEl.textContent = count;
}

// Change Quantity
function changeQty(id, amount) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            updateCartUI();
        }
    }
}

// Remove Item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    renderProducts();
}

// Clear Cart
clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartUI();
    renderProducts();
});

// Initial Load
renderProducts();
updateCartUI();
