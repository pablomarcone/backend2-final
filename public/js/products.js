function updateCartDisplay() {
    const cartId = localStorage.getItem('cartId');
    const cartActive = document.getElementById('cart-active');
    const cartEmpty = document.getElementById('cart-empty');
    const cartIdDisplay = document.getElementById('cart-id-display');

    if (cartId) {
        cartActive.style.display = 'block';
        cartEmpty.style.display = 'none';
        cartIdDisplay.textContent = cartId;
    } else {
        cartActive.style.display = 'none';
        cartEmpty.style.display = 'block';
    }
}

document.querySelector('#clear-filters').addEventListener('click', function (event) {
    window.location.href = window.location.pathname;
});

document.querySelector('#view-cart-btn').addEventListener('click', function (event) {
    const cartId = localStorage.getItem('cartId');
    if (cartId) window.location.href = `/carts/${cartId}`;
});

document.querySelector('#reset-cart-btn').addEventListener('click', function (event) {
    Swal.fire({
        title: '¿Reiniciar carrito?',
        text: 'Se borrará el carrito actual',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cartId');
            updateCartDisplay();
            Swal.fire({
                title: 'Carrito reiniciado',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
});

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function (event) {
        if (!event.target.closest('.add-to-cart-btn')) {
            const productId = this.dataset.productId;
            window.location.href = `/products/${productId}`;
        }
    });
});

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', async function (event) {
        try {
            event.stopPropagation();
            const productId = this.dataset.productId;
            let cartId = localStorage.getItem('cartId');
            if (!cartId) {
                const response = await fetch('/views/carts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify([{ product: productId, quantity: 1 }])
                });
                if (!response.ok) throw new Error(`Error: ${response.message}`);
                const data = await response.json();
                cartId = data.cart._id;
                localStorage.setItem('cartId', cartId);
                updateCartDisplay();
            } else {
                const response = await fetch(`/views/carts/${cartId}/products/${productId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.status === 'error') throw new Error(`Error: ${data.message}`);
            }
            Swal.fire({
                title: '¡Producto agregado!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                title: 'Error al agregar el producto',
                text: error.message,
                icon: 'error',
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', updateCartDisplay);

window.addEventListener('pageshow', function(event) {updateCartDisplay()});