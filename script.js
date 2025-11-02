document.addEventListener('DOMContentLoaded', () => {
    
    const searchBtn = document.getElementById('search-btn');
    const cartBtn = document.getElementById('cart-btn');

    searchBtn.addEventListener('click', () => {
        alert('Fitur Pencarian belum diimplementasikan. Harap jelajahi kategori.');
    });

    cartBtn.addEventListener('click', () => {
        alert('Keranjang belanja belum diimplementasikan. Tombol ini adalah placeholder.');
    });


    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product');
            
            alert(`"${productName}" berhasil ditambahkan ke keranjang (sementara)!`);
        });
    });
});
