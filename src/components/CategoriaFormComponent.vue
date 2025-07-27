<template>
  <div class="form-container">
    <h2>{{ categoria.id ? 'Editar Categoría' : 'Agregar Categoría' }}</h2>
    <form @submit.prevent="guardarCategoria">
      <input v-model="categoria.nombre" placeholder="Nombre de la categoría" required />
      <button type="submit">{{ categoria.id ? 'Actualizar' : 'Agregar' }}</button>
      <button v-if="categoria.id" type="button" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['editando'],
  emits: ['refrescar', 'cancelar'],
  data() {
    return {
      categoria: this.reset()
    }
  },
  watch: {
    editando(nueva) {
      this.categoria = { ...nueva }
    }
  },
  methods: {
    reset() {
      return { nombre: '' }
    },
    async guardarCategoria() {
      try {
        if (this.categoria.id) {
          await axios.put(`http://localhost:3000/categorias/${this.categoria.id}`, this.categoria)
        } else {
          await axios.post('http://localhost:3000/categorias', this.categoria)
        }
        this.$emit('refrescar')
        this.categoria = this.reset()
        this.$emit('cancelar')
      } catch (err) {
        console.error('Error al guardar categoría:', err)
      }
    },
    cancelar() {
      this.categoria = this.reset()
      this.$emit('cancelar')
    }
  }
}
</script>

<style scoped>
.form-container {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
form {
  display: flex ;
  gap: 10px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #000000;
  border-radius: 8px;
}
button {
  margin-right: 10px;
  padding: 8px 12px;
  border: 1px solid #000000;
  border-radius: 8px;
}
button:hover {
  background-color: #007acc;
  color: white;
}
</style>
