const getProducts = () => {

    const url = 'http://casoaplicativo-php.test/api/product';

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        }
    });

}

export {
    getProducts,
}