<template>
  <div class="col">
    <div class="card">
        <img :src="product.image" class="card-img-top" alt="image">
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <button @click="addProductToCar" class="btn btn-danger btn-sm">Agregar al carro</button>
        </div>
    </div>
  </div>
</template>

<script>
import { addProduct } from '../services/car';
import Swal from 'sweetalert2';

export default {
    props: {
        product: {
            type: Object
        }
    },
    setup(props) {

        const addProductToCar = () => {
            addProduct(props.product);
        }

        return {
            addProductToCar,
        }

    },
}
</script>

<style>

</style>