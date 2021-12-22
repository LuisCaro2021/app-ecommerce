<template>
<div class="container">
    <div class="card">
      <h5 class="card-header">Productos en el carro</h5>
      <div class="card-body">
          <input type="email" 
                  v-model="email" 
                  placeholder="Escriba su email" 
                  class="form-control" />
          <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Inventario</th>
                <th scope="col">Cantidad</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
                <template v-for="product in products" :key="product.id">
                <tr>
                  <td>
                    <img width="100" height="50" :src="product.image" />
                  </td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.inventory }}</td>
                  <td>
                    <input 
                        v-model="product.quantity"
                        @change="onChange($event, product)"
                        type="number" />
                  </td>
                  <td>
                    <button @click="removeProduct(product)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                  </td>
                </tr>
                </template>
            </tbody>
          </table>
          <div class="d-grid gap-2">
            <button @click="buy" class="btn btn-primary" type="button">Comprar</button>
          </div>
     </div>
    </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { clearProducts, deleteProduct, getProducts } from '../services/car';
import { createPedido } from '../services/pedido';
import Swal from 'sweetalert2';

export default {
    setup() {

        const products = ref([]);
        const email = ref('');

        onMounted(() => {
            products.value = getProducts();
        });

        const removeProduct = (product) => {
            deleteProduct(product);
            products.value = getProducts();
        }

        const buy = async () => {
            //console.log(products.value);
            //console.log(email.value);

            if (email.value === '') {
                Swal.fire(
                    'Información',
                    'Por favor escribir un email',
                    'info'
                );
                
            } else {

                for (const product of products.value) {
                    if (!product.quantity || product.quantity <= 0) {
                        Swal.fire(
                            'Información',
                            `Por favor escribir una cantidad para ${product.name}`,
                            'info'
                        );
                        return;
                    }
                }

                const pedido = {
                    email: email.value,
                    products: products.value,
                }

                //Swal.fire({
                //    allowOutsideClick: false,
                //    text: 'Cargando...'
                //});
//
                //Swal.showLoading();
                Swal.fire(
                    'Información',
                    'Pedido generado con éxito',
                    'success'
                );

                const resp = await createPedido(pedido);

                if (!resp.ok) {
                    console.log('Error al guardar');
                } else {
                    console.log('OK');
                    clearProducts();
                    products.value = [];
                    email.value = '';
                }

                //Swal.close();
            }

        }

        const onChange = (event, product) => {
            console.log(event.target.value, product);
            
        }

        return {
            products,
            removeProduct,
            buy,
            onChange,
            email,
    
        }


    }
        
}
</script>
