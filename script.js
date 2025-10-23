document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-btn');
    let cartCount = 0; // Total item di keranjang
    
    const updateCartDisplay = () => {
        cartButton.textContent = `Keranjang (${cartCount}) 🛒`;
    };

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.dataset.product;
            
            cartCount++;
            updateCartDisplay();
            
            alert(`${productName} telah ditambahkan ke keranjang!`);
        });
    });

    updateCartDisplay();

    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', () => {
        alert("Fungsi Pencarian (Search) sedang dalam pengembangan.");
    });
});
