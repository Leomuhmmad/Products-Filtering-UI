const products = [
    { name: 'Sony Playstation 5', url: 'images/playstation_5.png', category: 'games', price: 499.99 },
    { name: 'Samsung Galaxy', url: 'images/samsung_galaxy.png', category: 'smartphones', price: 399.99 },
    { name: 'Cannon EOS Camera', url: 'images/cannon_eos_camera.png', category: 'cameras', price: 749.99 },
    { name: 'Sony A7 Camera', url: 'images/sony_a7_camera.png', category: 'cameras', price: 1999.99 },
    { name: 'LG TV', url: 'images/lg_tv.png', category: 'televisions', price: 799.99 },
    { name: 'Nintendo Switch', url: 'images/nintendo_switch.png', category: 'games', price: 299.99 },
    { name: 'Xbox Series X', url: 'images/xbox_series_x.png', category: 'games', price: 499.99 },
    { name: 'Samsung TV', url: 'images/samsung_tv.png', category: 'televisions', price: 1099.99 },
    { name: 'Google Pixel', url: 'images/google_pixel.png', category: 'smartphones', price: 499.99 },
    { name: 'Sony ZV1F Camera', url: 'images/sony_zv1f_camera.png', category: 'cameras', price: 799.99 },
    { name: 'Toshiba TV', url: 'images/toshiba_tv.png', category: 'televisions', price: 499.99 },
    { name: 'iPhone 14', url: 'images/iphone_14.png', category: 'smartphones', price: 999.99 },
];

const productsWrapper = document.getElementById('products-wrapper');
const cartCount = document.getElementById('cart-count');
const notificationContainer = document.createElement('div');
notificationContainer.className = 'notification-container';
document.body.appendChild(notificationContainer);

let cartItemCount = 0;

products.forEach((product) => {
    const productElement = createProductElement(product);
    productsWrapper.appendChild(productElement);
});

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'item space-y-2';
    productElement.innerHTML = `
      <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl">
        <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover"/>
        <button class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add To Cart</button>
      </div>
      <p class="text-xl">${product.name}</p>
      <strong>$${product.price.toLocaleString()}</strong>`;
    
    productElement.querySelector('.status').addEventListener('click', (e) => updateCart(e, product.name));
    return productElement;
}

function updateCart(e) {
    const statusEl = e.target;
    const addSound = new Audio('sounds/click_03.wav'); 
    const removeSound = new Audio('sounds/click_16.wav'); 

    if (statusEl.classList.contains('added')) {
        // Remove from cart
        statusEl.classList.remove('added');
        statusEl.innerText = 'Add To Cart';
        statusEl.classList.remove('bg-red-600');
        statusEl.classList.add('bg-gray-800');

        cartItemCount--;
        removeSound.play();  // Play remove sound
        showNotification("Item removed from cart");

    } else {
        // Add to cart
        statusEl.classList.add('added');
        statusEl.innerText = 'Remove From Cart';
        statusEl.classList.remove('bg-gray-800');
        statusEl.classList.add('bg-red-600');

        cartItemCount++;
        addSound.play();  // Play add sound
        showNotification("Item added to cart");
    }

    // Update cart count
    cartCount.innerText = cartItemCount.toString();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification bg-blue-500 text-white px-4 py-2 rounded shadow-lg fixed top-5 right-5';
    notification.innerText = message;
    
    document.body.appendChild(notification);
    playNotificationSound(); // Play notification sound

    setTimeout(() => notification.remove(), 3000);
}


function playNotificationSound() {
    const sound = new Audio('sounds/click_03.wav'); // Ensure this file exists
    sound.play().catch(error => console.error('Audio play failed:', error)); 
}
