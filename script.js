document.addEventListener('DOMContentLoaded', () => {
    
    let cart = JSON.parse(localStorage.getItem('casualKeceCart')) || [];
    const cartBtn = document.getElementById('cart-btn');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    const modal = document.getElementById("cartModal");
    const closeBtn = document.getElementsByClassName("close-button")[0];
    const modalCartDisplay = document.getElementById('modal-cart-display');
    const modalCartSummary = document.getElementById('modal-cart-summary');

    function updateCartDisplay() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartBtn) {
            cartBtn.textContent = `Keranjang (${totalItems}) 🛒`;
        }
        localStorage.setItem('casualKeceCart', JSON.stringify(cart));
    }

    function addToCart(productName, productPrice) {
        const existingItemIndex = cart.findIndex(item => item.name === productName);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 }); 
        }
        
        updateCartDisplay();
        alert(`${productName} (Rp ${productPrice.toLocaleString('id-ID')}) berhasil ditambahkan ke keranjang!`);
    }

    function renderCartModal() {
        if (!modalCartDisplay || !modalCartSummary) return;

        if (cart.length === 0) {
            modalCartDisplay.innerHTML = '<p style="text-align: center; font-size: 1.1rem; color: #555;">Keranjang Anda kosong. Yuk, <a href="index.html" style="color: #d9534f; font-weight: bold;">mulai belanja</a>!</p>';
            modalCartSummary.innerHTML = '';
            return;
        }

        let html = '<div class="cart-header"><span class="item-name">Produk</span><span class="item-quantity">Jumlah</span><span class="item-price">Harga Satuan</span><span class="item-subtotal">Subtotal</span></div>';
        let totalPrice = 0; 

        cart.forEach(item => {
            const itemPrice = item.price; 
            const subtotal = itemPrice * item.quantity;
            totalPrice += subtotal;

            html += `
                <div class="cart-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">${item.quantity} pcs</span>
                    <span class="item-price">Rp ${itemPrice.toLocaleString('id-ID')}</span>
                    <span class="item-subtotal">Rp ${subtotal.toLocaleString('id-ID')}</span>
                </div>
            `;
        });

        modalCartDisplay.innerHTML = html;

        modalCartSummary.innerHTML = `
            <div class="total-price">
                Total Belanja: <span>Rp ${totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <button class="checkout-button"
            onclick="alert('Simulasi Pembayaran: Total Rp ${totalPrice.toLocaleString('id-ID')}. Silakan hubungi admin untuk melanjutkan!')">
                LANJUT KE PEMBAYARAN
            </button>
        `;
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productName = event.target.getAttribute('data-product') || 
                                event.target.closest('.product-card').querySelector('h3').textContent;
            
            const productPrice = parseInt(event.target.getAttribute('data-price')); 
            
            if (!productPrice) {
                alert('Error: Harga produk tidak ditemukan di tombol HTML (data-price).');
                return;
            }

            addToCart(productName, productPrice);
        });
    });

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            renderCartModal();
            modal.style.display = "block";
        });
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
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

    updateCartDisplay();
});
