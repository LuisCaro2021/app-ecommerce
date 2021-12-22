const getProducts = () => {
    
    let products = [];

    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));  
    }

    return products;

}
import Swal from 'sweetalert2';

const addProduct = (product) => {

    const products = getProducts();

    if (products.length === 0) {

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        
    } else {

        const productExists = products.find(p => p.id === product.id);

        if (!productExists) {
            products.push(product);
            localStorage.setItem('products', JSON.stringify(products));
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado a tu carrito',
                    showConfirmButton: false,
                    timer: 2000
                });
            
        } else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto ya se encuentra en tu carrito',
                showConfirmButton: false,
                timer: 2000
            });
            console.log('producto existe');
            
        }
        
    }

}

const deleteProduct = (product) => {

    let products = getProducts();

    products = products.filter(p => p.id !== product.id);

    localStorage.setItem('products', JSON.stringify(products));

}

const clearProducts = () => {
    localStorage.removeItem('products');
}

export {
    addProduct,
    getProducts,
    deleteProduct,
    clearProducts,
}