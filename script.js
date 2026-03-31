const products = [
    { id: 1, name: "Headphones", price: 50 },
    { id: 2, name: "Smart Watch", price: 120 },
    { id: 3, name: "Camera", price: 300 }
];

let cart = JSON.parse(localStorage.getItem('myCart')) || [];

function displayProducts() {
    const container = document.querySelector('.product-container');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateUI();
}

function updateUI() {
    const cartList = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    const countSpan = document.getElementById('cart-count');

    cartList.innerHTML = cart.map((item, index) => `
        <li>${item.name} - $${item.price} <button onclick="removeItem(${index})">x</button></li>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.innerText = total;
    countSpan.innerText = cart.length;
    
    localStorage.setItem('myCart', JSON.stringify(cart));
}

function removeItem(index) {
    cart.splice(index, 1);
    updateUI();
}

function clearCart() {
    cart = [];
    updateUI();
}

displayProducts();
updateUI();
