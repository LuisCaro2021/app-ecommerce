const createPedido = (pedido) => {

    const url = 'http://ecommerce-php.test/api/pedido';

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(pedido),
    });

}

export {
    createPedido,
}