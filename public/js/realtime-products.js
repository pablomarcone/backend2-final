const productList = document.querySelector('#product-list');
const productForm = document.querySelector('#product-form');
const socket = io();

const createProductHTML = (product) => {
    return `
        <div class="product-item border border-gray-200 rounded-lg p-4 mb-4 hover:shadow-md transition-shadow" data-product-id="${product._id}">
            <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                    <img src="${product.thumbnail}" alt="${product.title}" class="w-16 h-16 object-cover rounded-md border">
                </div>    
                <div class="flex-grow">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-semibold text-gray-800">${product.title}</h3>
                            <p class="text-sm text-gray-600 mb-2 line-clamp-1">${product.description}</p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                <span><strong>Código:</strong> ${product.code}</span>
                                <span><strong>Precio:</strong> ${product.price}</span>
                                <span><strong>Stock:</strong> ${product.stock}</span>
                                <span><strong>Estado:</strong>
                                    ${product.status ? '<span class="px-2 py-1 rounded text-xs bg-green-100 text-green-800"> Activo </span>' :
            '<span class="px-2 py-1 rounded text-xs bg-red-100 text-red-800"> Inactivo </span>'}
                                </span>
                                <span><strong>Categoría:</strong> ${product.category}</span>
                                <span><strong>Id:</strong> ${product._id}</span>
                            </div>
                        </div>
                        <button
                            class="delete-btn bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            data-product-id="${product._id}"
                            data-product-title="${product.title}">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderProducts = (products) => {

    productList.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    const productsHTML = products.map(product => createProductHTML(product)).join('');
    tempDiv.innerHTML = productsHTML;

    while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
    }

    productList.appendChild(fragment);
};

const handleDeleteProduct = (event) => {
    if (event.target.classList.contains('delete-btn')) {

        const productId = event.target.getAttribute('data-product-id');
        const productTitle = event.target.getAttribute('data-product-title');

        const confirmed = confirm(`¿Estás seguro de que deseas eliminar el producto "${productTitle}"?`);

        if (confirmed) {
            socket.emit('deleteProduct', productId);
        }
    }
};

productList.addEventListener('click', handleDeleteProduct);

productForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(productForm);

    const newProduct = {
        title: formData.get('title').trim(),
        code: formData.get('code').trim(),
        description: formData.get('description').trim(),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        category: formData.get('category').trim(),
        status: formData.get('status') === 'true',
        thumbnails: []
    };

    const thumbnail1 = formData.get('thumbnail1')?.trim();
    const thumbnail2 = formData.get('thumbnail2')?.trim();
    const thumbnail3 = formData.get('thumbnail3')?.trim();

    if (thumbnail1) newProduct.thumbnails.push(thumbnail1);
    if (thumbnail2) newProduct.thumbnails.push(thumbnail2);
    if (thumbnail3) newProduct.thumbnails.push(thumbnail3);

    socket.emit('addProduct', newProduct);

    productForm.reset();
});

socket.on('getProducts', (products) => {
    renderProducts(products.payload.map(p => ({
        ...p,
        thumbnail: (p.thumbnails && p.thumbnails.length > 0) ? p.thumbnails[0] : '/img/no-imagen.png',
        description: p.description.replace(/<[^>]+>/g, '')
    })));
});