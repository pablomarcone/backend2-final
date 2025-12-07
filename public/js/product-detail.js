function changeMainImage(newImageUrl) {
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = newImageUrl;
    }
    document.querySelectorAll('.thumbnail-img').forEach(img => {
        img.classList.remove('border-blue-500');
        img.classList.add('border-gray-300');
    });
    event.target.classList.remove('border-gray-300');
    event.target.classList.add('border-blue-500');
}

document.querySelector('#add-to-cart-btn').addEventListener('click', async function (event) {
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