
async function addToCart(productId) {
    try {
        const response = await fetch(`/api/carts/:cid/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        alert('Producto agregado al carrito');
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        alert('Hubo un problema al agregar el producto al carrito.');
    }
}


function goToPage(pageNumber) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('page', pageNumber);
    window.location.href = currentUrl.toString();
}


async function removeFromCart(cartId, productId) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        alert('Producto eliminado del carrito');
        location.reload(); 
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error.message);
        alert('Hubo un problema al eliminar el producto del carrito.');
    }
}


async function updateProductQuantity(cartId, productId, quantity) {
    try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        alert('Cantidad actualizada correctamente');
        location.reload(); 
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error.message);
        alert('Hubo un problema al actualizar la cantidad del producto.');
    }
}
