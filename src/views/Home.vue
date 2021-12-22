<template>
  <div class="container-fluid">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <template v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </template>
    </div> 
  </div>
</template>

<script>
import { getProducts } from '../services/product';
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import Swal from 'sweetalert2';

export default {
  name: 'Home',
  components: {
    ProductCard,
   
  },
  setup() {

    let products = ref([]);

    const setProducts = async () => {

      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });

      Swal.showLoading();

      console.log('Inicio ejecución get')

      const resp = await getProducts();
      console.log(resp);
      if (!resp.ok) {
        console.log('Error al procesar la solicitud');
      } else {
        products.value = await resp.json();
        console.log(products);
      }

      Swal.close();

    }
    

    onMounted(() => {
      // llamado de la función
      setProducts();
    });

    return {
      products,
    }

  }

}
</script>

<style>

</style>
