<template>
  <div class="col">
    <div class="card">
        <img :src="product.image" class="card-img-top" alt="image">
        <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <button class="btn btn-danger btn-sm">Agregar al carro</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object
        }
    }
}
</script>

<style>

</style>