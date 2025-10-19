document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartItemCount = 0; 

    function updateCartDisplay() {
        cartButton.textContent = `Keranjang (${cartItemCount}) 🛒`;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = button.getAttribute('data-product');

            cartItemCount++;

            updateCartDisplay();

            alert(`${productName} telah ditambahkan ke keranjang! Total: ${cartItemCount} item.`);
        });
    });

    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', function() {
        const searchTerm = prompt("Masukkan kata kunci pencarian (misal: 'kemeja', 'hoodie'):");
        if (searchTerm) {
            alert(`Mencari produk dengan kata kunci: "${searchTerm}".`);
        }
    });

    updateCartDisplay();
});
