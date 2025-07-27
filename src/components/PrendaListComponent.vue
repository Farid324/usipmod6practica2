<template>
  <div class="complet">
    <h2>Lista de Prendas</h2>
    <div class="container-search">
    <input v-model="busqueda" placeholder="Buscar por nombre..." />
    <select v-model="filtroCategoria">
      <option value="">Todas las categorías</option>
      <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
        {{ categoria.nombre }}
      </option>
    </select>
    </div>
    <ol>
      <li v-for="prenda in prendasFiltradas" :key="prenda.id">
        <strong>{{ prenda.nombre }}</strong> - {{ prenda.color }} ({{ prenda.talla }}) - ${{ prenda.precio }}  
        <br />
        Categoría: {{ obtenerNombreCategoria(prenda.id_categoria) }}
        <br />
        <button @click="$emit('editar', prenda)">Editar</button>
        <button @click="eliminar(prenda.id)">Eliminar</button>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['prendas', 'categorias'],
  emits: ['refrescar', 'editar'],
  data() {
    return {
      busqueda: '',
      filtroCategoria: ''
    }
  },
  computed: {
    prendasFiltradas() {
      return this.prendas.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
        const coincideCategoria = this.filtroCategoria === '' || p.id_categoria === parseInt(this.filtroCategoria)
        return coincideNombre && coincideCategoria
      })
    }
  },
  methods: {
    obtenerNombreCategoria(id) {
      const cat = this.categorias.find(c => c.id === id)
      return cat ? cat.nombre : 'Sin categoría'
    },
    async eliminar(id) {
      if (confirm('¿Eliminar esta prenda?')) {
        await axios.delete(`http://localhost:3000/prendas/${id}`)
        this.$emit('refrescar')
      }
    }
  }
}
</script>

<style scoped>
.complet {
    padding: 1rem;
}
.container-search {
    display: flex;
    gap: 10px;
}
input, select {
  padding: 8px;
  width: 100%;
  border: 1px solid #000000;
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
  background: #fff;
  padding: 1rem;
  border: 1px solid #000000;
  margin-bottom: 10px;
  border-radius: 8px;
}
ol {
  list-style: none;
  padding-left: 0; /* para quitar espacio que dejan los números */
}
@media (max-width: 600px) {
  .container-search {
    flex-direction: column;
  }
  input,select {
    width: auto;
  }
}
</style>
