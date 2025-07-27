<template>
  <div class="form-container">
    <h2>{{ prenda.id ? 'Editar Prenda' : 'Agregar Prenda' }}</h2>
    <form class="conteiner" @submit.prevent="guardarPrenda">
      <input v-model="prenda.nombre" placeholder="Nombre" required />
      <input v-model="prenda.talla" placeholder="Talla" />
      <input v-model="prenda.color" placeholder="Color" />
      <input v-model="prenda.precio" type="number" placeholder="Precio" />
      <select v-model="prenda.id_categoria">
        <option disabled value="">Seleccionar categoría</option>
        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
          {{ categoria.nombre }}
        </option>
      </select>
      <button type="submit">{{ prenda.id ? 'Actualizar' : 'Agregar' }}</button>
      <button v-if="prenda.id" type="button" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['editando', 'categorias'],
  emits: ['refrescar', 'cancelar'],
  data() {
    return {
      prenda: this.resetPrenda()
    }
  },
  watch: {
    editando(nuevo) {
      this.prenda = { ...nuevo }
    }
  },
  methods: {
    resetPrenda() {
      return {
        nombre: '',
        talla: '',
        color: '',
        precio: '',
        id_categoria: ''
      }
    },
    async guardarPrenda() {
      try {
        if (this.prenda.id) {
          await axios.put(`http://localhost:3000/prendas/${this.prenda.id}`, this.prenda)
        } else {
          await axios.post('http://localhost:3000/prendas', this.prenda)
        }
        this.$emit('refrescar')
        this.prenda = this.resetPrenda()
        this.$emit('cancelar')
      } catch (err) {
        console.error('Error al guardar prenda:', err)
      }
    },
    cancelar() {
      this.prenda = this.resetPrenda()
      this.$emit('cancelar')
    }
  }
}
</script>

<style scoped>
.form-container {
  background: #f9f9f9;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border-radius: 8px;
  
}
.conteiner {
  display: flex;
  gap: 10px;

}
input, select {
  display: block;
  width: 100%;
  padding: 8px;
  display: flex;
  border: 1px solid #000000;
  border-radius: 8px;
}
button {
  padding: 8px 16px;
  border: 1px solid #000000;
  border-radius: 8px;
}
button:hover {
    background-color: #459cf8;
    color: white;
}

@media (max-width: 600px) {
  .conteiner {
    flex-direction: column;
  }
  input,select {
    width: auto;
  }
}
</style>
