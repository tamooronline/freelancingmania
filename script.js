// Enhanced cart functionality using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.length;
    document.getElementById('cart-count').textContent = count;
}

function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    alert('Item added to cart!');
}

function deleteItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - PKR ${item.price} <button onclick="deleteItem(${index})">Delete</button>`;
        cartItems.appendChild(li);
        total += item.price;
    });
    cartTotal.textContent = total;
}

function viewCart() {
    renderCart();
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function proceedToPayment() {
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('payment-modal').style.display = 'block';
}

function closePayment() {
    document.getElementById('payment-modal').style.display = 'none';
}

function selectPayment(method) {
    alert(`Proceeding to payment with ${method}. Total: PKR ${document.getElementById('cart-total').textContent}`);
    // Here you would integrate with actual payment gateway
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closePayment();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);