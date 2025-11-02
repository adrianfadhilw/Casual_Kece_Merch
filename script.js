document.addEventListener('DOMContentLoaded', () => {
    
    // ===================================
    // 1. FITUR KERANJANG (CART)
    // ===================================

    let cart = JSON.parse(localStorage.getItem('casualKeceCart')) || [];

    const cartBtn = document.getElementById('cart-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    function updateCartDisplay() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartBtn.textContent = `Keranjang (${totalItems}) 🛒`;
        localStorage.setItem('casualKeceCart', JSON.stringify(cart));
    }

    function addToCart(productName) {
        const existingItemIndex = cart.findIndex(item => item.name === productName);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name: productName, quantity: 1 });
        }
        
        updateCartDisplay();
        alert(`${productName} berhasil ditambahkan ke keranjang!`);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product') || 
                                event.target.closest('.product-card').querySelector('h3').textContent;
            addToCart(productName);
        });
    });

    cartBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang Anda kosong.');
            return;
        }

        let cartSummary = "Isi Keranjang:\n";

        cart.forEach(item => {
            cartSummary += `- ${item.name} (${item.quantity} pcs)\n`;
        });
        
        alert(cartSummary + "\n(Fungsi Checkout Lengkap memerlukan halaman checkout terpisah.)");
    });

    updateCartDisplay();


    // ===================================
    // 2. FITUR PENCARIAN (SEARCH)
    // ===================================
    
    const searchBtn = document.getElementById('search-btn');

    searchBtn.addEventListener('click', () => {
        const query = prompt("Masukkan kata kunci pencarian (misal: jaket, adidas, kaos):");
        
        if (query) {
            const normalizedQuery = query.toLowerCase().trim();
            
            let targetUrl = null;

            if (normalizedQuery.includes('sepatu') || normalizedQuery.includes('adidas') || normalizedQuery.includes('samba') || normalizedQuery.includes('nmd')) {
                targetUrl = 'sepatu.html';
            } else if (normalizedQuery.includes('jaket') || normalizedQuery.includes('parka') || normalizedQuery.includes('bomber') || normalizedQuery.includes('stone island') || normalizedQuery.includes('carhartt')) {
                targetUrl = 'jaket.html';
            } else if (normalizedQuery.includes('celana') || normalizedQuery.includes('jeans') || normalizedQuery.includes('chino')) {
                targetUrl = 'celana.html';
            } else if (normalizedQuery.includes('kaos') || normalizedQuery.includes('t-shirt') || normalizedQuery.includes('tee') || normalizedQuery.includes('trefoil')) {
                targetUrl = 'kaos.html';
            } else if (normalizedQuery.includes('topi') || normalizedQuery.includes('aksesori') || normalizedQuery.includes('cap')) {
                targetUrl = 'topi.html';
            } else {
                alert(`Maaf, kami tidak menemukan kategori untuk "${query}". Coba kata kunci lain.`);
                return;
            }

            if (targetUrl) {
                alert(`Mengarahkan ke kategori: ${targetUrl.replace('.html', '').toUpperCase()}...`);
                window.location.href = targetUrl;
            }
        }
    });

});
