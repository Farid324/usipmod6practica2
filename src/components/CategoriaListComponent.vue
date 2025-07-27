<template>
  <div class="list-container">
    <h2>Lista de Categorías</h2>
    <ol>
      <li v-for="categoria in categorias" :key="categoria.id">
        <strong>{{ categoria.nombre }}</strong>
        <br />
        <button @click="$emit('editar', categoria)">Editar</button>
        <button @click="eliminarCategoria(categoria.id)">Eliminar</button>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['categorias'],
  emits: ['refrescar', 'editar'],
  methods: {
    async eliminarCategoria(id) {
      if (confirm('¿Eliminar esta categoría?')) {
        try {
          await axios.delete(`http://localhost:3000/categorias/${id}`)
          this.$emit('refrescar')
        } catch (err) {
          console.error('Error al eliminar categoría:', err)
        }
      }
    }
  }
}
</script>

<style scoped>
.list-container {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
}
button {
  margin-top: 5px;
  margin-right: 8px;
  border-radius: 8px;
  border: 1px solid #000000;
}
button:hover {
  background-color: #007acc;
  color: white;
}
li {
  background: #f9f9f9;
  padding: 1rem;
  margin-bottom: 10px;
  border: 1px solid #000000;
  border-radius: 6px;
}
ol {
  list-style: none;
  padding-left: 0; /* para quitar espacio que dejan los números */
}
</style>
